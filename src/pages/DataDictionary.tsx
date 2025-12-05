import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAllDataForDictionary } from '../hooks/useData';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';

type SortField = 'fieldCode' | 'label' | 'ward7Value' | 'ward8Value' | 'gap';
type SortOrder = 'asc' | 'desc';

export function DataDictionary() {
  const { allMetrics, dataSources, isLoading } = useAllDataForDictionary();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('fieldCode');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const formatValue = (value: number | null, format: string): string => {
    if (value === null) return 'N/A';
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercent(value);
      case 'ratio':
        return value.toFixed(1);
      default:
        return formatNumber(value);
    }
  };

  // Get unique categories from metrics
  const categories = useMemo(() => {
    if (!allMetrics) return [];
    const cats = new Set(allMetrics.map(m => m.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [allMetrics]);

  // Filter and sort metrics
  const filteredMetrics = useMemo(() => {
    if (!allMetrics) return [];

    let filtered = allMetrics.filter(m => {
      const matchesSearch = searchTerm === '' ||
        m.fieldCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSource = !selectedSource || m.source === selectedSource;
      const matchesCategory = !selectedCategory || m.category === selectedCategory;

      return matchesSearch && matchesSource && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortField) {
        case 'fieldCode':
          aVal = a.fieldCode;
          bVal = b.fieldCode;
          break;
        case 'label':
          aVal = a.label;
          bVal = b.label;
          break;
        case 'ward7Value':
          aVal = a.ward7Value ?? -Infinity;
          bVal = b.ward7Value ?? -Infinity;
          break;
        case 'ward8Value':
          aVal = a.ward8Value ?? -Infinity;
          bVal = b.ward8Value ?? -Infinity;
          break;
        case 'gap':
          aVal = a.gap ?? -Infinity;
          bVal = b.gap ?? -Infinity;
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [allMetrics, searchTerm, selectedSource, selectedCategory, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 text-slate-400">
      {sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading data dictionary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-indigo-300 hover:text-indigo-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Data Dictionary
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl">
            Complete reference of all data fields, their sources, and current values
            for Ward 7 and Ward 8. Use this for research verification and data validation.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm flex-wrap">
            <span className="bg-indigo-700/50 px-3 py-1 rounded-full">
              {allMetrics?.length || 0} total fields
            </span>
            <span className="bg-indigo-700/50 px-3 py-1 rounded-full">
              {dataSources?.length || 0} data sources
            </span>
          </div>
        </div>
      </section>

      {/* Data Sources Summary */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataSources?.map((source) => (
              <button
                key={source.name}
                onClick={() => setSelectedSource(selectedSource === source.name ? null : source.name)}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  selectedSource === source.name
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold text-slate-800">{source.name}</div>
                <div className="text-xs text-slate-500 font-mono">{source.prefix}</div>
                <div className="text-sm text-slate-600 mt-1">{source.metricsCount} fields</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by field code, label, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="text-sm text-slate-500">
              {filteredMetrics.length} results
            </div>
            {(searchTerm || selectedSource || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSource(null);
                  setSelectedCategory(null);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('fieldCode')}
                    >
                      Field Code <SortIcon field="fieldCode" />
                    </th>
                    <th
                      className="text-left py-3 px-4 text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('label')}
                    >
                      Label <SortIcon field="label" />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600">
                      Category
                    </th>
                    <th
                      className="text-right py-3 px-4 text-xs font-semibold text-ward7 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('ward7Value')}
                    >
                      Ward 7 <SortIcon field="ward7Value" />
                    </th>
                    <th
                      className="text-right py-3 px-4 text-xs font-semibold text-ward8 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('ward8Value')}
                    >
                      Ward 8 <SortIcon field="ward8Value" />
                    </th>
                    <th
                      className="text-right py-3 px-4 text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSort('gap')}
                    >
                      Gap <SortIcon field="gap" />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMetrics.map((metric) => (
                    <tr key={metric.fieldCode} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {metric.fieldCode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium text-slate-800">{metric.label}</div>
                        <div className="text-xs text-slate-500 max-w-xs truncate">{metric.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">
                          {metric.category || 'Other'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm font-semibold text-ward7">
                          {formatValue(metric.ward7Value, metric.format)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm font-semibold text-ward8">
                          {formatValue(metric.ward8Value, metric.format)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-medium ${
                          metric.gap && metric.gap > 0 ? 'text-ward7' :
                          metric.gap && metric.gap < 0 ? 'text-ward8' : 'text-slate-500'
                        }`}>
                          {metric.gap !== null ? (
                            <>
                              {metric.gap > 0 ? '+' : ''}{formatValue(metric.gap, metric.format)}
                            </>
                          ) : '—'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-slate-500">
                          {(metric as any).source}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-8 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Data Sources & Methodology</h2>
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800">American Community Survey (ACS)</h3>
              <p className="text-sm text-slate-600 mt-1">
                5-Year Estimates provide reliable data for small geographic areas like wards.
                Data is collected continuously by the U.S. Census Bureau and represents a
                5-year period of data collection. All ACS fields use the DP (Data Profile) series.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Field Code Prefixes</h3>
              <ul className="text-sm text-slate-600 mt-1 space-y-1">
                <li><span className="font-mono bg-slate-100 px-1 rounded">DP02</span> - Social Characteristics</li>
                <li><span className="font-mono bg-slate-100 px-1 rounded">DP03</span> - Economic Characteristics</li>
                <li><span className="font-mono bg-slate-100 px-1 rounded">DP04</span> - Housing Characteristics</li>
                <li><span className="font-mono bg-slate-100 px-1 rounded">DP05</span> - Demographic Characteristics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Field Code Suffixes</h3>
              <ul className="text-sm text-slate-600 mt-1 space-y-1">
                <li><span className="font-mono bg-slate-100 px-1 rounded">E</span> - Estimate (raw count or value)</li>
                <li><span className="font-mono bg-slate-100 px-1 rounded">PE</span> - Percent Estimate (percentage)</li>
                <li><span className="font-mono bg-slate-100 px-1 rounded">M</span> - Margin of Error</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Gap Calculation</h3>
              <p className="text-sm text-slate-600 mt-1">
                Gap = Ward 7 Value - Ward 8 Value. A positive gap indicates Ward 7 has a higher value;
                a negative gap indicates Ward 8 has a higher value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/food-access"
            className="text-slate-600 hover:text-slate-800 font-medium"
          >
            ← Food Access Data
          </Link>
          <Link
            to="/demographics"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Demographics Data →
          </Link>
        </div>
      </section>
    </div>
  );
}
