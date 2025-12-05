interface MapFilters {
  ward: 'all' | '7' | '8';
  years: number[];
  offenseTypes: string[];
  storeTypes: string[];
}

interface MapFiltersProps {
  filters: MapFilters;
  availableYears: number[];
  availableOffenses: string[];
  availableStoreTypes: string[];
  onFilterChange: (key: keyof MapFilters, value: MapFilters[keyof MapFilters]) => void;
}

export function MapFiltersPanel({
  filters,
  availableYears,
  availableOffenses,
  availableStoreTypes,
  onFilterChange,
}: MapFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
      <h3 className="font-semibold text-slate-700 mb-3">Filters</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Ward Filter */}
        <div>
          <label className="text-xs text-slate-500 block mb-1 font-medium">Ward</label>
          <select
            value={filters.ward}
            onChange={(e) => onFilterChange('ward', e.target.value as MapFilters['ward'])}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Wards</option>
            <option value="7">Ward 7</option>
            <option value="8">Ward 8</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="text-xs text-slate-500 block mb-1 font-medium">Year</label>
          <select
            value={filters.years[0] || 'all'}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'all') {
                onFilterChange('years', availableYears);
              } else {
                onFilterChange('years', [Number(val)]);
              }
            }}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Offense Type Filter */}
        <div>
          <label className="text-xs text-slate-500 block mb-1 font-medium">Offense Type</label>
          <select
            value={filters.offenseTypes[0] || ''}
            onChange={(e) =>
              onFilterChange('offenseTypes', e.target.value ? [e.target.value] : [])
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Offenses</option>
            {availableOffenses.map((offense) => (
              <option key={offense} value={offense}>
                {offense}
              </option>
            ))}
          </select>
        </div>

        {/* Store Type Filter */}
        <div>
          <label className="text-xs text-slate-500 block mb-1 font-medium">Store Type</label>
          <select
            value={filters.storeTypes[0] || ''}
            onChange={(e) =>
              onFilterChange('storeTypes', e.target.value ? [e.target.value] : [])
            }
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Store Types</option>
            {availableStoreTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.ward !== 'all' ||
        filters.years.length !== availableYears.length ||
        filters.offenseTypes.length > 0 ||
        filters.storeTypes.length > 0) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500">Active filters:</span>
          {filters.ward !== 'all' && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
              Ward {filters.ward}
            </span>
          )}
          {filters.years.length === 1 && (
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
              {filters.years[0]}
            </span>
          )}
          {filters.offenseTypes.length > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
              {filters.offenseTypes[0]}
            </span>
          )}
          {filters.storeTypes.length > 0 && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
              {filters.storeTypes[0]}
            </span>
          )}
          <button
            onClick={() => {
              onFilterChange('ward', 'all');
              onFilterChange('years', availableYears);
              onFilterChange('offenseTypes', []);
              onFilterChange('storeTypes', []);
            }}
            className="text-xs text-slate-500 hover:text-slate-700 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export type { MapFilters };
