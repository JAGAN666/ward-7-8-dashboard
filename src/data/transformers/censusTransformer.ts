import type {
  WardComparisonData,
  EducationBreakdown,
  GroupedBarDataPoint,
  WardNumber
} from '../../types';
import { DC_AVERAGES } from '../dcAverages';
import { calculatePercent } from '../../utils/formatters';

// Helper function to extract ward number from GEOID
// GEOID format: 11007 for Ward 7, 11008 for Ward 8
function getWardFromGEOID(geoid: string | number): number {
  const id = String(geoid);
  return id.endsWith('7') ? 7 : 8;
}

// Transform raw ACS data into ward comparison format
export function transformToWardComparison(
  economicData: any[],
  housingData: any[],
  socialData: any[]
): WardComparisonData[] {
  const results: WardComparisonData[] = [];

  for (const econ of economicData) {
    // Extract ward number from GEOID (consistent across all data files)
    const wardNum = getWardFromGEOID(econ.GEOID);

    // Match housing and social data by GEOID (NAME field is missing in housing data)
    const housing = housingData.find((h: any) => getWardFromGEOID(h.GEOID) === wardNum);
    const social = socialData.find((s: any) => getWardFromGEOID(s.GEOID) === wardNum);

    if (!housing || !social) continue;

    // Calculate homeownership rate
    const ownerOccupied = housing.DP04_0046E || 0;
    const renterOccupied = housing.DP04_0047E || 0;
    const totalOccupied = ownerOccupied + renterOccupied;
    const homeownershipRate = calculatePercent(ownerOccupied, totalOccupied);

    // Calculate bachelor's degree rate
    const bachelors = social.DP02_0064E || 0;
    const graduate = social.DP02_0065E || 0;
    const lessHS = social.DP02_0059E || 0;
    const noHSDiploma = social.DP02_0060E || 0;
    const hsGrad = social.DP02_0061E || 0;
    const someCollege = social.DP02_0062E || 0;
    const associates = social.DP02_0063E || 0;
    const totalEducation = lessHS + noHSDiploma + hsGrad + someCollege + associates + bachelors + graduate;
    const bachelorsPlusRate = calculatePercent(bachelors + graduate, totalEducation);

    // DP03_0063E is median household income (not DP03_0062E)
    results.push({
      ward: wardNum as WardNumber,
      wardName: `Ward ${wardNum}`,
      medianIncome: econ.DP03_0063E || 0,
      homeownershipRate,
      bachelorsDegreeRate: bachelorsPlusRate,
      unemploymentRate: econ.DP03_0009PE || 0,
      povertyRate: econ.DP03_0128PE || 0,
      population: econ.DP03_0001E || 0,
    });
  }

  return results.sort((a, b) => a.ward - b.ward);
}

// Transform data for grouped bar chart comparing wards + DC average
export function transformToGroupedBarData(wardData: WardComparisonData[]): {
  income: GroupedBarDataPoint[];
  housing: GroupedBarDataPoint[];
  education: GroupedBarDataPoint[];
  employment: GroupedBarDataPoint[];
} {
  const ward7 = wardData.find(w => w.ward === 7);
  const ward8 = wardData.find(w => w.ward === 8);

  if (!ward7 || !ward8) {
    return { income: [], housing: [], education: [], employment: [] };
  }

  return {
    income: [{
      category: 'Median Household Income',
      ward7: ward7.medianIncome,
      ward8: ward8.medianIncome,
      dcAverage: DC_AVERAGES.medianHouseholdIncome,
    }],
    housing: [{
      category: 'Homeownership Rate (%)',
      ward7: ward7.homeownershipRate,
      ward8: ward8.homeownershipRate,
      dcAverage: DC_AVERAGES.homeownershipRate,
    }],
    education: [{
      category: "Bachelor's Degree or Higher (%)",
      ward7: ward7.bachelorsDegreeRate,
      ward8: ward8.bachelorsDegreeRate,
      dcAverage: DC_AVERAGES.bachelorsDegreeRate,
    }],
    employment: [
      {
        category: 'Unemployment Rate (%)',
        ward7: ward7.unemploymentRate,
        ward8: ward8.unemploymentRate,
        dcAverage: DC_AVERAGES.unemploymentRate,
      },
      {
        category: 'Poverty Rate (%)',
        ward7: ward7.povertyRate,
        ward8: ward8.povertyRate,
        dcAverage: DC_AVERAGES.povertyRate,
      },
    ],
  };
}

// Transform social data for education breakdown stacked bar chart
export function transformToEducationBreakdown(socialData: any[]): EducationBreakdown[] {
  return socialData.map((data: any) => {
    // Use GEOID for consistent ward matching
    const wardNum = getWardFromGEOID(data.GEOID);

    const lessHS = (data.DP02_0059E || 0) + (data.DP02_0060E || 0);
    const hsGrad = data.DP02_0061E || 0;
    const someCollege = data.DP02_0062E || 0;
    const associates = data.DP02_0063E || 0;
    const bachelors = data.DP02_0064E || 0;
    const graduate = data.DP02_0065E || 0;

    const total = lessHS + hsGrad + someCollege + associates + bachelors + graduate;

    return {
      ward: wardNum as WardNumber,
      wardName: `Ward ${wardNum}`,
      lessHighSchool: calculatePercent(lessHS, total),
      highSchool: calculatePercent(hsGrad, total),
      someCollege: calculatePercent(someCollege, total),
      associates: calculatePercent(associates, total),
      bachelors: calculatePercent(bachelors, total),
      graduate: calculatePercent(graduate, total),
    };
  }).sort((a, b) => a.ward - b.ward);
}

// Get combined comparison chart data
export function getComparisonChartData(wardData: WardComparisonData[]): GroupedBarDataPoint[] {
  const ward7 = wardData.find(w => w.ward === 7);
  const ward8 = wardData.find(w => w.ward === 8);

  if (!ward7 || !ward8) return [];

  return [
    {
      category: 'Median Income ($)',
      ward7: ward7.medianIncome,
      ward8: ward8.medianIncome,
      dcAverage: DC_AVERAGES.medianHouseholdIncome,
    },
    {
      category: 'Homeownership (%)',
      ward7: ward7.homeownershipRate,
      ward8: ward8.homeownershipRate,
      dcAverage: DC_AVERAGES.homeownershipRate,
    },
    {
      category: "Bachelor's+ (%)",
      ward7: ward7.bachelorsDegreeRate,
      ward8: ward8.bachelorsDegreeRate,
      dcAverage: DC_AVERAGES.bachelorsDegreeRate,
    },
  ];
}
