import { useQuery } from '@tanstack/react-query';
import type { SNAPRetailer, FoodAccessTract } from '../types';
import type { CrimeIncident } from '../types/crime';
import {
  transformToWardComparison,
  transformToEducationBreakdown,
  transformToGroupedBarData,
} from '../data/transformers/censusTransformer';
import {
  transformSNAPByZip,
  getStoreTypeDistribution,
  getSNAPStats,
  filterActiveRetailers,
} from '../data/transformers/snapTransformer';
import {
  getCrimeStats,
  getTopCrimeTypes,
  getCrimeOffenseChartData,
  getCrimeShiftChartData,
  getCrimeMethodChartData,
  getYearlySparkline,
} from '../data/transformers/crimeTransformer';
import {
  DEMOGRAPHIC_FIELDS,
  ECONOMIC_FIELDS,
  HOUSING_FIELDS,
  SOCIAL_FIELDS,
  type FieldMapping,
} from '../data/comprehensiveFieldMappings';

// Type for raw ward data from JSON
export interface WardRawData {
  GEOID: string | number;
  NAMELSAD: string;
  [key: string]: any;
}

// Type for a single metric comparison
export interface MetricComparison {
  fieldCode: string;
  label: string;
  description: string;
  format: string;
  category?: string;
  ward7Value: number | null;
  ward8Value: number | null;
  gap: number | null;
  gapPercent: number | null;
}

// Helper to extract ward values from raw data
function extractWardValues(data: WardRawData[], fieldCode: string): { ward7: number | null; ward8: number | null } {
  const ward7Data = data.find(d => String(d.GEOID).endsWith('7') || d.NAMELSAD?.includes('Ward 7'));
  const ward8Data = data.find(d => String(d.GEOID).endsWith('8') || d.NAMELSAD?.includes('Ward 8'));

  return {
    ward7: ward7Data?.[fieldCode] ?? null,
    ward8: ward8Data?.[fieldCode] ?? null,
  };
}

// Transform raw data to metric comparisons using field mappings
export function transformToMetricComparisons(
  data: WardRawData[],
  fieldMappings: Record<string, FieldMapping>
): MetricComparison[] {
  const metrics: MetricComparison[] = [];

  for (const [fieldCode, mapping] of Object.entries(fieldMappings)) {
    const { ward7, ward8 } = extractWardValues(data, fieldCode);

    if (ward7 !== null || ward8 !== null) {
      const gap = ward7 !== null && ward8 !== null ? ward7 - ward8 : null;
      const gapPercent = gap !== null && ward8 !== null && ward8 !== 0
        ? (gap / ward8) * 100
        : null;

      metrics.push({
        fieldCode,
        label: mapping.label,
        description: mapping.description,
        format: mapping.format,
        category: mapping.category,
        ward7Value: ward7,
        ward8Value: ward8,
        gap,
        gapPercent,
      });
    }
  }

  return metrics;
}

// Group metrics by category
export function groupMetricsByCategory(metrics: MetricComparison[]): Record<string, MetricComparison[]> {
  return metrics.reduce((acc, metric) => {
    const category = metric.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(metric);
    return acc;
  }, {} as Record<string, MetricComparison[]>);
}

