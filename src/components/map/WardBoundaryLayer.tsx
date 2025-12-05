import type { Data } from 'plotly.js';
import type { GeoJsonObject, Feature, Geometry, Position } from 'geojson';

interface WardBoundaryLayerProps {
  geojson: GeoJsonObject | null;
  visible: boolean;
}

const WARD_COLORS: Record<string, string> = {
  '7': '#2563eb', // blue
  '8': '#7c3aed', // purple
};

// Extract coordinates from GeoJSON geometry
function extractCoordinates(geometry: Geometry): { lats: number[]; lons: number[] }[] {
  const result: { lats: number[]; lons: number[] }[] = [];

  if (geometry.type === 'Polygon') {
    for (const ring of geometry.coordinates) {
      const lons = (ring as Position[]).map(coord => coord[0]);
      const lats = (ring as Position[]).map(coord => coord[1]);
      result.push({ lats, lons });
    }
  } else if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        const lons = (ring as Position[]).map(coord => coord[0]);
        const lats = (ring as Position[]).map(coord => coord[1]);
        result.push({ lats, lons });
      }
    }
  }

  return result;
}

export function createWardBoundaryTraces({ geojson, visible }: WardBoundaryLayerProps): Data[] {
  if (!visible || !geojson) return [];

  const traces: Data[] = [];

  // Handle FeatureCollection
  if (geojson.type === 'FeatureCollection') {
    const fc = geojson as { type: 'FeatureCollection'; features: Feature[] };

    for (const feature of fc.features) {
      const ward = feature.properties?.WARD || feature.properties?.NAME?.replace('Ward ', '');
      const isWard7 = ward === '7' || ward?.includes?.('7');
      const color = isWard7 ? WARD_COLORS['7'] : WARD_COLORS['8'];

      const coordSets = extractCoordinates(feature.geometry);

      for (const { lats, lons } of coordSets) {
        traces.push({
          type: 'scattermapbox',
          lat: lats,
          lon: lons,
          mode: 'lines',
          line: {
            width: 3,
            color: color,
          },
          fill: 'toself',
          fillcolor: `${color}1A`, // 10% opacity
          hoverinfo: 'text',
          hovertext: `Ward ${ward}`,
          name: `Ward ${ward}`,
        } as Data);
      }
    }
  }

  return traces;
}

// Legacy component for backwards compatibility - just returns null
export function WardBoundaryLayer(_props: WardBoundaryLayerProps) {
  return null;
}
