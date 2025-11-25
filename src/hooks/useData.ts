import { useQuery } from '@tanstack/react-query';
import type { SNAPRetailer, FoodAccessTract } from '../types';
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

// Generic data fetcher
async function fetchJSON<T>(filename: string): Promise<T> {
  console.log(`Fetching: /data/${filename}`);
  const response = await fetch(`/data/${filename}`);
  if (!response.ok) {
    console.error(`Failed to fetch ${filename}: ${response.statusText}`);
    throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`Loaded ${filename}:`, data?.length || 'object', 'items');
  return data;
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
      isLoading
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
