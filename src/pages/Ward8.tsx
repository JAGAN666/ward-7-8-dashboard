import { Link } from 'react-router-dom';
import { useWardComparisonData, useCrimeAnalysis, useFoodAccessAnalysis } from '../hooks/useData';
import { Card, StatCard } from '../components/common/Card';
import { SparklineCard } from '../components/common/SparklineCard';
import { CompactComparison } from '../components/common/ComparisonCard';
import { LineChart } from '../components/charts/LineChart';
import { DC_AVERAGES, extractWardStats } from '../data/dcAverages';
import { formatCurrency, formatPercent } from '../utils/formatters';

export function Ward8() {
  const { data: wardData, educationBreakdown, isLoading: loadingWard } = useWardComparisonData();
  const { stats: crimeStats, yearlyChartData, sparklines, isLoading: loadingCrime } = useCrimeAnalysis();
  const { stats: foodStats, isLoading: loadingFood } = useFoodAccessAnalysis();

  const isLoading = loadingWard || loadingCrime || loadingFood;

  if (isLoading || !wardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ward8 mx-auto mb-4" />
          <p className="text-slate-600">Loading Ward 8 data...</p>
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
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-purple-300 hover:text-purple-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Ward 8 In Depth
              </h1>
              <p className="text-xl text-purple-200">
                Population: {ward8.population.toLocaleString()} residents
              </p>
            </div>
            <Link
              to="/ward7"
              className="bg-ward7 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Compare to Ward 7 →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Comparison Header */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ward8" />
              Ward 8 (Primary)
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ward7" />
              Ward 7 (Comparison)
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              DC Average
            </span>
          </div>
        </div>
      </section>

      {/* Economic Health Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Economic Health</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <SparklineCard
              label="Median Household Income"
              value={ward8.medianIncome}
              format="currency"
              trend="up"
              trendPercent={2.8}
              trendIsGood={true}
              color="ward8"
              compareValue={ward7.medianIncome}
              compareLabel="Ward 7"
            />
            <SparklineCard
              label="Unemployment Rate"
              value={ward8.unemploymentRate}
              format="percent"
              trend="down"
              trendPercent={1.8}
              trendIsGood={true}
              color="ward8"
              compareValue={ward7.unemploymentRate}
              compareLabel="Ward 7"
            />
            <SparklineCard
              label="Poverty Rate"
              value={ward8.povertyRate}
              format="percent"
              trend="down"
              trendPercent={0.5}
              trendIsGood={true}
              color="ward8"
              compareValue={ward7.povertyRate}
              compareLabel="Ward 7"
            />
          </div>

          <Card title="Economic Metrics Comparison">
            <div className="divide-y">
              <CompactComparison
                metric="Median Income"
                ward7Value={ward7.medianIncome}
                ward8Value={ward8.medianIncome}
                format="currency"
                higherIsBetter={true}
              />
              <CompactComparison
                metric="Unemployment Rate"
                ward7Value={ward7.unemploymentRate}
                ward8Value={ward8.unemploymentRate}
                format="percent"
                higherIsBetter={false}
              />
              <CompactComparison
                metric="Poverty Rate"
                ward7Value={ward7.povertyRate}
                ward8Value={ward8.povertyRate}
                format="percent"
                higherIsBetter={false}
              />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">DC Average Income</span>
                <span className="text-sm font-semibold text-slate-500">
                  {formatCurrency(dc.medianHouseholdIncome)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Housing Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Housing & Stability</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <SparklineCard
              label="Homeownership Rate"
              value={ward8.homeownershipRate}
              format="percent"
              trend="up"
              trendPercent={0.8}
              trendIsGood={true}
              color="ward8"
              compareValue={ward7.homeownershipRate}
              compareLabel="Ward 7"
            />
            <StatCard
              label="vs Ward 7"
              value={`${(ward8.homeownershipRate - ward7.homeownershipRate).toFixed(1)}%`}
              subValue="Lower homeownership"
              trend="down"
              trendLabel="Significant gap"
              color="purple"
            />
            <StatCard
              label="vs DC Average"
              value={`${(ward8.homeownershipRate - dc.homeownershipRate).toFixed(1)}%`}
              subValue={ward8.homeownershipRate > dc.homeownershipRate ? 'Above DC avg' : 'Below DC avg'}
              trend={ward8.homeownershipRate > dc.homeownershipRate ? 'up' : 'down'}
              color="gray"
            />
          </div>

          <Card>
            <div className="text-center py-6">
              <p className="text-4xl font-bold text-ward8 mb-2">
                {formatPercent(ward8.homeownershipRate)}
              </p>
              <p className="text-slate-600">
                of Ward 8 households own their home, compared to {formatPercent(ward7.homeownershipRate)} in Ward 7
              </p>
              <p className="text-sm text-slate-500 mt-2">
                DC Average: {formatPercent(dc.homeownershipRate)}
              </p>
            </div>
          </Card>

          <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">Housing Challenge</h3>
            <p className="text-amber-900">
              Ward 8 has the lowest homeownership rate in the city at {formatPercent(ward8.homeownershipRate)},
              which is {(ward7.homeownershipRate - ward8.homeownershipRate).toFixed(1)} percentage points
              lower than Ward 7 and {(dc.homeownershipRate - ward8.homeownershipRate).toFixed(1)} points
              below the DC average. This gap has significant implications for wealth building and
              neighborhood stability.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Education</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <SparklineCard
              label="Bachelor's Degree or Higher"
              value={ward8.bachelorsDegreeRate}
              format="percent"
              trend="up"
              trendPercent={1.5}
              trendIsGood={true}
              color="ward8"
              compareValue={ward7.bachelorsDegreeRate}
              compareLabel="Ward 7"
            />
            <StatCard
              label="Education Gap"
              value={`${(ward8.bachelorsDegreeRate - ward7.bachelorsDegreeRate).toFixed(1)}%`}
              subValue="vs Ward 7"
              trend="down"
              color="purple"
            />
            <StatCard
              label="vs DC Average"
              value={`${(ward8.bachelorsDegreeRate - dc.bachelorsDegreeRate).toFixed(1)}%`}
              subValue={`DC avg: ${dc.bachelorsDegreeRate}%`}
              trend="down"
              trendLabel="Below average"
              color="gray"
            />
          </div>

          {educationBreakdown && educationBreakdown.length >= 2 && (
            <Card title="Educational Attainment Comparison">
              <div className="divide-y">
                <CompactComparison
                  metric="Less than High School"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.lessHighSchool || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.lessHighSchool || 0}
                  format="percent"
                  higherIsBetter={false}
                />
                <CompactComparison
                  metric="High School Graduate"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.highSchool || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.highSchool || 0}
                  format="percent"
                  higherIsBetter={true}
                />
                <CompactComparison
                  metric="Some College"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.someCollege || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.someCollege || 0}
                  format="percent"
                  higherIsBetter={true}
                />
                <CompactComparison
                  metric="Associate's Degree"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.associates || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.associates || 0}
                  format="percent"
                  higherIsBetter={true}
                />
                <CompactComparison
                  metric="Bachelor's Degree"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.bachelors || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.bachelors || 0}
                  format="percent"
                  higherIsBetter={true}
                />
                <CompactComparison
                  metric="Graduate Degree"
                  ward7Value={educationBreakdown.find(e => e.ward === 7)?.graduate || 0}
                  ward8Value={educationBreakdown.find(e => e.ward === 8)?.graduate || 0}
                  format="percent"
                  higherIsBetter={true}
                />
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Crime Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Public Safety (5-Year Trend)</h2>

          {crimeStats && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <SparklineCard
                label={`Total Crimes (${crimeStats.latestYear.year})`}
                value={crimeStats.latestYear.ward8}
                format="number"
                trend={crimeStats.trend.direction8}
                trendPercent={Math.abs(crimeStats.trend.ward8Percent)}
                trendIsGood={crimeStats.trend.direction8 === 'down'}
                sparklineData={sparklines?.ward8}
                color="ward8"
                compareValue={crimeStats.latestYear.ward7}
                compareLabel="Ward 7"
              />
              <StatCard
                label="5-Year Total"
                value={crimeStats.totals.ward8.toLocaleString()}
                subValue="Total incidents (2020-2025)"
                color="purple"
              />
              <StatCard
                label="Year-over-Year Change"
                value={`${crimeStats.trend.ward8Percent > 0 ? '+' : ''}${crimeStats.trend.ward8Percent.toFixed(1)}%`}
                subValue={`${Math.abs(crimeStats.trend.ward8Change).toLocaleString()} incidents`}
                trend={crimeStats.trend.direction8 === 'down' ? 'down' : 'up'}
                trendLabel={crimeStats.trend.direction8 === 'down' ? 'Decreasing' : 'Increasing'}
                color={crimeStats.trend.direction8 === 'down' ? 'green' : 'red'}
              />
            </div>
          )}

          {yearlyChartData && (
            <Card title="Crime Trends (2020-2025)" subtitle="Ward 7 vs Ward 8 comparison">
              <LineChart data={yearlyChartData} format="number" height={300} />
            </Card>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/crime"
              className="text-ward8 hover:text-purple-800 font-medium"
            >
              View Full Crime Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* Food Access Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Food Access</h2>

          {foodStats && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard
                label="SNAP Retailers"
                value={foodStats.totalRetailers}
                subValue="Authorized retailers"
                color="purple"
              />
              <StatCard
                label="Supermarkets"
                value={foodStats.supermarketCount}
                subValue={`${foodStats.supermarketPercent.toFixed(1)}% of total`}
                trend="down"
                trendLabel="Limited access"
                color="green"
              />
              <StatCard
                label="Convenience Stores"
                value={foodStats.convenienceCount}
                subValue={`${foodStats.conveniencePercent.toFixed(1)}% of total`}
                color="red"
              />
              <StatCard
                label="Supermarket Ratio"
                value={`${(foodStats.convenienceCount / foodStats.supermarketCount).toFixed(0)}:1`}
                subValue="Convenience to supermarket"
                color="gray"
              />
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/story2"
              className="text-ward8 hover:text-purple-800 font-medium"
            >
              Read Food Access Story →
            </Link>
          </div>
        </div>
      </section>

      {/* Resilience Note */}
      <section className="py-12 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Community Resilience</h2>
          <p className="text-slate-300 leading-relaxed">
            Despite facing significant economic and social challenges, Ward 8 communities demonstrate
            remarkable resilience. Local organizations, grassroots initiatives, and dedicated residents
            continue to work toward positive change, advocating for investment, opportunity, and equity.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/ward7"
            className="bg-ward7 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            ← View Ward 7
          </Link>
          <Link
            to="/compare"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            Full Comparison →
          </Link>
        </div>
      </section>
    </div>
  );
}
