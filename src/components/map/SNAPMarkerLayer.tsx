import type { Data } from 'plotly.js';
import type { SNAPRetailer } from '../../types';

// Store type color mapping
export const STORE_TYPE_COLORS: Record<string, string> = {
  'SUPER MARKET': '#22c55e', // green
  'SUPERMARKET': '#22c55e',
  'LARGE GROCERY STORE': '#16a34a',
  'MEDIUM GROCERY STORE': '#65a30d',
  'SMALL GROCERY STORE': '#84cc16',
  'CONVENIENCE STORE': '#f59e0b', // amber
  'COMBINATION GROCERY/OTHER': '#eab308',
  'SPECIALTY FOOD STORE': '#06b6d4', // cyan
  'FARMERS MARKET': '#10b981', // emerald
  'DELIVERY ROUTE': '#8b5cf6', // violet
  'MILITARY COMMISSARY': '#6366f1', // indigo
};

export const getStoreTypeColor = (storeType: string): string => {
  const normalized = storeType.toUpperCase();
  for (const [key, color] of Object.entries(STORE_TYPE_COLORS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return color;
    }
  }
  return '#94a3b8'; // slate for unknown types
};

interface SNAPMarkerLayerProps {
  retailers: SNAPRetailer[];
  visible: boolean;
}

export function createSNAPTrace({ retailers, visible }: SNAPMarkerLayerProps): Data | null {
  if (!visible || !retailers.length) return null;

  // Filter retailers with valid coordinates
  const validRetailers = retailers.filter(r => r.Latitude && r.Longitude);

  if (validRetailers.length === 0) return null;

  const lats = validRetailers.map(r => r.Latitude);
  const lons = validRetailers.map(r => r.Longitude);
  const colors = validRetailers.map(r => getStoreTypeColor(r['Store Type']));
  const sizes = validRetailers.map(r => {
    const type = r['Store Type'].toUpperCase();
    // Make markers larger for visibility
    return type.includes('SUPER') || type.includes('LARGE') ? 16 : 12;
  });

  const hovertext = validRetailers.map(r => {
    return `<b>${r['Store Name']}</b><br>${r['Store Type']}<br>${r['Street Number']} ${r['Street Name']}<br>${r.City}, ${r.State} ${r['Zip Code']}`;
  });

  return {
    type: 'scattermapbox',
    lat: lats,
    lon: lons,
    mode: 'markers',
    marker: {
      size: sizes,
      color: colors,
      opacity: 0.9,
      // Note: 'circle' is the default for open-street-map style
      // 'square' and other symbols require Mapbox token
    },
    hoverinfo: 'text',
    hovertext: hovertext,
    name: 'SNAP Retailers',
  } as Data;
}

// Legacy component for backwards compatibility - just returns null
export function SNAPMarkerLayer(_props: SNAPMarkerLayerProps) {
  return null;
}
