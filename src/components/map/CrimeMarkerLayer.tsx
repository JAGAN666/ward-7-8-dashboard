import type { Data } from 'plotly.js';
import type { CrimeIncident } from '../../types/crime';
import { OFFENSE_CATEGORIES } from '../../types/crime';

// Check if offense is violent
export const isViolentOffense = (offense: string): boolean => {
  return OFFENSE_CATEGORIES.violent.some(v =>
    offense.toUpperCase().includes(v.toUpperCase())
  );
};

// Crime severity color mapping
export const getCrimeColor = (offense: string): string => {
  if (isViolentOffense(offense)) {
    return '#dc2626'; // red for violent crimes
  }
  return '#f97316'; // orange for property crimes
};

// Format date from timestamp
const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

interface CrimeMarkerLayerProps {
  crimes: CrimeIncident[];
  visible: boolean;
}

export function createCrimeTrace({ crimes, visible }: CrimeMarkerLayerProps): Data | null {
  if (!visible || !crimes.length) return null;

  // Filter crimes with valid coordinates
  const validCrimes = crimes.filter(c => c.LATITUDE && c.LONGITUDE);

  const lats = validCrimes.map(c => c.LATITUDE);
  const lons = validCrimes.map(c => c.LONGITUDE);
  const colors = validCrimes.map(c => getCrimeColor(c.OFFENSE));
  const sizes = validCrimes.map(c => isViolentOffense(c.OFFENSE) ? 10 : 8);

  const hovertext = validCrimes.map(c => {
    const type = isViolentOffense(c.OFFENSE) ? 'Violent' : 'Property';
    return `<b>${c.OFFENSE}</b><br>${type} Crime<br>${c.BLOCK}<br>Ward ${c.WARD}<br>${formatDate(c.REPORT_DAT)}`;
  });

  return {
    type: 'scattermapbox',
    lat: lats,
    lon: lons,
    mode: 'markers',
    marker: {
      size: sizes,
      color: colors,
      opacity: 0.8,
    },
    hoverinfo: 'text',
    hovertext: hovertext,
    name: 'Crime Incidents',
  } as Data;
}

// Legacy component for backwards compatibility - just returns null
export function CrimeMarkerLayer(_props: CrimeMarkerLayerProps) {
  return null;
}
