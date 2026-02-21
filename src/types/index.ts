// Ward types
export type WardNumber = 7 | 8;

// Census/ACS data types
export interface WardEconomicData {
  GEOID: string;
  NAME: string;
  DP03_0062E: number; // Median household income
  DP03_0009PE: number; // Unemployment rate %
  DP03_0119PE: number; // Poverty rate - families %
  DP03_0128PE: number; // Poverty rate - individuals %
  DP03_0001E: number; // Total population in labor force
  DP03_0003E: number; // Employed
  DP03_0005E: number; // Unemployed
}

export interface WardHousingData {
  GEOID: string;
  NAME: string;
  DP04_0001E: number; // Total housing units
  DP04_0002E: number; // Occupied housing units
  DP04_0003E: number; // Vacant housing units
  DP04_0046E: number; // Owner-occupied units
  DP04_0047E: number; // Renter-occupied units
}

export interface WardSocialData {
  GEOID: string;
  NAME: string;
  DP02_0001E: number; // Total households
  DP02_0059E: number; // Less than 9th grade
  DP02_0060E: number; // 9th to 12th grade, no diploma
  DP02_0061E: number; // High school graduate
  DP02_0062E: number; // Some college, no degree
  DP02_0063E: number; // Associate's degree
  DP02_0064E: number; // Bachelor's degree
  DP02_0065E: number; // Graduate or professional degree
}

export interface WardDemographicData {
  GEOID: string;
  NAME: string;
  POP100?: number; // Total population (Census 2020)
  DP05_0001E?: number; // Total population (ACS)
}

// SNAP Retailer types
export interface SNAPRetailer {
  'Record ID': string;
  'Store Name': string;
  'Store Type': string;
  'Street Number': string;
  'Street Name': string;
  'Additional Address': string;
  City: string;
  State: string;
  'Zip Code': string;
  Zip4: string;
  County: string;
  Latitude: number;
  Longitude: number;
  'Authorization Date': string;
  'End Date': string;
}

// Food Access Atlas types
export interface FoodAccessTract {
  CensusTract: string;
  State: string;
  County: string;
  Urban: number;
  Pop2010: number;
  PovertyRate: number;
  MedianFamilyIncome: number;
  LILATracts_1And10: number;
  LILATracts_halfAnd10: number;
  LILATracts_1And20: number;
  LILATracts_Vehicle: number;
  TractLOWI: number;
  TractHUNV: number;
  TractSNAP: number;
  lapophalf: number;
  lapophalfshare: number;
  lalowihalf: number;
  lahunvhalf: number;
}

// Processed data types for charts
export interface WardComparisonData {
  ward: WardNumber;
  wardName: string;
  medianIncome: number;
  homeownershipRate: number;
  bachelorsDegreeRate: number;
  unemploymentRate: number;
  povertyRate: number;
  population: number;
}

export interface EducationBreakdown {
  ward: WardNumber;
  wardName: string;
  lessHighSchool: number;
  highSchool: number;
  someCollege: number;
  associates: number;
  bachelors: number;
  graduate: number;
}

export interface SNAPByZip {
  zipCode: string;
  total: number;
  supermarkets: number;
  grocery: number;
  convenience: number;
  farmersMarket: number;
  other: number;
}

export interface StoreTypeCount {
  type: string;
  count: number;
  percentage: number;
}

// Chart data types
export interface GroupedBarDataPoint {
  category: string;
  ward7: number;
  ward8: number;
  dcAverage?: number;
}

export interface StackedBarDataPoint {
  category: string;
  [key: string]: string | number;
}
