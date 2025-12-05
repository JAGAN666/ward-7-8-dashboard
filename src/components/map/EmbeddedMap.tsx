import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Data } from 'plotly.js';
import { BaseMap, createWardBoundaryTraces, createCrimeTrace, createSNAPTrace, MapLegend } from './';
import { useWardBoundaries } from '../../hooks/useWardBoundaries';
import type { CrimeIncident } from '../../types/crime';
import type { SNAPRetailer } from '../../types';

interface EmbeddedMapProps {
  variant: 'crime' | 'food' | 'both';
  crimeData?: CrimeIncident[];
  snapData?: SNAPRetailer[];
  height?: string;
  showFullMapLink?: boolean;
  showLegend?: boolean;
  title?: string;
}

export function EmbeddedMap({
  variant,
  crimeData = [],
  snapData = [],
  height = '400px',
  showFullMapLink = true,
  showLegend = true,
  title,
}: EmbeddedMapProps) {
  const { data: wardGeoJSON } = useWardBoundaries();

  const showCrime = variant === 'crime' || variant === 'both';
  const showSnap = variant === 'food' || variant === 'both';

  // Build Plotly traces
  const traces = useMemo(() => {
    const result: Data[] = [];

    // Add ward boundary traces first
    const boundaryTraces = createWardBoundaryTraces({
      geojson: wardGeoJSON ?? null,
      visible: true,
    });
    result.push(...boundaryTraces);

    // Add crime trace if applicable
    if (showCrime) {
      const crimeTrace = createCrimeTrace({
        crimes: crimeData,
        visible: true,
      });
      if (crimeTrace) result.push(crimeTrace);
    }

    // Add SNAP trace if applicable
    if (showSnap) {
      const snapTrace = createSNAPTrace({
        retailers: snapData,
        visible: true,
      });
      if (snapTrace) result.push(snapTrace);
    }

    return result;
  }, [wardGeoJSON, crimeData, snapData, showCrime, showSnap]);

  return (
    <div className="relative">
      {title && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
          <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
        </div>
      )}

      <BaseMap
        traces={traces}
        height={height}
        className="w-full rounded-xl"
        scrollZoom={false}
      />

      {showLegend && (
        <MapLegend showCrime={showCrime} showSnap={showSnap} />
      )}

      {showFullMapLink && (
        <Link
          to="/map"
          className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 z-[1000] transition-colors"
        >
          View Full Map →
        </Link>
      )}
    </div>
  );
}
