// ACS Field Code to Human-Readable Label Mappings

export const ECONOMIC_FIELDS = {
  DP03_0001E: { label: 'Total Population in Labor Force (16+)', format: 'number' as const },
  DP03_0002E: { label: 'Civilian Labor Force', format: 'number' as const },
  DP03_0003E: { label: 'Employed', format: 'number' as const },
  DP03_0005E: { label: 'Unemployed', format: 'number' as const },
  DP03_0009PE: { label: 'Unemployment Rate', format: 'percent' as const },
  DP03_0062E: { label: 'Median Household Income', format: 'currency' as const },
  DP03_0063E: { label: 'Median Family Income', format: 'currency' as const },
  DP03_0119PE: { label: 'Families Below Poverty Level', format: 'percent' as const },
  DP03_0128PE: { label: 'Individuals Below Poverty Level', format: 'percent' as const },
};

export const HOUSING_FIELDS = {
  DP04_0001E: { label: 'Total Housing Units', format: 'number' as const },
  DP04_0002E: { label: 'Occupied Housing Units', format: 'number' as const },
  DP04_0003E: { label: 'Vacant Housing Units', format: 'number' as const },
  DP04_0046E: { label: 'Owner-Occupied Units', format: 'number' as const },
  DP04_0047E: { label: 'Renter-Occupied Units', format: 'number' as const },
};

export const SOCIAL_FIELDS = {
  DP02_0001E: { label: 'Total Households', format: 'number' as const },
  DP02_0059E: { label: 'Less than 9th Grade', format: 'number' as const },
  DP02_0060E: { label: '9th-12th Grade (No Diploma)', format: 'number' as const },
  DP02_0061E: { label: 'High School Graduate', format: 'number' as const },
  DP02_0062E: { label: 'Some College (No Degree)', format: 'number' as const },
  DP02_0063E: { label: "Associate's Degree", format: 'number' as const },
  DP02_0064E: { label: "Bachelor's Degree", format: 'number' as const },
  DP02_0065E: { label: 'Graduate/Professional Degree', format: 'number' as const },
};

export const FOOD_ACCESS_FIELDS = {
  LILATracts_1And10: { label: 'Low Income, Low Access (1mi urban/10mi rural)', format: 'boolean' as const },
  LILATracts_halfAnd10: { label: 'Low Income, Low Access (0.5mi)', format: 'boolean' as const },
  LILATracts_Vehicle: { label: 'Low Income, Low Access (Vehicle)', format: 'boolean' as const },
  TractLOWI: { label: 'Low Income Tract', format: 'boolean' as const },
  TractHUNV: { label: 'Households Without Vehicle', format: 'boolean' as const },
  PovertyRate: { label: 'Poverty Rate', format: 'percent' as const },
};

export const STORE_TYPES = {
  'Supermarket': 'supermarket',
  'Super Store': 'supermarket',
  'Large Grocery Store': 'grocery',
  'Medium Grocery Store': 'grocery',
  'Small Grocery Store': 'grocery',
  'Convenience Store': 'convenience',
  'Combination Grocery/Other': 'other',
  'Farmers\' Market': 'farmersMarket',
  'Farmers Market': 'farmersMarket',
} as const;
