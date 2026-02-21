// DC-Wide Average Statistics (2023 ACS Estimates)
// Sources: US Census Bureau ACS 2023 1-Year Estimates for Washington, DC
// Verified: https://datausa.io/profile/geo/washington-dc
//           https://censusreporter.org/profiles/16000US1150000-washington-dc/
//
// NOTE: These DC-wide averages are static reference values used for comparison.
// Ward-specific data should be loaded dynamically from the JSON data files
// via the hooks in useData.ts (useWardComparisonData, useDemographicsAnalysis, etc.)

export const DC_AVERAGES = {
  // Economic
  medianHouseholdIncome: 106287,  // DC-wide median household income (2023)
  unemploymentRate: 5.5,          // DC-wide unemployment rate % (2023)
  povertyRate: 14.0,              // DC-wide poverty rate % (2023)

  // Housing
  homeownershipRate: 41.1,        // DC-wide homeownership rate % (2023)

  // Education
  bachelorsDegreeRate: 63.0,      // % with bachelor's degree or higher (2023)
  highSchoolGradRate: 91.0,       // % with high school diploma or higher

  // Population
  totalPopulation: 672000,        // DC total population (2023 estimate)
};

// Type for ward data structure (for type safety)
export interface WardStats {
  population: number;
  medianIncome: number;
  homeownershipRate: number;
  bachelorsDegreeRate: number;
  unemploymentRate: number;
  povertyRate: number;
}

// Helper function to calculate key gaps from dynamic ward data
export function calculateKeyGaps(ward7: WardStats, ward8: WardStats) {
  return {
    incomeGap: ward7.medianIncome - ward8.medianIncome,
    homeownershipGap: ward7.homeownershipRate - ward8.homeownershipRate,
    educationGap: ward7.bachelorsDegreeRate - ward8.bachelorsDegreeRate,
    povertyGap: ward8.povertyRate - ward7.povertyRate,
  };
}

// Helper to extract ward stats from transformed comparison data
export function extractWardStats(wardData: { ward: number; medianIncome: number; homeownershipRate: number; bachelorsDegreeRate: number; unemploymentRate: number; povertyRate: number; population: number }[]): { ward7: WardStats | null; ward8: WardStats | null } {
  const ward7Data = wardData.find(w => w.ward === 7);
  const ward8Data = wardData.find(w => w.ward === 8);

  return {
    ward7: ward7Data ? {
      population: ward7Data.population,
      medianIncome: ward7Data.medianIncome,
      homeownershipRate: ward7Data.homeownershipRate,
      bachelorsDegreeRate: ward7Data.bachelorsDegreeRate,
      unemploymentRate: ward7Data.unemploymentRate,
      povertyRate: ward7Data.povertyRate,
    } : null,
    ward8: ward8Data ? {
      population: ward8Data.population,
      medianIncome: ward8Data.medianIncome,
      homeownershipRate: ward8Data.homeownershipRate,
      bachelorsDegreeRate: ward8Data.bachelorsDegreeRate,
      unemploymentRate: ward8Data.unemploymentRate,
      povertyRate: ward8Data.povertyRate,
    } : null,
  };
}
