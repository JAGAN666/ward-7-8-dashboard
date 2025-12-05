import { useState } from 'react';

interface LayerControlProps {
  layers: {
    wardBoundaries: boolean;
    crimeIncidents: boolean;
    snapRetailers: boolean;
  };
  onToggle: (layer: keyof LayerControlProps['layers']) => void;
  crimeCount: number;
  snapCount: number;
}

export function LayerControl({ layers, onToggle, crimeCount, snapCount }: LayerControlProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-lg border border-slate-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2.5 text-left font-semibold text-slate-700 border-b border-slate-200 flex justify-between items-center hover:bg-slate-50 rounded-t-xl"
      >
        <span>Layers</span>
        <span className="text-slate-400 text-sm">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="p-3 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={layers.wardBoundaries}
              onChange={() => onToggle('wardBoundaries')}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-gradient-to-r from-ward7 to-ward8 rounded"></div>
              <span className="text-sm text-slate-700">Ward Boundaries</span>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={layers.crimeIncidents}
              onChange={() => onToggle('crimeIncidents')}
              className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-700">Crime Incidents</span>
              <span className="text-xs text-slate-400 ml-auto">
                ({crimeCount.toLocaleString()})
              </span>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={layers.snapRetailers}
              onChange={() => onToggle('snapRetailers')}
              className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-sm text-slate-700">SNAP Retailers</span>
              <span className="text-xs text-slate-400 ml-auto">({snapCount})</span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