// Generic data fetcher
async function fetchJSON<T>(filename: string): Promise<T> {
  console.log(`Fetching: /data/${filename}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    const response = await fetch(`/data/${filename}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch ${filename}: ${response.statusText}`);
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Loaded ${filename}:`, data?.length || 'object', 'items');
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timed out for ${filename}`);
    }
    throw error;
  }
}

// Hook for Census/ACS Economic data
export function useEconomicData() {
  return useQuery({
    queryKey: ['economic'],
    queryFn: () => fetchJSON<any[]>('ward7-8_acs_economic_5year_20251103.json'),
    staleTime: Infinity,
  });
}

// Hook for Census/ACS Housing data
export function useHousingData() {
  return useQuery({
    queryKey: ['housing'],
    queryFn: () => fetchJSON<any[]>('ward7-8_acs_housing_5year_20251103.json'),
    staleTime: Infinity,
  });
}

// Hook for Census/ACS Social data
export function useSocialData() {
  return useQuery({
    queryKey: ['social'],
    queryFn: () => fetchJSON<any[]>('ward7-8_acs_social_5year_20251103.json'),
    staleTime: Infinity,
  });
}

// Hook for SNAP Retailers data
export function useSNAPData() {
  return useQuery({
    queryKey: ['snap'],
    queryFn: () => fetchJSON<SNAPRetailer[]>('ward7-8_snap_retailers_20251103.json'),
    staleTime: Infinity,
  });
}

// Hook for Food Access Atlas data
export function useFoodAccessData() {
  return useQuery({
    queryKey: ['foodAccess'],
    queryFn: () => fetchJSON<FoodAccessTract[]>('dc_all_food_access_atlas_20251103.json'),
    staleTime: Infinity,
  });
}

// Combined hook for Story 1: Ward comparison data
export function useWardComparisonData() {
  const { data: economic, isLoading: loadingEconomic, error: errorEconomic } = useEconomicData();
  const { data: housing, isLoading: loadingHousing, error: errorHousing } = useHousingData();
  const { data: social, isLoading: loadingSocial, error: errorSocial } = useSocialData();

  const isLoading = loadingEconomic || loadingHousing || loadingSocial;

  console.log('useWardComparisonData:', {
    isLoading,
    hasEconomic: !!economic,
    hasHousing: !!housing,
    hasSocial: !!social,
    errors: { errorEconomic, errorHousing, errorSocial }
  });

  if (isLoading || !economic || !housing || !social) {
    return { data: null, isLoading, charts: null, educationBreakdown: null };
  }

  const wardData = transformToWardComparison(economic, housing, social);
  console.log('Transformed ward data:', wardData);

  const charts = transformToGroupedBarData(wardData);
  console.log('Chart data:', charts);

  const educationBreakdown = transformToEducationBreakdown(social);
  console.log('Education breakdown:', educationBreakdown);

  return {
    data: wardData,
    educationBreakdown,
    charts,
    isLoading: false,
  };
}

// Combined hook for Story 2: Food access data
export function useFoodAccessAnalysis() {
  const { data: snapData, isLoading: loadingSnap } = useSNAPData();
  const { data: foodAccess, isLoading: loadingAccess } = useFoodAccessData();

  const isLoading = loadingSnap || loadingAccess;

  if (isLoading || !snapData || !foodAccess) {
    return {
      snapByZip: null,
      storeTypes: null,
      stats: null,
      foodAccessTracts: null,
      isLoading,
      isError: !!(loadingSnap && !snapData) || !!(loadingAccess && !foodAccess),
      error: null,
    };
  }

  // Filter to active retailers only
  const activeRetailers = filterActiveRetailers(snapData);

  const snapByZip = transformSNAPByZip(activeRetailers);
  const storeTypes = getStoreTypeDistribution(activeRetailers);
  const stats = getSNAPStats(activeRetailers);

  return {
    snapByZip,
    storeTypes,
    stats,
    foodAccessTracts: foodAccess,
    allRetailers: snapData,
    activeRetailers,
    isLoading: false,
  };
}

// Hook for Crime data (2020-2025 combined)
export function useCrimeData() {
  return useQuery({
    queryKey: ['crime'],
    queryFn: () => fetchJSON<CrimeIncident[]>('ward7-8_crime_incidents_2020-2025_combined_20251103.json'),
    staleTime: Infinity,
  });
}

// Combined hook for Crime Analysis page
export function useCrimeAnalysis() {
  const { data: crimeData, isLoading, error } = useCrimeData();

  if (isLoading || !crimeData) {
    return {
      stats: null,
      topOffenses: null,
      offenseChartData: null,
      shiftChartData: null,
      methodChartData: null,
      yearlyChartData: null,
      sparklines: null,
      isLoading,
      isError: !!error || (isLoading && !crimeData),
      error,
    };
  }

  const stats = getCrimeStats(crimeData);
  const topOffenses = getTopCrimeTypes(stats.byOffense, 8);

  return {
    stats,
    topOffenses,
    offenseChartData: getCrimeOffenseChartData(topOffenses),
    shiftChartData: getCrimeShiftChartData(stats.byShift),
    methodChartData: getCrimeMethodChartData(stats.byMethod),
    yearlyChartData: stats.totalByYear.map(y => ({
      year: y.year,
      ward7: y.ward7,
      ward8: y.ward8,
    })),
    sparklines: {
      ward7: getYearlySparkline(stats.totalByYear, 'ward7'),
      ward8: getYearlySparkline(stats.totalByYear, 'ward8'),
    },
    isLoading: false,
    isError: false,
    error: null,
  };
}

// =====================================================
// COMPREHENSIVE DATA HOOKS FOR RESEARCH DASHBOARD
// =====================================================

// Hook for Demographics data with all fields
export function useDemographicData() {
  return useQuery({
    queryKey: ['demographic'],
    queryFn: () => fetchJSON<WardRawData[]>('ward7-8_acs_demographic_5year_20251103.json'),
    staleTime: Infinity,
  });
}

// Comprehensive Demographics Analysis
export function useDemographicsAnalysis() {
  const { data: demographicData, isLoading, error } = useDemographicData();

  if (isLoading || !demographicData) {
    return {
      metrics: null,
      metricsByCategory: null,
      rawData: null,
      isLoading,
      error,
    };
  }

  const metrics = transformToMetricComparisons(demographicData, DEMOGRAPHIC_FIELDS);
  const metricsByCategory = groupMetricsByCategory(metrics);

  return {
    metrics,
    metricsByCategory,
    rawData: demographicData,
    isLoading: false,
    error: null,
  };
}

// Comprehensive Economics Analysis
export function useEconomicsAnalysis() {
  const { data: economicData, isLoading, error } = useEconomicData();

  if (isLoading || !economicData) {
    return {
      metrics: null,
      metricsByCategory: null,
      rawData: null,
      isLoading,
      error,
    };
  }

  const metrics = transformToMetricComparisons(economicData, ECONOMIC_FIELDS);
  const metricsByCategory = groupMetricsByCategory(metrics);

  return {
    metrics,
    metricsByCategory,
    rawData: economicData,
    isLoading: false,
    error: null,
  };
}

// Comprehensive Housing Analysis
export function useHousingAnalysis() {
  const { data: housingData, isLoading, error } = useHousingData();

  if (isLoading || !housingData) {
    return {
      metrics: null,
      metricsByCategory: null,
      rawData: null,
      isLoading,
      error,
    };
  }

  const metrics = transformToMetricComparisons(housingData, HOUSING_FIELDS);
  const metricsByCategory = groupMetricsByCategory(metrics);

  return {
    metrics,
    metricsByCategory,
    rawData: housingData,
    isLoading: false,
    error: null,
  };
}

// Comprehensive Social/Education Analysis
export function useSocialAnalysis() {
  const { data: socialData, isLoading, error } = useSocialData();

  if (isLoading || !socialData) {
    return {
      metrics: null,
      metricsByCategory: null,
      rawData: null,
      isLoading,
      error,
    };
  }

  const metrics = transformToMetricComparisons(socialData, SOCIAL_FIELDS);
  const metricsByCategory = groupMetricsByCategory(metrics);

  return {
    metrics,
    metricsByCategory,
    rawData: socialData,
    isLoading: false,
    error: null,
  };
}

// Hook to get all data for Data Dictionary page
export function useAllDataForDictionary() {
  const { data: demographic, isLoading: loadingDemo } = useDemographicData();
  const { data: economic, isLoading: loadingEcon } = useEconomicData();
  const { data: housing, isLoading: loadingHousing } = useHousingData();
  const { data: social, isLoading: loadingSocial } = useSocialData();

  const isLoading = loadingDemo || loadingEcon || loadingHousing || loadingSocial;

  if (isLoading) {
    return {
      allMetrics: null,
      dataSources: null,
      isLoading,
    };
  }

  const demographicMetrics = demographic ? transformToMetricComparisons(demographic, DEMOGRAPHIC_FIELDS) : [];
  const economicMetrics = economic ? transformToMetricComparisons(economic, ECONOMIC_FIELDS) : [];
  const housingMetrics = housing ? transformToMetricComparisons(housing, HOUSING_FIELDS) : [];
  const socialMetrics = social ? transformToMetricComparisons(social, SOCIAL_FIELDS) : [];

  const allMetrics = [
    ...demographicMetrics.map(m => ({ ...m, source: 'ACS Demographic (DP05)' })),
    ...economicMetrics.map(m => ({ ...m, source: 'ACS Economic (DP03)' })),
    ...housingMetrics.map(m => ({ ...m, source: 'ACS Housing (DP04)' })),
    ...socialMetrics.map(m => ({ ...m, source: 'ACS Social (DP02)' })),
  ];

  const dataSources = [
    {
      name: 'ACS Demographic Characteristics',
      file: 'ward7-8_acs_demographic_5year_20251103.json',
      prefix: 'DP05',
      description: 'American Community Survey 5-Year Estimates - Demographic Characteristics',
      metricsCount: demographicMetrics.length,
    },
    {
      name: 'ACS Economic Characteristics',
      file: 'ward7-8_acs_economic_5year_20251103.json',
      prefix: 'DP03',
      description: 'American Community Survey 5-Year Estimates - Economic Characteristics',
      metricsCount: economicMetrics.length,
    },
    {
      name: 'ACS Housing Characteristics',
      file: 'ward7-8_acs_housing_5year_20251103.json',
      prefix: 'DP04',
      description: 'American Community Survey 5-Year Estimates - Housing Characteristics',
      metricsCount: housingMetrics.length,
    },
    {
      name: 'ACS Social Characteristics',
      file: 'ward7-8_acs_social_5year_20251103.json',
      prefix: 'DP02',
      description: 'American Community Survey 5-Year Estimates - Social Characteristics',
      metricsCount: socialMetrics.length,
    },
  ];

  return {
    allMetrics,
    dataSources,
    isLoading: false,
  };
}
