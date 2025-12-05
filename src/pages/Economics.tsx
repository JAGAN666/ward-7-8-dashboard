import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEconomicsAnalysis } from '../hooks/useData';
import { MetricCategorySection } from '../components/common/MetricCard';

export function Economics() {
  const { metrics, metricsByCategory, isLoading } = useEconomicsAnalysis();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFieldCodes, setShowFieldCodes] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading economic data...</p>
        </div>
      </div>
    );
  }

  const categories = metricsByCategory ? Object.keys(metricsByCategory) : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-green-300 hover:text-green-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Economic Characteristics
          </h1>
          <p className="text-xl text-green-200 max-w-3xl">
            In-depth economic comparison including employment, income, poverty rates,
            industry distribution, and public assistance programs.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <span className="bg-green-700/50 px-3 py-1 rounded-full">
              {metrics?.length || 0} metrics
            </span>
            <span className="bg-green-700/50 px-3 py-1 rounded-full">
              Source: ACS 5-Year Estimates (DP03)
            </span>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-4 bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFieldCodes}
                onChange={(e) => setShowFieldCodes(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-600">Show field codes</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {metricsByCategory && categories.map(category => (
            <MetricCategorySection
              key={category}
              category={category}
              metrics={metricsByCategory[category]}
              showFieldCodes={showFieldCodes}
              viewMode={viewMode}
            />
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/demographics"
            className="text-slate-600 hover:text-slate-800 font-medium"
          >
            ← Demographics Data
          </Link>
          <Link
            to="/housing"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Housing Data →
          </Link>
        </div>
      </section>
    </div>
  );
}
