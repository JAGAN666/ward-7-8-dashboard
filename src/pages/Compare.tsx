import { Link } from 'react-router-dom';
import { useWardComparisonData, useCrimeAnalysis, useFoodAccessAnalysis } from '../hooks/useData';
import { Card } from '../components/common/Card';
import { ComparisonCard } from '../components/common/ComparisonCard';
import { DC_AVERAGES, extractWardStats } from '../data/dcAverages';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { COLORS } from '../utils/colors';

export function Compare() {
  const { data: wardData, isLoading: loadingWard } = useWardComparisonData();
  const { stats: crimeStats, isLoading: loadingCrime } = useCrimeAnalysis();
  const { stats: foodStats, isLoading: loadingFood } = useFoodAccessAnalysis();

  const isLoading = loadingWard || loadingCrime || loadingFood;

  if (isLoading || !wardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  // Extract ward data dynamically from the loaded data
  const { ward7, ward8 } = extractWardStats(wardData);
  const dc = DC_AVERAGES;

  if (!ward7 || !ward8) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Error loading ward data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ward7 to-ward8 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ward 7 vs Ward 8
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            A comprehensive side-by-side comparison of all key metrics between DC's
            two easternmost wards. Explore the similarities and differences that define
            life in these communities.
          </p>
        </div>
      </section>

      {/* Population Header */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS.ward7 }}
                />
                <h2 className="text-2xl font-bold text-ward7">Ward 7</h2>
              </div>
              <p className="text-3xl font-bold text-slate-800">
                {ward7.population.toLocaleString()}
              </p>
              <p className="text-slate-500">residents</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS.ward8 }}
                />
                <h2 className="text-2xl font-bold text-ward8">Ward 8</h2>
              </div>
              <p className="text-3xl font-bold text-slate-800">
                {ward8.population.toLocaleString()}
              </p>
              <p className="text-slate-500">residents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Comparison */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Economic Indicators</h2>
          <p className="text-slate-600 mb-6">
            DC Average Median Income: {formatCurrency(dc.medianHouseholdIncome)}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ComparisonCard
              metric="Median Household Income"
              ward7Value={ward7.medianIncome}
              ward8Value={ward8.medianIncome}
              format="currency"
              higherIsBetter={true}
              subtitle="Annual household income"
            />
            <ComparisonCard
              metric="Unemployment Rate"
              ward7Value={ward7.unemploymentRate}
              ward8Value={ward8.unemploymentRate}
              ward7Trend="down"
              ward8Trend="down"
              ward7TrendPercent={1.5}
              ward8TrendPercent={1.8}
              format="percent"
              higherIsBetter={false}
              subtitle={`DC avg: ${dc.unemploymentRate}%`}
            />
            <ComparisonCard
              metric="Poverty Rate"
              ward7Value={ward7.povertyRate}
              ward8Value={ward8.povertyRate}
              format="percent"
              higherIsBetter={false}
              subtitle={`DC avg: ${dc.povertyRate}%`}
            />
          </div>
        </div>
      </section>

      {/* Housing Comparison */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Housing</h2>
          <p className="text-slate-600 mb-6">
            DC Average Homeownership: {formatPercent(dc.homeownershipRate)}
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ComparisonCard
              metric="Homeownership Rate"
              ward7Value={ward7.homeownershipRate}
              ward8Value={ward8.homeownershipRate}
              ward7Trend="up"
              ward8Trend="up"
              ward7TrendPercent={1.2}
              ward8TrendPercent={0.8}
              format="percent"
              higherIsBetter={true}
              subtitle="Owner-occupied housing units"
            />
            <Card>
              <h3 className="font-semibold text-lg text-slate-800 mb-4">Homeownership Gap</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 7</span>
                    <span className="font-semibold text-ward7">{ward7.homeownershipRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(ward7.homeownershipRate / 50) * 100}%`,
                        backgroundColor: COLORS.ward7,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 8</span>
                    <span className="font-semibold text-ward8">{ward8.homeownershipRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(ward8.homeownershipRate / 50) * 100}%`,
                        backgroundColor: COLORS.ward8,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">DC Average</span>
                    <span className="font-semibold text-slate-500">{dc.homeownershipRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${(dc.homeownershipRate / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Comparison */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Education</h2>
          <p className="text-slate-600 mb-6">
            DC Average Bachelor's Degree Rate: {formatPercent(dc.bachelorsDegreeRate)}
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ComparisonCard
              metric="Bachelor's Degree or Higher"
              ward7Value={ward7.bachelorsDegreeRate}
              ward8Value={ward8.bachelorsDegreeRate}
              ward7Trend="up"
              ward8Trend="up"
              ward7TrendPercent={2.1}
              ward8TrendPercent={1.5}
              format="percent"
              higherIsBetter={true}
              subtitle="Population 25+"
            />
            <Card>
              <h3 className="font-semibold text-lg text-slate-800 mb-4">Education Gap Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Gap between wards</span>
                  <span className="font-bold text-slate-800">
                    {(ward7.bachelorsDegreeRate - ward8.bachelorsDegreeRate).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Ward 7 vs DC avg</span>
                  <span className={`font-bold ${ward7.bachelorsDegreeRate > dc.bachelorsDegreeRate ? 'text-green-600' : 'text-red-600'}`}>
                    {(ward7.bachelorsDegreeRate - dc.bachelorsDegreeRate).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Ward 8 vs DC avg</span>
                  <span className={`font-bold ${ward8.bachelorsDegreeRate > dc.bachelorsDegreeRate ? 'text-green-600' : 'text-red-600'}`}>
                    {(ward8.bachelorsDegreeRate - dc.bachelorsDegreeRate).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Crime Comparison */}
      {!isLoading && crimeStats && (
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Public Safety</h2>
            <p className="text-slate-600 mb-6">
              Crime data from 2020-2025
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ComparisonCard
                metric={`Crime Incidents (${crimeStats.latestYear.year})`}
                ward7Value={crimeStats.latestYear.ward7}
                ward8Value={crimeStats.latestYear.ward8}
                ward7Trend={crimeStats.trend.direction7}
                ward8Trend={crimeStats.trend.direction8}
                ward7TrendPercent={Math.abs(crimeStats.trend.ward7Percent)}
                ward8TrendPercent={Math.abs(crimeStats.trend.ward8Percent)}
                format="number"
                higherIsBetter={false}
                subtitle="Lower is better"
              />
              <ComparisonCard
                metric="5-Year Total (2020-2025)"
                ward7Value={crimeStats.totals.ward7}
                ward8Value={crimeStats.totals.ward8}
                format="number"
                higherIsBetter={false}
                subtitle="Total recorded incidents"
              />
              <Card>
                <h3 className="font-semibold text-lg text-slate-800 mb-4">Year-over-Year Trend</h3>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Ward 7</p>
                    <p className={`text-xl md:text-2xl font-bold ${crimeStats.trend.direction7 === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                      {crimeStats.trend.ward7Percent > 0 ? '+' : ''}{crimeStats.trend.ward7Percent.toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500">
                      {crimeStats.trend.direction7 === 'down' ? 'Decreasing' : 'Increasing'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">Ward 8</p>
                    <p className={`text-xl md:text-2xl font-bold ${crimeStats.trend.direction8 === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                      {crimeStats.trend.ward8Percent > 0 ? '+' : ''}{crimeStats.trend.ward8Percent.toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500">
                      {crimeStats.trend.direction8 === 'down' ? 'Decreasing' : 'Increasing'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/crime"
                className="text-red-600 hover:text-red-800 font-medium"
              >
                View Full Crime Analysis →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Food Access Comparison */}
      {!isLoading && foodStats && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Food Access</h2>
            <p className="text-slate-600 mb-6">
              SNAP-authorized retailers in Wards 7 & 8
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <h3 className="font-semibold text-slate-800 mb-3">Total SNAP Retailers</h3>
                <p className="text-4xl font-bold text-slate-800">{foodStats.totalRetailers}</p>
                <p className="text-sm text-slate-500">Active authorized retailers</p>
              </Card>
              <Card>
                <h3 className="font-semibold text-slate-800 mb-3">Supermarkets</h3>
                <p className="text-4xl font-bold text-green-600">{foodStats.supermarketCount}</p>
                <p className="text-sm text-slate-500">{foodStats.supermarketPercent.toFixed(1)}% of total retailers</p>
              </Card>
              <Card>
                <h3 className="font-semibold text-slate-800 mb-3">Convenience Stores</h3>
                <p className="text-4xl font-bold text-amber-600">{foodStats.convenienceCount}</p>
                <p className="text-sm text-slate-500">{foodStats.conveniencePercent.toFixed(1)}% of total retailers</p>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/story2"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Read Food Access Story →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Summary Section */}
      <section className="py-12 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Takeaways</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-ward7" />
                <h3 className="font-semibold text-lg">Ward 7 Advantages</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Higher median income (+{formatCurrency(ward7.medianIncome - ward8.medianIncome)})</li>
                <li>• Higher homeownership rate (+{(ward7.homeownershipRate - ward8.homeownershipRate).toFixed(1)}%)</li>
                <li>• Higher education attainment (+{(ward7.bachelorsDegreeRate - ward8.bachelorsDegreeRate).toFixed(1)}%)</li>
                <li>• Lower poverty rate ({(ward7.povertyRate - ward8.povertyRate).toFixed(1)}% less)</li>
              </ul>
            </div>

            <div className="bg-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-ward8" />
                <h3 className="font-semibold text-lg">Ward 8 Strengths</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Lower unemployment rate ({(ward7.unemploymentRate - ward8.unemploymentRate).toFixed(1)}% less)</li>
                <li>• Strong community organizations</li>
                <li>• Active civic engagement</li>
                <li>• Growing investment interest</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-8">
            Both wards face similar challenges but also demonstrate remarkable community resilience
            and potential for growth.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link
              to="/ward7"
              className="bg-ward7 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Ward 7 Details
            </Link>
            <Link
              to="/ward8"
              className="bg-ward8 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Ward 8 Details
            </Link>
            <Link
              to="/crime"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Crime Analysis
            </Link>
            <Link
              to="/explore"
              className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Explore Data
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
