import { Link } from 'react-router-dom';
import { useCrimeAnalysis, useCrimeData } from '../hooks/useData';
import { Card, StatCard, InsightCard } from '../components/common/Card';
import { ComparisonCard } from '../components/common/ComparisonCard';
import { GroupedBarChart } from '../components/charts/GroupedBarChart';
import { LineChart } from '../components/charts/LineChart';
import { formatNumber } from '../utils/formatters';

export function CrimeAnalysis() {
  const {
    stats,
    offenseChartData,
    shiftChartData,
    methodChartData,
    yearlyChartData,
    isLoading,
  } = useCrimeAnalysis();

  // Get raw crime data for the map (limited to recent data for performance)
  const { data: crimeData } = useCrimeData();
  const recentCrimeData = crimeData?.slice(0, 2000) || []; // Limit for embedded map performance

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading crime data...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">No crime data available</p>
      </div>
    );
  }

  const { trend, latestYear, totals } = stats;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-slate-800 to-orange-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-red-300 hover:text-red-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crime Analysis
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Five years of crime data (2020-2025) reveal patterns and trends in public safety
            across Ward 7 and Ward 8. Understanding these patterns is crucial for community
            safety initiatives and policy decisions.
          </p>
        </div>
      </section>

      {/* Headline Stats */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-8 text-center shadow-xl">
            <p className="text-lg opacity-90 mb-2">Total Incidents Recorded (2020-2025)</p>
            <p className="text-5xl md:text-6xl font-bold mb-2">
              {formatNumber(totals.all)}
            </p>
            <p className="text-lg opacity-90">
              Ward 7: {formatNumber(totals.ward7)} | Ward 8: {formatNumber(totals.ward8)}
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              label={`Ward 7 (${latestYear.year})`}
              value={formatNumber(latestYear.ward7)}
              subValue={`${trend.ward7Percent > 0 ? '+' : ''}${trend.ward7Percent.toFixed(1)}% YoY`}
              trend={trend.direction7 === 'up' ? 'up' : trend.direction7 === 'down' ? 'down' : undefined}
              trendLabel={trend.direction7 === 'down' ? 'Decreasing' : 'Increasing'}
              color="blue"
            />
            <StatCard
              label={`Ward 8 (${latestYear.year})`}
              value={formatNumber(latestYear.ward8)}
              subValue={`${trend.ward8Percent > 0 ? '+' : ''}${trend.ward8Percent.toFixed(1)}% YoY`}
              trend={trend.direction8 === 'up' ? 'up' : trend.direction8 === 'down' ? 'down' : undefined}
              trendLabel={trend.direction8 === 'down' ? 'Decreasing' : 'Increasing'}
              color="purple"
            />
            <StatCard
              label="5-Year Ward 7"
              value={formatNumber(totals.ward7)}
              subValue="Total incidents"
              color="blue"
            />
            <StatCard
              label="5-Year Ward 8"
              value={formatNumber(totals.ward8)}
              subValue="Total incidents"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Crime Trends Over Time */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Crime Trends Over Time
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            A five-year view of crime incidents in Ward 7 and Ward 8 shows how public safety
            conditions have evolved. Track year-over-year changes to understand long-term patterns.
          </p>

          {yearlyChartData && (
            <Card
              title="Total Crime Incidents by Year"
              subtitle="Ward 7 vs Ward 8 comparison (2020-2025)"
            >
              <LineChart
                data={yearlyChartData}
                format="number"
                height={350}
              />
            </Card>
          )}

          <div className="mt-8">
            <InsightCard
              variant={trend.direction7 === 'down' && trend.direction8 === 'down' ? 'success' : 'info'}
              title="Year-over-Year Trend"
              insight={`Compared to the previous year, Ward 7 crime ${trend.direction7 === 'down' ? 'decreased' : trend.direction7 === 'up' ? 'increased' : 'remained stable'} by ${Math.abs(trend.ward7Percent).toFixed(1)}% (${Math.abs(trend.ward7Change).toLocaleString()} incidents), while Ward 8 ${trend.direction8 === 'down' ? 'decreased' : trend.direction8 === 'up' ? 'increased' : 'remained stable'} by ${Math.abs(trend.ward8Percent).toFixed(1)}% (${Math.abs(trend.ward8Change).toLocaleString()} incidents).`}
            />
          </div>
        </div>
      </section>

      {/* Crime Types */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Types of Crime
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Understanding which types of crimes are most common helps communities and
            policymakers focus resources where they're needed most.
          </p>

          {offenseChartData && (
            <Card
              title="Crime by Offense Type"
              subtitle="Top offenses in Ward 7 and Ward 8"
            >
              <GroupedBarChart
                data={offenseChartData}
                format="number"
                height={400}
                showDCAverage={false}
              />
            </Card>
          )}
        </div>
      </section>

      {/* Time of Day Analysis */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            When Crimes Occur
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Crime patterns vary by time of day. Understanding these patterns can help with
            community safety planning and resource allocation.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {shiftChartData && (
              <Card
                title="Crime by Time of Day"
                subtitle="Day, Evening, and Midnight shifts"
              >
                <GroupedBarChart
                  data={shiftChartData}
                  format="number"
                  height={300}
                  showDCAverage={false}
                />
              </Card>
            )}

            {methodChartData && (
              <Card
                title="Crime by Method"
                subtitle="How crimes are committed"
              >
                <GroupedBarChart
                  data={methodChartData}
                  format="number"
                  height={300}
                  showDCAverage={false}
                />
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Ward Comparison Cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Ward-by-Ward Comparison
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Direct comparison of crime statistics between Ward 7 and Ward 8 reveals
            important differences in public safety conditions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ComparisonCard
              metric={`Total Crimes (${latestYear.year})`}
              ward7Value={latestYear.ward7}
              ward8Value={latestYear.ward8}
              ward7Trend={trend.direction7}
              ward8Trend={trend.direction8}
              ward7TrendPercent={Math.abs(trend.ward7Percent)}
              ward8TrendPercent={Math.abs(trend.ward8Percent)}
              format="number"
              higherIsBetter={false}
              subtitle="Lower is better"
            />

            <ComparisonCard
              metric="5-Year Total"
              ward7Value={totals.ward7}
              ward8Value={totals.ward8}
              format="number"
              higherIsBetter={false}
              subtitle="Total incidents 2020-2025"
            />

            {stats.byOffense[0] && (
              <ComparisonCard
                metric={`Top Crime: ${stats.byOffense[0].offense}`}
                ward7Value={stats.byOffense[0].ward7}
                ward8Value={stats.byOffense[0].ward8}
                format="number"
                higherIsBetter={false}
                subtitle="Most common offense"
              />
            )}
          </div>
        </div>
      </section>

      {/* Crime Map */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Crime Location Map
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Visualize the geographic distribution of crime incidents across Ward 7 and Ward 8.
            Clusters indicate areas with higher incident concentrations.
          </p>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">Crime Incident Locations</h3>
              <p className="text-xs text-slate-500">
                Showing {recentCrimeData.length.toLocaleString()} recent incidents (click clusters to expand)
              </p>
            </div>
            {/* <EmbeddedMap
              variant="crime"
              crimeData={recentCrimeData}
              height="500px"
              showFullMapLink={true}
              showLegend={true}
            /> */}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-12 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Understanding the Data</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Crime statistics tell only part of the story. Many factors influence crime rates,
            including economic conditions, policing practices, and reporting patterns. While
            Ward 8 consistently shows higher crime numbers, this data should be understood
            alongside the economic and social factors explored elsewhere in this dashboard.
          </p>
          <div className="bg-slate-700 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-3 text-red-300">
              Data Source
            </h3>
            <p className="text-slate-300">
              Crime incident data is sourced from DC Open Data's Crime Incidents dataset,
              which includes all reported crimes in the District of Columbia. Data is filtered
              to show only Ward 7 and Ward 8 incidents from 2020-2025.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/story2"
            className="bg-ward8 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            ← Food Access Story
          </Link>
          <Link
            to="/compare"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            Compare Wards →
          </Link>
        </div>
      </section>
    </div>
  );
}
