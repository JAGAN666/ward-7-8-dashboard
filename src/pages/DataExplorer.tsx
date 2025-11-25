import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWardComparisonData, useFoodAccessAnalysis } from '../hooks/useData';
import { Card, StatCard } from '../components/common/Card';
import { GroupedBarChart, HorizontalBarChart } from '../components/charts/GroupedBarChart';
import { EducationStackedChart, StoreTypeStackedChart } from '../components/charts/StackedBarChart';
import { StoreTypePieChart } from '../components/charts/PieChart';
import { getZipCodeChartData } from '../data/transformers/snapTransformer';
import { WARD_DATA, DC_AVERAGES, KEY_GAPS } from '../data/dcAverages';
import { formatCurrency } from '../utils/formatters';
import { COLORS } from '../utils/colors';

type DataCategory = 'economic' | 'housing' | 'education' | 'food';

export function DataExplorer() {
  const [activeCategory, setActiveCategory] = useState<DataCategory>('economic');
  const [showDCAverage, setShowDCAverage] = useState(true);

  const { charts, educationBreakdown, isLoading: loadingWard } = useWardComparisonData();
  const { snapByZip, storeTypes, stats, isLoading: loadingFood } = useFoodAccessAnalysis();

  const isLoading = loadingWard || loadingFood;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ward7 mx-auto mb-4" />
          <p className="text-slate-600">Loading data...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'economic' as const, label: 'Economic', icon: '💰' },
    { id: 'housing' as const, label: 'Housing', icon: '🏠' },
    { id: 'education' as const, label: 'Education', icon: '🎓' },
    { id: 'food' as const, label: 'Food Access', icon: '🍎' },
  ];

  const zipChartData = snapByZip ? getZipCodeChartData(snapByZip) : [];
  const pieChartData = storeTypes?.map((s) => ({
    name: s.type,
    value: s.count,
    percentage: s.percentage,
  })) || [];

  const zipBarData = snapByZip?.map((z) => ({
    name: `ZIP ${z.zipCode}`,
    value: z.total,
    color: z.zipCode === '20019' ? COLORS.ward7 : z.zipCode === '20020' ? COLORS.ward8 : '#64748b',
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-slate-400 hover:text-slate-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-2">Data Explorer</h1>
          <p className="text-slate-400">
            Explore the data yourself. Select a category to view detailed comparisons.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Category:</span>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {activeCategory !== 'food' && (
              <label className="flex items-center gap-2 ml-auto cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDCAverage}
                  onChange={(e) => setShowDCAverage(e.target.checked)}
                  className="w-4 h-4 rounded border border-slate-300"
                />
                <span className="text-sm text-slate-600">Show DC Average</span>
              </label>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Economic Data */}
          {activeCategory === 'economic' && charts && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <StatCard
                  label="Ward 7 Median Income"
                  value={formatCurrency(WARD_DATA.ward7.medianIncome)}
                  color="blue"
                />
                <StatCard
                  label="Ward 8 Median Income"
                  value={formatCurrency(WARD_DATA.ward8.medianIncome)}
                  color="purple"
                />
                <StatCard
                  label="Income Gap"
                  value={formatCurrency(KEY_GAPS.incomeGap)}
                  color="red"
                />
              </div>

              <Card
                title="Median Household Income"
                subtitle="Ward 7 vs Ward 8 vs DC Average"
              >
                <GroupedBarChart
                  data={charts.income}
                  format="currency"
                  height={350}
                  showDCAverage={showDCAverage}
                />
              </Card>

              <Card
                title="Employment and Poverty Rates"
                subtitle="Unemployment and poverty rates by ward"
              >
                <GroupedBarChart
                  data={charts.employment}
                  format="percent"
                  height={350}
                  showDCAverage={showDCAverage}
                />
              </Card>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <h3 className="font-semibold text-lg mb-4">Unemployment Comparison</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-slate-600">Area</th>
                        <th className="text-right py-2 text-slate-600">Rate</th>
                        <th className="text-right py-2 text-slate-600">vs DC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-medium text-ward7">Ward 7</td>
                        <td className="text-right">{WARD_DATA.ward7.unemploymentRate}%</td>
                        <td className="text-right text-red-600">
                          +{(WARD_DATA.ward7.unemploymentRate - DC_AVERAGES.unemploymentRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-medium text-ward8">Ward 8</td>
                        <td className="text-right">{WARD_DATA.ward8.unemploymentRate}%</td>
                        <td className="text-right text-red-600">
                          +{(WARD_DATA.ward8.unemploymentRate - DC_AVERAGES.unemploymentRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-500">DC Average</td>
                        <td className="text-right">{DC_AVERAGES.unemploymentRate}%</td>
                        <td className="text-right text-slate-400">—</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <Card>
                  <h3 className="font-semibold text-lg mb-4">Poverty Comparison</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-slate-600">Area</th>
                        <th className="text-right py-2 text-slate-600">Rate</th>
                        <th className="text-right py-2 text-slate-600">vs DC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-medium text-ward7">Ward 7</td>
                        <td className="text-right">{WARD_DATA.ward7.povertyRate}%</td>
                        <td className="text-right text-red-600">
                          +{(WARD_DATA.ward7.povertyRate - DC_AVERAGES.povertyRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-medium text-ward8">Ward 8</td>
                        <td className="text-right">{WARD_DATA.ward8.povertyRate}%</td>
                        <td className="text-right text-red-600">
                          +{(WARD_DATA.ward8.povertyRate - DC_AVERAGES.povertyRate).toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-500">DC Average</td>
                        <td className="text-right">{DC_AVERAGES.povertyRate}%</td>
                        <td className="text-right text-slate-400">—</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          )}

          {/* Housing Data */}
          {activeCategory === 'housing' && charts && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <StatCard
                  label="Ward 7 Homeownership"
                  value={`${WARD_DATA.ward7.homeownershipRate}%`}
                  color="blue"
                />
                <StatCard
                  label="Ward 8 Homeownership"
                  value={`${WARD_DATA.ward8.homeownershipRate}%`}
                  color="purple"
                />
                <StatCard
                  label="Homeownership Gap"
                  value={`${KEY_GAPS.homeownershipGap.toFixed(1)}%`}
                  color="red"
                />
              </div>

              <Card
                title="Homeownership Rate"
                subtitle="Percentage of owner-occupied housing units"
              >
                <GroupedBarChart
                  data={charts.housing}
                  format="percent"
                  height={350}
                  showDCAverage={showDCAverage}
                />
              </Card>

              <Card>
                <h3 className="font-semibold text-lg mb-4">Housing Tenure Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-ward7 mb-3">Ward 7</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Owner-Occupied</span>
                          <span>{WARD_DATA.ward7.homeownershipRate}%</span>
                        </div>
                        <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-ward7 rounded-full"
                            style={{ width: `${WARD_DATA.ward7.homeownershipRate}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Renter-Occupied</span>
                          <span>{(100 - WARD_DATA.ward7.homeownershipRate).toFixed(1)}%</span>
                        </div>
                        <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400 rounded-full"
                            style={{ width: `${100 - WARD_DATA.ward7.homeownershipRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-ward8 mb-3">Ward 8</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Owner-Occupied</span>
                          <span>{WARD_DATA.ward8.homeownershipRate}%</span>
                        </div>
                        <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-ward8 rounded-full"
                            style={{ width: `${WARD_DATA.ward8.homeownershipRate}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Renter-Occupied</span>
                          <span>{(100 - WARD_DATA.ward8.homeownershipRate).toFixed(1)}%</span>
                        </div>
                        <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400 rounded-full"
                            style={{ width: `${100 - WARD_DATA.ward8.homeownershipRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Education Data */}
          {activeCategory === 'education' && charts && educationBreakdown && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <StatCard
                  label="Ward 7 Bachelor's+"
                  value={`${WARD_DATA.ward7.bachelorsDegreeRate}%`}
                  color="blue"
                />
                <StatCard
                  label="Ward 8 Bachelor's+"
                  value={`${WARD_DATA.ward8.bachelorsDegreeRate}%`}
                  color="purple"
                />
                <StatCard
                  label="Education Gap"
                  value={`${KEY_GAPS.educationGap.toFixed(1)}%`}
                  color="red"
                />
              </div>

              <Card
                title="Bachelor's Degree or Higher"
                subtitle="Percentage of population 25+ with bachelor's degree or higher"
              >
                <GroupedBarChart
                  data={charts.education}
                  format="percent"
                  height={350}
                  showDCAverage={showDCAverage}
                />
              </Card>

              <Card
                title="Educational Attainment Breakdown"
                subtitle="Distribution of educational levels for population 25+"
              >
                <EducationStackedChart data={educationBreakdown} height={300} />
              </Card>
            </div>
          )}

          {/* Food Access Data */}
          {activeCategory === 'food' && snapByZip && storeTypes && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                  label="Total Retailers"
                  value={stats?.totalRetailers || 0}
                  color="purple"
                />
                <StatCard
                  label="Supermarkets"
                  value={stats?.supermarketCount || 0}
                  subValue={`${stats?.supermarketPercent.toFixed(1)}%`}
                  color="green"
                />
                <StatCard
                  label="Convenience Stores"
                  value={stats?.convenienceCount || 0}
                  subValue={`${stats?.conveniencePercent.toFixed(1)}%`}
                  color="red"
                />
                <StatCard
                  label="Convenience:Supermarket"
                  value={`${((stats?.convenienceCount || 0) / (stats?.supermarketCount || 1)).toFixed(0)}:1`}
                  subValue="Ratio"
                  color="gray"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
                <Card title="Retailers by ZIP Code">
                  <HorizontalBarChart data={zipBarData} height={250} />
                </Card>

                <Card title="Store Type Distribution">
                  <StoreTypePieChart data={pieChartData} height={280} />
                </Card>
              </div>

              <Card title="Store Types by ZIP Code">
                <StoreTypeStackedChart data={zipChartData} height={300} />
              </Card>

              <Card>
                <h3 className="font-semibold text-lg mb-4">Detailed Breakdown by ZIP Code</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 text-slate-600">ZIP Code</th>
                        <th className="text-right py-2 px-4 text-slate-600">Total</th>
                        <th className="text-right py-2 px-4 text-green-600">Supermarket</th>
                        <th className="text-right py-2 px-4 text-blue-600">Grocery</th>
                        <th className="text-right py-2 px-4 text-amber-600">Convenience</th>
                        <th className="text-right py-2 px-4 text-lime-600">Farmers Mkt</th>
                        <th className="text-right py-2 px-4 text-slate-500">Other</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapByZip.map((zip) => (
                        <tr key={zip.zipCode} className="border-b">
                          <td className="py-3 px-4 font-medium">{zip.zipCode}</td>
                          <td className="text-right py-3 px-4 font-semibold">{zip.total}</td>
                          <td className="text-right py-3 px-4 text-green-600">{zip.supermarkets}</td>
                          <td className="text-right py-3 px-4 text-blue-600">{zip.grocery}</td>
                          <td className="text-right py-3 px-4 text-amber-600">{zip.convenience}</td>
                          <td className="text-right py-3 px-4 text-lime-600">{zip.farmersMarket}</td>
                          <td className="text-right py-3 px-4 text-slate-500">{zip.other}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Data sources: US Census Bureau, American Community Survey 5-Year Estimates, USDA SNAP Retailer Locator</p>
        </div>
      </section>
    </div>
  );
}
