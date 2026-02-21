// Crime incident data structure from DC Open Data
export interface CrimeIncident {
  CCN: string;
  REPORT_DAT: number; // Unix timestamp in milliseconds
  SHIFT: 'DAY' | 'EVENING' | 'MIDNIGHT';
  METHOD: 'GUN' | 'KNIFE' | 'OTHERS';
  OFFENSE: string;
  BLOCK: string;
  WARD: string;
  ANC: string;
  DISTRICT: string;
  PSA: string;
  NEIGHBORHOOD_CLUSTER: string;
  CENSUS_TRACT: string;
  LATITUDE: number;
  LONGITUDE: number;
}

// Aggregated crime statistics
export interface CrimeByYear {
  year: number;
  ward7: number;
  ward8: number;
  total: number;
}

export interface CrimeByOffense {
  offense: string;
  ward7: number;
  ward8: number;
  total: number;
}

export interface CrimeByShift {
  shift: string;
  ward7: number;
  ward8: number;
  total: number;
}

export interface CrimeByMethod {
  method: string;
  ward7: number;
  ward8: number;
  total: number;
}

export interface CrimeTrend {
  ward7Change: number;
  ward8Change: number;
  ward7Percent: number;
  ward8Percent: number;
  direction7: 'up' | 'down' | 'stable';
  direction8: 'up' | 'down' | 'stable';
}

export interface CrimeStats {
  totalByYear: CrimeByYear[];
  byOffense: CrimeByOffense[];
  byShift: CrimeByShift[];
  byMethod: CrimeByMethod[];
  trend: CrimeTrend;
  totals: {
    ward7: number;
    ward8: number;
    all: number;
  };
  latestYear: {
    year: number;
    ward7: number;
    ward8: number;
  };
}

// Offense categories for grouping
export const OFFENSE_CATEGORIES = {
  violent: ['HOMICIDE', 'ASSAULT W/DANGEROUS WEAPON', 'ROBBERY', 'SEX ABUSE'],
  property: ['THEFT/OTHER', 'THEFT F/AUTO', 'MOTOR VEHICLE THEFT', 'BURGLARY', 'ARSON'],
} as const;

export type OffenseCategory = 'violent' | 'property' | 'other';
