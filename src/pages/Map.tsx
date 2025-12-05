import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Data } from 'plotly.js';
import {
  BaseMap,
  createWardBoundaryTraces,
  createCrimeTrace,
  createSNAPTrace,
  LayerControl,
  MapLegend,
  MapFiltersPanel,
} from '../components/map';
import type { MapFilters } from '../components/map';
import { useWardBoundaries } from '../hooks/useWardBoundaries';
import { useCrimeData, useFoodAccessAnalysis } from '../hooks/useData';

// Available years in the crime data
const AVAILABLE_YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

export function Map() {
  const { data: wardGeoJSON } = useWardBoundaries();
  const { data: crimeData, isLoading: loadingCrime } = useCrimeData();
  const { activeRetailers, isLoading: loadingSnap } = useFoodAccessAnalysis();

  const [layers, setLayers] = useState({
    wardBoundaries: true,
    crimeIncidents: true,
    snapRetailers: true,
  });

  const [filters, setFilters] = useState<MapFilters>({
    ward: 'all',
    years: AVAILABLE_YEARS,
    offenseTypes: [],
    storeTypes: [],
  });

  // Get unique offense types from crime data
  const availableOffenses = useMemo(() => {
    if (!crimeData) return [];
    const offenses = new Set(crimeData.map((c) => c.OFFENSE));
    return Array.from(offenses).sort();
  }, [crimeData]);

  // Get unique store types from SNAP data
  const availableStoreTypes = useMemo(() => {
    if (!activeRetailers) return [];
    const types = new Set(activeRetailers.map((r) => r['Store Type']));
    return Array.from(types).sort();
  }, [activeRetailers]);

  // Filter crime data based on filters
  const filteredCrimes = useMemo(() => {
    if (!crimeData) return [];
    return crimeData.filter((crime) => {
      // Ward filter
      if (filters.ward !== 'all' && crime.WARD !== filters.ward) return false;

      // Year filter
      const year = new Date(crime.REPORT_DAT).getFullYear();
      if (filters.years.length > 0 && !filters.years.includes(year)) return false;

      // Offense type filter
      if (filters.offenseTypes.length > 0 && !filters.offenseTypes.includes(crime.OFFENSE))
        return false;

      return true;
    });
  }, [crimeData, filters]);

  // Filter SNAP data based on filters
  const filteredRetailers = useMemo(() => {
    if (!activeRetailers) return [];
    return activeRetailers.filter((retailer) => {
      // Store type filter
      if (
        filters.storeTypes.length > 0 &&
        !filters.storeTypes.includes(retailer['Store Type'])
      )
        return false;
      return true;
    });
  }, [activeRetailers, filters]);

  // Build Plotly traces
  const traces = useMemo(() => {
    const result: Data[] = [];

    // Add ward boundary traces first (so they render below markers)
    const boundaryTraces = createWardBoundaryTraces({
      geojson: wardGeoJSON ?? null,
      visible: layers.wardBoundaries,
    });
    result.push(...boundaryTraces);

    // Add crime trace
    const crimeTrace = createCrimeTrace({
      crimes: filteredCrimes,
      visible: layers.crimeIncidents,
    });
    if (crimeTrace) result.push(crimeTrace);

    // Add SNAP trace
    const snapTrace = createSNAPTrace({
      retailers: filteredRetailers,
      visible: layers.snapRetailers,
    });
    if (snapTrace) result.push(snapTrace);

    return result;
  }, [wardGeoJSON, filteredCrimes, filteredRetailers, layers]);

  const handleToggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleFilterChange = (key: keyof MapFilters, value: MapFilters[keyof MapFilters]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Only block on critical data (crime and snap), ward boundaries are optional/progressive
  const isLoading = loadingCrime || loadingSnap;

  // Check for errors
  const isError = (crimeData === undefined && !loadingCrime) || (activeRetailers === undefined && !loadingSnap);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading map data...</p>
          <p className="text-slate-400 text-sm mt-2">This may take a few seconds...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Unable to Load Map Data</h2>
          <p className="text-slate-600 mb-6">
            We encountered an issue loading the crime or food access data. This might be due to a network connection issue.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">
              Return Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-blue-300 hover:text-blue-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Interactive Map</h1>
          <p className="text-lg text-slate-300">
            Explore crime incidents, SNAP food retailers, and ward boundaries across Ward 7
            and Ward 8.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <MapFiltersPanel
            filters={filters}
            availableYears={AVAILABLE_YEARS}
            availableOffenses={availableOffenses}
            availableStoreTypes={availableStoreTypes}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* Map */}
      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            <BaseMap traces={traces} height="600px" />

            <LayerControl
              layers={layers}
              onToggle={handleToggleLayer}
              crimeCount={filteredCrimes.length}
              snapCount={filteredRetailers.length}
            />

            <MapLegend
              showCrime={layers.crimeIncidents}
              showSnap={layers.snapRetailers}
            />
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Data Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="text-2xl font-bold text-red-600">
                {filteredCrimes.length.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Crime Incidents</div>
              {crimeData && filteredCrimes.length < crimeData.length && (
                <div className="text-xs text-slate-400 mt-1">
                  of {crimeData.length.toLocaleString()} total
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="text-2xl font-bold text-green-600">
                {filteredRetailers.length}
              </div>
              <div className="text-sm text-slate-600">SNAP Retailers</div>
              {activeRetailers && filteredRetailers.length < activeRetailers.length && (
                <div className="text-xs text-slate-400 mt-1">
                  of {activeRetailers.length} total
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="text-2xl font-bold text-ward7">
                {filteredCrimes.filter((c) => c.WARD === '7').length.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Ward 7 Crimes</div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="text-2xl font-bold text-ward8">
                {filteredCrimes.filter((c) => c.WARD === '8').length.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Ward 8 Crimes</div>
            </div>
          </div>

          {/* Crime breakdown by type */}
          <div className="mt-6 bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-700 mb-3">
              Top Offense Types (Filtered)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(
                filteredCrimes.reduce(
                  (acc, c) => {
                    acc[c.OFFENSE] = (acc[c.OFFENSE] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>
                )
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([offense, count]) => (
                  <div key={offense} className="text-sm">
                    <div className="font-medium text-slate-700 truncate" title={offense}>
                      {offense}
                    </div>
                    <div className="text-slate-500">{count.toLocaleString()}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-slate-600 hover:underline font-medium">
            ← Back to Home
          </Link>
          <div className="flex gap-4">
            <Link
              to="/crime"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Crime Analysis →
            </Link>
            <Link
              to="/food-access"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Food Access →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
