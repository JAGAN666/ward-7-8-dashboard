import { Link } from 'react-router-dom';
import { useWardPageData } from '../hooks/useData';
import { Card, StatCard } from '../components/common/Card';
import { BOTGChart, CompactBOTG } from '../components/charts/BOTGChart';
import { LineChart } from '../components/charts/LineChart';
import { DC_AVERAGES, extractWardStats } from '../data/dcAverages';
import { formatCurrency, formatPercent } from '../utils/formatters';

export function Ward7() {
  const {
    wardData,
    educationBreakdown,
    crimeStats,
    yearlyChartData,
    foodStats,
    historicalData,
    isLoading,
    derivedMetrics,
    getBOTGData,
    getDerivedBOTGData,
  } = useWardPageData(7);

  if (isLoading || !wardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ward7 mx-auto mb-4" />
          <p className="text-slate-600">Loading Ward 7 data...</p>
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

  // Get latest year from historical data
  const latestYear = historicalData?.DP03_0062E?.data?.[0]?.year || 2022;

  // Get BOTG data for various metrics
  const medianIncomeBOTG = getBOTGData('DP03_0062E');
  const unemploymentBOTG = getBOTGData('DP03_0009PE');
  const povertyBOTG = getBOTGData('DP03_0128PE');
  const homeownershipBOTG = getBOTGData('DP04_0046E');

  // Get derived BOTG data for calculated rates
  const rentBurdenedBOTG = getDerivedBOTGData('DP04_0142E', 'DP04_0136E');
  const occupancyRateBOTG = getDerivedBOTGData('DP04_0002E', 'DP04_0001E');

  // Calculate crime per 100,000
  const population = derivedMetrics.population || ward7.population;

  // Calculate per 100,000 for crime
  const crimePer100K = crimeStats && population
    ? (crimeStats.latestYear.ward7 / population) * 100000
    : null;

  // Calculate per 100,000 for food access
  const supermarketCount = foodStats?.supermarketCount || 0;
  const convenienceCount = foodStats?.convenienceCount || 0;
  const supermarketPer100K = population ? (supermarketCount / population) * 100000 : 0;
  const conveniencePer100K = population ? (convenienceCount / population) * 100000 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-blue-300 hover:text-blue-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Ward 7 In Depth
              </h1>
              <p className="text-xl text-blue-200">
                Population: {ward7.population.toLocaleString()} residents
              </p>
            </div>
            <Link
              to="/ward8"
              className="bg-ward8 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Compare to Ward 8 →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Comparison Header */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ward7" />
              Ward 7 (Primary)
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              DC Average (Comparison)
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: Economic */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Economic</h2>

          {/* BOTG Charts */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <CompactBOTG
              data={medianIncomeBOTG}
              ward={7}
              label="Median Household Income"
              currentValue={ward7.medianIncome}
              dcValue={dc.medianHouseholdIncome}
              format="currency"
            />
            <CompactBOTG
              data={unemploymentBOTG}
              ward={7}
              label="Unemployment Rate"
              currentValue={ward7.unemploymentRate}
              dcValue={dc.unemploymentRate}
              format="percent"
            />
            <CompactBOTG
              data={povertyBOTG}
              ward={7}
              label="Poverty Rate"
              currentValue={ward7.povertyRate}
              dcValue={dc.povertyRate}
              format="percent"
            />
          </div>

          {/* Detailed BOTG Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <BOTGChart
              data={medianIncomeBOTG}
              ward={7}
              format="currency"
              title="Median Household Income Over Time"
              unit="Dollars"
            />
            <BOTGChart
              data={povertyBOTG}
              ward={7}
              format="percent"
              title="Poverty Rate Over Time"
              unit="Percentage"
            />
          </div>

          <Card title={`Economic Metrics Snapshot: ${latestYear}`}>
            <p className="text-sm text-slate-500 mb-4">Ward 7 vs DC Average</p>
            <div className="divide-y">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-600">Median Household Income</span>
                <div className="flex gap-8">
                  <span className="text-sm font-semibold text-ward7">{formatCurrency(ward7.medianIncome)}</span>
                  <span className="text-sm text-slate-500">DC: {formatCurrency(dc.medianHouseholdIncome)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-600">Unemployment Rate</span>
                <div className="flex gap-8">
                  <span className="text-sm font-semibold text-ward7">{formatPercent(ward7.unemploymentRate)}</span>
                  <span className="text-sm text-slate-500">DC: {formatPercent(dc.unemploymentRate)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-600">Poverty Rate</span>
                <div className="flex gap-8">
                  <span className="text-sm font-semibold text-ward7">{formatPercent(ward7.povertyRate)}</span>
                  <span className="text-sm text-slate-500">DC: {formatPercent(dc.povertyRate)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 2: Housing */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Housing</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <CompactBOTG
              data={homeownershipBOTG}
              ward={7}
              label="Homeownership Rate"
              currentValue={derivedMetrics.homeownershipRate}
              dcValue={derivedMetrics.dcHomeownershipRate || dc.homeownershipRate}
              format="percent"
            />
            <CompactBOTG
              data={rentBurdenedBOTG}
              ward={7}
              label="Rent Burdened (35%+ of Income)"
              currentValue={derivedMetrics.rentBurdenedRate}
              dcValue={derivedMetrics.dcRentBurdenedRate}
              format="percent"
            />
            <CompactBOTG
              data={occupancyRateBOTG}
              ward={7}
              label="Occupancy Rate"
              currentValue={derivedMetrics.occupancyRate}
              dcValue={derivedMetrics.dcOccupancyRate}
              format="percent"
            />
          </div>

          <BOTGChart
            data={homeownershipBOTG}
            ward={7}
            format="number"
            title="Owner-Occupied Units Over Time"
            unit="Number of Units"
            height={280}
          />

          <Card title="Homeownership Map" subtitle="DC Homeownership rates by census tract">
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.arcgis.com/apps/mapviewer/index.html?webmap=41672388842b425eb3aeff5a41b62cc3"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="DC Homeownership Map"
                className="border-0"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              <a
                href="https://www.arcgis.com/apps/mapviewer/index.html?webmap=41672388842b425eb3aeff5a41b62cc3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ward7 hover:text-blue-800"
              >
                Open full map in new tab →
              </a>
            </p>
          </Card>
        </div>
      </section>

      {/* Section 3: Education */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Education</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Early Childhood Education (Under 5)</p>
              <p className="text-2xl font-bold text-ward7">
                {derivedMetrics.earlyChildhoodRate ? `${derivedMetrics.earlyChildhoodRate.toFixed(1)}%` : 'N/A'}
              </p>
              {derivedMetrics.dcEarlyChildhoodRate && (
                <p className="text-sm text-slate-500 mt-1">
                  DC Avg: {derivedMetrics.dcEarlyChildhoodRate.toFixed(1)}%
                </p>
              )}
              <p className="text-xs text-slate-400 mt-2">Nursery + Kindergarten / Under 5 Population</p>
            </div>
            <CompactBOTG
              data={getBOTGData('DP02_0067PE')}
              ward={7}
              label="High School Graduate or Higher"
              currentValue={historicalData?.DP02_0067PE?.data?.[0]?.ward7 ?? null}
              dcValue={historicalData?.DP02_0067PE?.data?.[0]?.dc ?? dc.highSchoolGradRate}
              format="percent"
            />
            <CompactBOTG
              data={getBOTGData('DP02_0068PE')}
              ward={7}
              label="Bachelor's Degree or Higher"
              currentValue={ward7.bachelorsDegreeRate}
              dcValue={dc.bachelorsDegreeRate}
              format="percent"
            />
          </div>

          {educationBreakdown && educationBreakdown.length >= 2 && (
            <Card title={`Educational Attainment Breakdown (Age 25 or Older): ${latestYear}`}>
              <p className="text-sm text-slate-500 mb-4">Ward 7 vs DC Average</p>
              <div className="divide-y">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Less than High School</span>
                  <div className="flex gap-8">
                    <span className="text-sm font-semibold text-ward7">
                      {(educationBreakdown.find(e => e.ward === 7)?.lessHighSchool || 0).toFixed(1)}%
                    </span>
                    <span className="text-sm text-slate-500">DC: ~{(100 - dc.highSchoolGradRate).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">High School Graduate</span>
                  <span className="text-sm font-semibold text-ward7">
                    {(educationBreakdown.find(e => e.ward === 7)?.highSchool || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Some College</span>
                  <span className="text-sm font-semibold text-ward7">
                    {(educationBreakdown.find(e => e.ward === 7)?.someCollege || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Associate's Degree</span>
                  <span className="text-sm font-semibold text-ward7">
                    {(educationBreakdown.find(e => e.ward === 7)?.associates || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Bachelor's Degree</span>
                  <span className="text-sm font-semibold text-ward7">
                    {(educationBreakdown.find(e => e.ward === 7)?.bachelors || 0).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Graduate Degree</span>
                  <span className="text-sm font-semibold text-ward7">
                    {(educationBreakdown.find(e => e.ward === 7)?.graduate || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Section 4: Public Safety */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Public Safety</h2>

          {crimeStats && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <StatCard
                label={`Total Crimes (${crimeStats.latestYear.year})`}
                value={crimeStats.latestYear.ward7.toLocaleString()}
                subValue={crimePer100K ? `${crimePer100K.toFixed(0)} per 100,000 residents` : ''}
                color="blue"
              />
              <StatCard
                label="5-Year Total"
                value={crimeStats.totals.ward7.toLocaleString()}
                subValue="Total incidents (2020-2025)"
                color="gray"
              />
            </div>
          )}

          {yearlyChartData && population && (
            <Card title="Crime Trends (2020-2025)" subtitle="Crime incidents per 100,000 residents - Ward 7">
              <LineChart
                data={yearlyChartData.map(d => ({
                  ...d,
                  ward7: Math.round((d.ward7 / population) * 100000),
                  ward8: 0, // Hide Ward 8 on Ward 7 page
                  dcAverage: undefined,
                }))}
                format="number"
                height={300}
              />
              <p className="text-xs text-slate-500 mt-2 text-center">
                Note: Crime data normalized to per 100,000 residents based on current population ({population.toLocaleString()}).
              </p>
            </Card>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/crime"
              className="text-ward7 hover:text-blue-800 font-medium"
            >
              View Full Crime Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Food Access */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Food Access</h2>

          {foodStats && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                label="SNAP Retailers"
                value={foodStats.totalRetailers}
                subValue="Authorized retailers"
                color="blue"
              />
              <StatCard
                label="Supermarkets"
                value={foodStats.supermarketCount}
                subValue={`${supermarketPer100K.toFixed(1)} per 100,000 people`}
                color="green"
              />
              <StatCard
                label="Convenience Stores"
                value={foodStats.convenienceCount}
                subValue={`${conveniencePer100K.toFixed(1)} per 100,000 people`}
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
              className="text-ward7 hover:text-blue-800 font-medium"
            >
              Read Food Access Story →
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/compare"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            ← Full Comparison
          </Link>
          <Link
            to="/ward8"
            className="bg-ward8 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            View Ward 8 →
          </Link>
        </div>
      </section>
    </div>
  );
}
