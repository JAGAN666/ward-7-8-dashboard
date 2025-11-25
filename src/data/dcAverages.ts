// DC-Wide Average Statistics (2023 ACS Estimates)
// Sources: US Census Bureau ACS 2023 1-Year Estimates for Washington, DC
// Verified: https://datausa.io/profile/geo/washington-dc
//           https://censusreporter.org/profiles/16000US1150000-washington-dc/

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

// Ward 7 & 8 specific data for comparison (from the extracted data)
export const WARD_DATA = {
  ward7: {
    population: 85685,
    medianIncome: 97410,
    homeownershipRate: 39.8,
    bachelorsDegreeRate: 30.8,
    unemploymentRate: 14.3,
    povertyRate: 18.1,
  },
  ward8: {
    population: 85246,
    medianIncome: 81186,
    homeownershipRate: 20.4,
    bachelorsDegreeRate: 19.5,
    unemploymentRate: 13.9,
    povertyRate: 23.1,
  },
};

// Key gaps for headline statistics
export const KEY_GAPS = {
  incomeGap: WARD_DATA.ward7.medianIncome - WARD_DATA.ward8.medianIncome, // $16,224
  homeownershipGap: WARD_DATA.ward7.homeownershipRate - WARD_DATA.ward8.homeownershipRate, // 19.4%
  educationGap: WARD_DATA.ward7.bachelorsDegreeRate - WARD_DATA.ward8.bachelorsDegreeRate, // 11.3%
  povertyGap: WARD_DATA.ward8.povertyRate - WARD_DATA.ward7.povertyRate, // 5%
};
