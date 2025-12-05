import type {
  CrimeIncident,
  CrimeByYear,
  CrimeByOffense,
  CrimeByShift,
  CrimeByMethod,
  CrimeTrend,
  CrimeStats,
} from '../../types/crime';

// Extract year from timestamp
function getYear(timestamp: number): number {
  return new Date(timestamp).getFullYear();
}

// Aggregate crime data by year and ward
export function aggregateCrimeByYear(incidents: CrimeIncident[]): CrimeByYear[] {
  const yearMap: Map<number, { ward7: number; ward8: number }> = new Map();

  for (const incident of incidents) {
    const year = getYear(incident.REPORT_DAT);
    const ward = incident.WARD;

    if (!yearMap.has(year)) {
      yearMap.set(year, { ward7: 0, ward8: 0 });
    }

    const yearData = yearMap.get(year)!;
    if (ward === '7') {
      yearData.ward7++;
    } else if (ward === '8') {
      yearData.ward8++;
    }
  }

  return Array.from(yearMap.entries())
    .map(([year, data]) => ({
      year,
      ward7: data.ward7,
      ward8: data.ward8,
      total: data.ward7 + data.ward8,
    }))
    .sort((a, b) => a.year - b.year);
}

// Aggregate crime by offense type
export function aggregateCrimeByOffense(incidents: CrimeIncident[]): CrimeByOffense[] {
  const offenseMap: Map<string, { ward7: number; ward8: number }> = new Map();

  for (const incident of incidents) {
    const offense = incident.OFFENSE;
    const ward = incident.WARD;

    if (!offenseMap.has(offense)) {
      offenseMap.set(offense, { ward7: 0, ward8: 0 });
    }

    const offenseData = offenseMap.get(offense)!;
    if (ward === '7') {
      offenseData.ward7++;
    } else if (ward === '8') {
      offenseData.ward8++;
    }
  }

  return Array.from(offenseMap.entries())
    .map(([offense, data]) => ({
      offense,
      ward7: data.ward7,
      ward8: data.ward8,
      total: data.ward7 + data.ward8,
    }))
    .sort((a, b) => b.total - a.total);
}

// Aggregate crime by shift (time of day)
export function aggregateCrimeByShift(incidents: CrimeIncident[]): CrimeByShift[] {
  const shiftMap: Map<string, { ward7: number; ward8: number }> = new Map();

  // Initialize in order
  const shifts = ['DAY', 'EVENING', 'MIDNIGHT'];
  for (const shift of shifts) {
    shiftMap.set(shift, { ward7: 0, ward8: 0 });
  }

  for (const incident of incidents) {
    const shift = incident.SHIFT;
    const ward = incident.WARD;

    if (!shiftMap.has(shift)) {
      shiftMap.set(shift, { ward7: 0, ward8: 0 });
    }

    const shiftData = shiftMap.get(shift)!;
    if (ward === '7') {
      shiftData.ward7++;
    } else if (ward === '8') {
      shiftData.ward8++;
    }
  }

  const shiftLabels: { [key: string]: string } = {
    DAY: 'Day (7am-3pm)',
    EVENING: 'Evening (3pm-11pm)',
    MIDNIGHT: 'Midnight (11pm-7am)',
  };

  return shifts.map((shift) => {
    const data = shiftMap.get(shift)!;
    return {
      shift: shiftLabels[shift] || shift,
      ward7: data.ward7,
      ward8: data.ward8,
      total: data.ward7 + data.ward8,
    };
  });
}

// Aggregate crime by method
export function aggregateCrimeByMethod(incidents: CrimeIncident[]): CrimeByMethod[] {
  const methodMap: Map<string, { ward7: number; ward8: number }> = new Map();

  for (const incident of incidents) {
    const method = incident.METHOD;
    const ward = incident.WARD;

    if (!methodMap.has(method)) {
      methodMap.set(method, { ward7: 0, ward8: 0 });
    }

    const methodData = methodMap.get(method)!;
    if (ward === '7') {
      methodData.ward7++;
    } else if (ward === '8') {
      methodData.ward8++;
    }
  }

  const methodLabels: { [key: string]: string } = {
    GUN: 'Gun',
    KNIFE: 'Knife',
    OTHERS: 'Other',
  };

  return Array.from(methodMap.entries())
    .map(([method, data]) => ({
      method: methodLabels[method] || method,
      ward7: data.ward7,
      ward8: data.ward8,
      total: data.ward7 + data.ward8,
    }))
    .sort((a, b) => b.total - a.total);
}

