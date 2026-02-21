import { useState } from 'react';
import { STORE_TYPE_COLORS } from './SNAPMarkerLayer';

interface MapLegendProps {
  showCrime?: boolean;
  showSnap?: boolean;
}

export function MapLegend({ showCrime = true, showSnap = true }: MapLegendProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-lg border border-slate-200 max-w-[220px]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2 text-left font-semibold text-slate-700 border-b border-slate-200 flex justify-between items-center hover:bg-slate-50 rounded-t-xl text-sm"
      >
        <span>Legend</span>
        <span className="text-slate-400 text-xs">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="p-3 space-y-3 text-xs">
          {/* Ward Boundaries */}
          <div>
            <div className="font-medium text-slate-600 mb-1.5">Ward Boundaries</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-ward7 rounded"></div>
                <span className="text-slate-600">Ward 7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-ward8 rounded"></div>
                <span className="text-slate-600">Ward 8</span>
              </div>
            </div>
          </div>

          {/* Crime Markers */}
          {showCrime && (
            <div className="pt-2 border-t border-slate-100">
              <div className="font-medium text-slate-600 mb-1.5">Crime Incidents</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  <span className="text-slate-600">Violent Crime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-600">Property Crime</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-5 h-5 rounded-full bg-red-500/80 flex items-center justify-center text-white text-[8px] font-bold">
                    5
                  </div>
                  <span className="text-slate-600">Cluster (count)</span>
                </div>
              </div>
            </div>
          )}

          {/* SNAP Retailers */}
          {showSnap && (
            <div className="pt-2 border-t border-slate-100">
              <div className="font-medium text-slate-600 mb-1.5">SNAP Retailers</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: STORE_TYPE_COLORS['SUPER MARKET'] }}
                  ></div>
                  <span className="text-slate-600">Supermarket</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded"
                    style={{ backgroundColor: STORE_TYPE_COLORS['CONVENIENCE STORE'] }}
                  ></div>
                  <span className="text-slate-600">Convenience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded"
                    style={{ backgroundColor: STORE_TYPE_COLORS['SPECIALTY FOOD STORE'] }}
                  ></div>
                  <span className="text-slate-600">Specialty/Other</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
