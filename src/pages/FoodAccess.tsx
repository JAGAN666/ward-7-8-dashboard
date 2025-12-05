import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFoodAccessAnalysis } from '../hooks/useData';
import { formatNumber, formatPercent } from '../utils/formatters';
import { EmbeddedMap } from '../components/map';

export function FoodAccess() {
  const { snapByZip, storeTypes, stats, foodAccessTracts, activeRetailers, isLoading } = useFoodAccessAnalysis();
  const [viewMode, setViewMode] = useState<'summary' | 'map' | 'retailers' | 'tracts'>('summary');
  const [selectedZip, setSelectedZip] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading food access data...</p>
        </div>
      </div>
    );
  }

  const zipCodes = snapByZip ? Object.keys(snapByZip).sort() : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-teal-300 hover:text-teal-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Food Access Analysis
          </h1>
          <p className="text-xl text-teal-200 max-w-3xl">
            Comprehensive analysis of SNAP retailer distribution, food access indicators,
            and low income/low access census tracts in Wards 7 and 8.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm flex-wrap">
            <span className="bg-teal-700/50 px-3 py-1 rounded-full">
              {stats?.totalRetailers || 0} SNAP retailers
            </span>
            <span className="bg-teal-700/50 px-3 py-1 rounded-full">
              {foodAccessTracts?.length || 0} census tracts
            </span>
            <span className="bg-teal-700/50 px-3 py-1 rounded-full">
              Source: USDA Food Access Atlas
            </span>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-4 bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('summary')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'summary'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode('retailers')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'retailers'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              SNAP Retailers
            </button>
            <button
              onClick={() => setViewMode('tracts')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'tracts'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Census Tracts
            </button>
          </div>
          {viewMode === 'retailers' && (
            <select
              value={selectedZip || ''}
              onChange={(e) => setSelectedZip(e.target.value || null)}
              className="px-3 py-1.5 rounded border border-slate-300 text-sm"
            >
              <option value="">All ZIP codes</option>
              {zipCodes.map(zip => (
                <option key={zip} value={zip}>{zip}</option>
              ))}
            </select>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {viewMode === 'map' && activeRetailers && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">SNAP Retailer Locations</h3>
                  <p className="text-xs text-slate-500">
                    Interactive map of {activeRetailers.length} SNAP-authorized retailers in Wards 7 & 8
                  </p>
                </div>
                <EmbeddedMap
                  variant="food"
                  snapData={activeRetailers}
                  height="500px"
                  showFullMapLink={true}
                  showLegend={true}
                />
              </div>
            </div>
          )}

          {viewMode === 'summary' && (
            <div className="space-y-8">
              {/* Overall Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <div className="text-3xl font-bold text-teal-700">{formatNumber(stats?.totalRetailers || 0)}</div>
                  <div className="text-sm text-slate-600 mt-1">Total SNAP Retailers</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <div className="text-3xl font-bold text-teal-700">{formatNumber(stats?.supermarketCount || 0)}</div>
                  <div className="text-sm text-slate-600 mt-1">Supermarkets</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <div className="text-3xl font-bold text-teal-700">{formatNumber(storeTypes?.find(s => s.type === 'Grocery Store')?.count || 0)}</div>
                  <div className="text-sm text-slate-600 mt-1">Grocery Stores</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <div className="text-3xl font-bold text-teal-700">{formatNumber(stats?.convenienceCount || 0)}</div>
                  <div className="text-sm text-slate-600 mt-1">Convenience Stores</div>
                </div>
              </div>

              {/* Store Type Distribution */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Store Type Distribution</h3>
                  <p className="text-xs text-slate-500">Breakdown of SNAP-authorized retailers by type</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Store Type</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Count</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Percentage</th>
                        <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Distribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeTypes?.map((type) => (
                        <tr key={type.type} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm font-medium text-slate-800">{type.type}</td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">{formatNumber(type.count)}</td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">{formatPercent(type.percentage)}</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-teal-600 h-2 rounded-full"
                                style={{ width: `${Math.min(type.percentage, 100)}%` }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SNAP by ZIP Code */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">SNAP Retailers by ZIP Code</h3>
                  <p className="text-xs text-slate-500">Distribution of SNAP-authorized retailers across ZIP codes</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">ZIP Code</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Total</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Supermarkets</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Grocery</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Convenience</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Other</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapByZip && Object.entries(snapByZip)
                        .sort(([, a], [, b]) => b.total - a.total)
                        .map(([zip, data]) => (
                          <tr key={zip} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4 text-sm font-medium text-slate-800">{zip}</td>
                            <td className="py-3 px-4 text-sm text-right font-semibold text-teal-700">{data.total}</td>
                            <td className="py-3 px-4 text-sm text-right text-slate-700">{data.supermarkets}</td>
                            <td className="py-3 px-4 text-sm text-right text-slate-700">{data.grocery}</td>
                            <td className="py-3 px-4 text-sm text-right text-slate-700">{data.convenience}</td>
                            <td className="py-3 px-4 text-sm text-right text-slate-700">{data.other}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'retailers' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">
                  SNAP Retailers {selectedZip ? `in ${selectedZip}` : '(All)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeRetailers?.filter(r => !selectedZip || r['Zip Code'] === selectedZip).length || 0} retailers
                </p>
              </div>
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Store Name</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Type</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Address</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">ZIP</th>
                      <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Auth Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRetailers
                      ?.filter(r => !selectedZip || r['Zip Code'] === selectedZip)
                      .map((retailer) => (
                        <tr key={retailer['Record ID']} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm font-medium text-slate-800">{retailer['Store Name']}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{retailer['Store Type']}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">
                            {retailer['Street Number']} {retailer['Street Name']}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">{retailer['Zip Code']}</td>
                          <td className="py-3 px-4 text-sm text-slate-500">{retailer['Authorization Date']}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'tracts' && (
            <div className="space-y-8">
              {/* Food Access Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {foodAccessTracts && (
                  <>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                      <div className="text-3xl font-bold text-teal-700">
                        {foodAccessTracts.filter(t => t.LILATracts_1And10 === 1).length}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">Low Income, Low Access (1mi)</div>
                      <p className="text-xs text-slate-400 mt-2">Tracts with low income and more than 1 mile to supermarket</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                      <div className="text-3xl font-bold text-teal-700">
                        {foodAccessTracts.filter(t => t.LILATracts_halfAnd10 === 1).length}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">Low Income, Low Access (0.5mi)</div>
                      <p className="text-xs text-slate-400 mt-2">Tracts with low income and more than 0.5 mile to supermarket</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                      <div className="text-3xl font-bold text-teal-700">
                        {foodAccessTracts.filter(t => t.LILATracts_Vehicle === 1).length}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">Vehicle Access Issues</div>
                      <p className="text-xs text-slate-400 mt-2">Tracts with significant households lacking vehicle access</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                      <div className="text-3xl font-bold text-teal-700">
                        {formatPercent(
                          foodAccessTracts.reduce((sum, t) => sum + t.PovertyRate, 0) / foodAccessTracts.length
                        )}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">Avg Poverty Rate</div>
                      <p className="text-xs text-slate-400 mt-2">Average poverty rate across all tracts</p>
                    </div>
                  </>
                )}
              </div>

              {/* Census Tracts Table */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Census Tract Details</h3>
                  <p className="text-xs text-slate-500">Food Access Atlas data for DC census tracts</p>
                </div>
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Census Tract</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Population</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Poverty Rate</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">Median Income</th>
                        <th className="text-center py-2 px-4 text-xs font-semibold text-slate-600">LILA (1mi)</th>
                        <th className="text-center py-2 px-4 text-xs font-semibold text-slate-600">LILA (0.5mi)</th>
                        <th className="text-center py-2 px-4 text-xs font-semibold text-slate-600">Vehicle</th>
                        <th className="text-right py-2 px-4 text-xs font-semibold text-slate-600">SNAP %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodAccessTracts?.map((tract) => (
                        <tr key={tract.CensusTract} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm font-mono text-slate-800">{tract.CensusTract}</td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">{formatNumber(tract.Pop2010)}</td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">{formatPercent(tract.PovertyRate)}</td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">${formatNumber(tract.MedianFamilyIncome)}</td>
                          <td className="py-3 px-4 text-center">
                            {tract.LILATracts_1And10 === 1 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs">!</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {tract.LILATracts_halfAnd10 === 1 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs">!</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {tract.LILATracts_Vehicle === 1 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs">!</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-slate-700">{formatPercent(tract.TractSNAP)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/social"
            className="text-slate-600 hover:text-slate-800 font-medium"
          >
            ← Social Data
          </Link>
          <Link
            to="/data-dictionary"
            className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Data Dictionary →
          </Link>
        </div>
      </section>
    </div>
  );
}