// Calculate year-over-year trend
export function getCrimeTrend(yearlyData: CrimeByYear[]): CrimeTrend {
  if (yearlyData.length < 2) {
    return {
      ward7Change: 0,
      ward8Change: 0,
      ward7Percent: 0,
      ward8Percent: 0,
      direction7: 'stable',
      direction8: 'stable',
    };
  }

  // Get the two most recent complete years
  const sortedYears = [...yearlyData].sort((a, b) => b.year - a.year);
  const current = sortedYears[0];
  const previous = sortedYears[1];

  const ward7Change = current.ward7 - previous.ward7;
  const ward8Change = current.ward8 - previous.ward8;

  const ward7Percent = previous.ward7 !== 0 ? (ward7Change / previous.ward7) * 100 : 0;
  const ward8Percent = previous.ward8 !== 0 ? (ward8Change / previous.ward8) * 100 : 0;

  return {
    ward7Change,
    ward8Change,
    ward7Percent,
    ward8Percent,
    direction7: ward7Change > 0 ? 'up' : ward7Change < 0 ? 'down' : 'stable',
    direction8: ward8Change > 0 ? 'up' : ward8Change < 0 ? 'down' : 'stable',
  };
}

// Get top N crime types
export function getTopCrimeTypes(
  byOffense: CrimeByOffense[],
  limit: number = 8
): CrimeByOffense[] {
  return byOffense.slice(0, limit);
}

// Filter incidents by year
export function filterByYear(incidents: CrimeIncident[], year: number): CrimeIncident[] {
  return incidents.filter((incident) => getYear(incident.REPORT_DAT) === year);
}

// Get complete crime statistics
export function getCrimeStats(incidents: CrimeIncident[]): CrimeStats {
  const totalByYear = aggregateCrimeByYear(incidents);
  const byOffense = aggregateCrimeByOffense(incidents);
  const byShift = aggregateCrimeByShift(incidents);
  const byMethod = aggregateCrimeByMethod(incidents);
  const trend = getCrimeTrend(totalByYear);

  // Calculate totals
  const ward7Total = incidents.filter((i) => i.WARD === '7').length;
  const ward8Total = incidents.filter((i) => i.WARD === '8').length;

  // Get latest year data
  const latestYear = totalByYear.length > 0 ? totalByYear[totalByYear.length - 1] : null;

  return {
    totalByYear,
    byOffense,
    byShift,
    byMethod,
    trend,
    totals: {
      ward7: ward7Total,
      ward8: ward8Total,
      all: ward7Total + ward8Total,
    },
    latestYear: latestYear
      ? {
          year: latestYear.year,
          ward7: latestYear.ward7,
          ward8: latestYear.ward8,
        }
      : { year: 0, ward7: 0, ward8: 0 },
  };
}

// Transform for grouped bar chart (offense breakdown)
export function getCrimeOffenseChartData(byOffense: CrimeByOffense[]) {
  return byOffense.map((o) => ({
    category: formatOffenseName(o.offense),
    ward7: o.ward7,
    ward8: o.ward8,
  }));
}

// Transform for grouped bar chart (shift breakdown)
export function getCrimeShiftChartData(byShift: CrimeByShift[]) {
  return byShift.map((s) => ({
    category: s.shift,
    ward7: s.ward7,
    ward8: s.ward8,
  }));
}

// Transform for grouped bar chart (method breakdown)
export function getCrimeMethodChartData(byMethod: CrimeByMethod[]) {
  return byMethod.map((m) => ({
    category: m.method,
    ward7: m.ward7,
    ward8: m.ward8,
  }));
}

// Format offense name for display
function formatOffenseName(offense: string): string {
  const nameMap: { [key: string]: string } = {
    'THEFT/OTHER': 'Theft',
    'THEFT F/AUTO': 'Theft from Auto',
    'MOTOR VEHICLE THEFT': 'Motor Vehicle Theft',
    'ASSAULT W/DANGEROUS WEAPON': 'Assault w/ Weapon',
    'SEX ABUSE': 'Sex Abuse',
    HOMICIDE: 'Homicide',
    ROBBERY: 'Robbery',
    BURGLARY: 'Burglary',
    ARSON: 'Arson',
  };
  return nameMap[offense] || offense;
}

// Get yearly sparkline data for a ward
export function getYearlySparkline(yearlyData: CrimeByYear[], ward: 'ward7' | 'ward8'): number[] {
  return yearlyData.map((y) => y[ward]);
}
