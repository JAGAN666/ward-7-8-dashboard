import { Link } from 'react-router-dom';
import { useWardComparisonData } from '../hooks/useData';
import { Card, StatCard, InsightCard } from '../components/common/Card';
import { GroupedBarChart } from '../components/charts/GroupedBarChart';
import { EducationStackedChart } from '../components/charts/StackedBarChart';
import { KEY_GAPS, WARD_DATA, DC_AVERAGES } from '../data/dcAverages';
import { formatCurrency, formatPercent } from '../utils/formatters';

export function Story1() {
  const { charts, educationBreakdown, isLoading } = useWardComparisonData();

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-800 to-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-blue-300 hover:text-blue-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Same City, Different Lives
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            The Geography of Inequality: Ward 7 and Ward 8 have nearly identical
            populations, yet geography continues to shape vastly different opportunities
            within the same city.
          </p>
        </div>
      </section>

      {/* Headline Stat */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-ward7 to-ward8 text-white rounded-2xl p-8 text-center shadow-xl">
            <p className="text-lg opacity-90 mb-2">The Income Gap</p>
            <p className="text-5xl md:text-6xl font-bold mb-2">
              {formatCurrency(KEY_GAPS.incomeGap)}
            </p>
            <p className="text-lg opacity-90">
              difference in median household income between Ward 7 and Ward 8
            </p>
          </div>
        </div>
      </section>

      {/* Population Parity */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              label="Ward 7 Population"
              value={WARD_DATA.ward7.population.toLocaleString()}
              color="blue"
            />
            <StatCard
              label="Ward 8 Population"
              value={WARD_DATA.ward8.population.toLocaleString()}
              color="purple"
            />
            <StatCard
              label="Population Difference"
              value="< 0.5%"
              subValue="Nearly identical"
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Economic Divide */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            The Economic Divide
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Despite similar populations, Ward 7 and Ward 8 show significant economic
            disparities when compared to each other and to DC as a whole. These gaps
            reflect decades of historical disinvestment and structural barriers.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard
              label="Ward 7 Median Income"
              value={formatCurrency(WARD_DATA.ward7.medianIncome)}
              subValue={`${formatPercent(((WARD_DATA.ward7.medianIncome - DC_AVERAGES.medianHouseholdIncome) / DC_AVERAGES.medianHouseholdIncome) * 100)} vs DC avg`}
              trend="down"
              trendLabel="Below DC average"
              color="blue"
            />
            <StatCard
              label="Ward 8 Median Income"
              value={formatCurrency(WARD_DATA.ward8.medianIncome)}
              subValue={`${formatPercent(((WARD_DATA.ward8.medianIncome - DC_AVERAGES.medianHouseholdIncome) / DC_AVERAGES.medianHouseholdIncome) * 100)} vs DC avg`}
              trend="down"
              trendLabel="Below DC average"
              color="purple"
            />
            <StatCard
              label="DC Average Income"
              value={formatCurrency(DC_AVERAGES.medianHouseholdIncome)}
              subValue="Citywide median"
              color="gray"
            />
          </div>

          {charts && (
            <Card title="Median Household Income Comparison" subtitle="Ward 7 vs Ward 8 vs DC Average">
              <GroupedBarChart
                data={charts.income}
                format="currency"
                height={350}
              />
            </Card>
          )}
        </div>
      </section>

      {/* Section 2: Housing and Stability */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Housing and Stability
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Homeownership is a key indicator of economic stability and wealth building.
            The stark difference in homeownership rates between Ward 7 and Ward 8 reveals
            deeper structural inequities in access to housing.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard
              label="Ward 7 Homeownership"
              value={`${WARD_DATA.ward7.homeownershipRate}%`}
              subValue="Owner-occupied units"
              color="blue"
            />
            <StatCard
              label="Ward 8 Homeownership"
              value={`${WARD_DATA.ward8.homeownershipRate}%`}
              subValue="Owner-occupied units"
              trend="down"
              trendLabel={`${KEY_GAPS.homeownershipGap.toFixed(1)}% gap`}
              color="purple"
            />
            <StatCard
              label="DC Average"
              value={`${DC_AVERAGES.homeownershipRate}%`}
              subValue="Citywide average"
              color="gray"
            />
          </div>

          {charts && (
            <Card title="Homeownership Rate Comparison" subtitle="Percentage of owner-occupied housing units">
              <GroupedBarChart
                data={charts.housing}
                format="percent"
                height={350}
              />
            </Card>
          )}

          <div className="mt-8">
            <InsightCard
              variant="warning"
              title="The Homeownership Gap"
              insight={`Ward 8's homeownership rate of ${WARD_DATA.ward8.homeownershipRate}% is less than half of Ward 7's ${WARD_DATA.ward7.homeownershipRate}%, and significantly below the DC average of ${DC_AVERAGES.homeownershipRate}%. This disparity affects wealth accumulation, neighborhood stability, and generational opportunity.`}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Education and Opportunity */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Education and Opportunity
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Educational attainment is strongly correlated with economic opportunity.
            The differences in degree completion between wards—and compared to DC
            overall—highlight barriers to educational access and achievement.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard
              label="Ward 7 Bachelor's+"
              value={`${WARD_DATA.ward7.bachelorsDegreeRate}%`}
              subValue="Bachelor's degree or higher"
              color="blue"
            />
            <StatCard
              label="Ward 8 Bachelor's+"
              value={`${WARD_DATA.ward8.bachelorsDegreeRate}%`}
              subValue="Bachelor's degree or higher"
              trend="down"
              trendLabel={`${KEY_GAPS.educationGap.toFixed(1)}% gap`}
              color="purple"
            />
            <StatCard
              label="DC Average"
              value={`${DC_AVERAGES.bachelorsDegreeRate}%`}
              subValue="Citywide average"
              color="gray"
            />
          </div>

          {charts && (
            <Card
              title="Bachelor's Degree or Higher"
              subtitle="Percentage of population 25+ with bachelor's degree or higher"
            >
              <GroupedBarChart
                data={charts.education}
                format="percent"
                height={350}
              />
            </Card>
          )}

          {educationBreakdown && (
            <div className="mt-8">
              <Card
                title="Educational Attainment Breakdown"
                subtitle="Distribution of educational levels for population 25+"
              >
                <EducationStackedChart data={educationBreakdown} height={250} />
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Employment and Poverty */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Employment and Poverty
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Unemployment and poverty rates reveal the economic challenges facing
            residents of both wards, with rates significantly higher than the DC average.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <Card>
              <h3 className="font-semibold text-lg mb-4">Unemployment Rate</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 7</span>
                    <span className="font-semibold text-ward7">{WARD_DATA.ward7.unemploymentRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ward7 rounded-full"
                      style={{ width: `${(WARD_DATA.ward7.unemploymentRate / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 8</span>
                    <span className="font-semibold text-ward8">{WARD_DATA.ward8.unemploymentRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ward8 rounded-full"
                      style={{ width: `${(WARD_DATA.ward8.unemploymentRate / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">DC Average</span>
                    <span className="font-semibold text-slate-500">{DC_AVERAGES.unemploymentRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${(DC_AVERAGES.unemploymentRate / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-4">Poverty Rate</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 7</span>
                    <span className="font-semibold text-ward7">{WARD_DATA.ward7.povertyRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ward7 rounded-full"
                      style={{ width: `${(WARD_DATA.ward7.povertyRate / 35) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Ward 8</span>
                    <span className="font-semibold text-ward8">{WARD_DATA.ward8.povertyRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ward8 rounded-full"
                      style={{ width: `${(WARD_DATA.ward8.povertyRate / 35) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">DC Average</span>
                    <span className="font-semibold text-slate-500">{DC_AVERAGES.povertyRate}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${(DC_AVERAGES.povertyRate / 35) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {charts && (
            <Card
              title="Employment and Poverty Rate Comparison"
              subtitle="Unemployment and poverty rates by ward vs DC average"
            >
              <GroupedBarChart
                data={charts.employment}
                format="percent"
                height={350}
              />
            </Card>
          )}
        </div>
      </section>

      {/* Closing Insight */}
      <section className="py-12 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Connecting Inequality to Opportunity</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            The data tells a clear story: despite nearly identical populations, Ward 7
            and Ward 8 residents face dramatically different economic realities. These
            disparities in income, homeownership, and education are not accidents—they
            are the result of decades of policy decisions and structural barriers that
            continue to shape opportunity in our city.
          </p>
          <div className="bg-slate-700 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-3 text-blue-300">
              Resilience Spotlight: Local Initiatives
            </h3>
            <p className="text-slate-300">
              Despite these challenges, Ward 7 and 8 communities have shown remarkable
              resilience through local workforce development programs, housing initiatives,
              and community organizations working to bridge the opportunity gap.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-ward7 hover:underline font-medium">
            ← Back to Home
          </Link>
          <Link
            to="/story2"
            className="bg-ward8 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Next: Hunger by Design →
          </Link>
        </div>
      </section>
    </div>
  );
}
