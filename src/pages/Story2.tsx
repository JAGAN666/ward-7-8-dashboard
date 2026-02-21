import { Link } from 'react-router-dom';
import { useFoodAccessAnalysis } from '../hooks/useData';
import { Card, StatCard, InsightCard } from '../components/common/Card';
import { HorizontalBarChart } from '../components/charts/GroupedBarChart';
import { StoreTypeStackedChart } from '../components/charts/StackedBarChart';
import { StoreTypePieChart } from '../components/charts/PieChart';
import { getZipCodeChartData } from '../data/transformers/snapTransformer';
import { COLORS } from '../utils/colors';

export function Story2() {
  const {
    snapByZip,
    storeTypes,
    stats,
    activeRetailers,
    isLoading,
  } = useFoodAccessAnalysis();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ward8 mx-auto mb-4" />
          <p className="text-slate-600">Loading data...</p>
        </div>
      </div>
    );
  }

  const zipChartData = snapByZip ? getZipCodeChartData(snapByZip) : [];
  const pieChartData = storeTypes?.map((s) => ({
    name: s.type,
    value: s.count,
    percentage: s.percentage,
  })) || [];

  // Transform for horizontal bar chart
  const zipBarData = snapByZip?.map((z) => ({
    name: `ZIP ${z.zipCode}`,
    value: z.total,
    color: z.zipCode === '20019' ? COLORS.ward7 : z.zipCode === '20020' ? COLORS.ward8 : '#64748b',
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-slate-800 to-red-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="text-purple-300 hover:text-purple-200 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hunger by Design
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Structural Food Inequity and Nutrition Access: Food insecurity in Wards 7
            and 8 results from decades of disinvestment. This story reveals how access
            to food intersects with transportation, income, and opportunity.
          </p>
        </div>
      </section>

      {/* Headline Stat */}
      <section className="py-8 -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-500 to-red-600 text-white rounded-2xl p-8 text-center shadow-xl">
            <p className="text-lg opacity-90 mb-2">The Food Access Crisis</p>
            <p className="text-5xl md:text-6xl font-bold mb-2">
              {stats?.conveniencePercent.toFixed(0)}%
            </p>
            <p className="text-lg opacity-90">
              of SNAP retailers are convenience stores — only {stats?.supermarketPercent.toFixed(0)}% are supermarkets
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              label="Total SNAP Retailers"
              value={activeRetailers?.length || stats?.totalRetailers || 0}
              subValue="Active retailers"
              color="purple"
            />
            <StatCard
              label="Supermarkets"
              value={stats?.supermarketCount || 0}
              subValue={`Only ${stats?.supermarketPercent.toFixed(1)}% of total`}
              trend="down"
              trendLabel="Severely limited"
              color="green"
            />
            <StatCard
              label="Convenience Stores"
              value={stats?.convenienceCount || 0}
              subValue={`${stats?.conveniencePercent.toFixed(1)}% of total`}
              color="red"
            />
            <StatCard
              label="ZIP Codes Served"
              value="3"
              subValue="20019, 20020, 20032"
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Access Landscape */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            The Access Landscape
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            While there are nearly 400 SNAP-authorized retailers serving Wards 7 and 8,
            the distribution across ZIP codes and the types of stores available paint
            a picture of limited access to nutritious food.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-8">
            <Card title="SNAP Retailers by ZIP Code" subtitle="Distribution of food retailers across service areas">
              <HorizontalBarChart
                data={zipBarData}
                height={250}
              />
            </Card>

            <Card title="Store Type Distribution" subtitle="Breakdown of retailer categories">
              <StoreTypePieChart
                data={pieChartData}
                height={280}
              />
            </Card>
          </div>

          <InsightCard
            variant="warning"
            title="The Grocery Gap"
            insight={`With only ${stats?.supermarketCount} supermarkets (${stats?.supermarketPercent.toFixed(1)}%) among ${stats?.totalRetailers} SNAP retailers, residents must often rely on convenience stores (${stats?.conveniencePercent.toFixed(0)}%) that typically offer limited fresh produce and higher prices. This is a classic example of a "food desert" — not a lack of food retailers, but a lack of access to affordable, nutritious food.`}
          />
        </div>
      </section>

      {/* Section 2: Store Types by ZIP */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Store Types by Location
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            The breakdown of store types by ZIP code shows how convenience stores
            dominate across all areas, while supermarkets and grocery stores remain
            scarce throughout Wards 7 and 8.
          </p>

          {snapByZip && (
            <Card
              title="SNAP Retailer Composition by ZIP Code"
              subtitle="Number of retailers by type in each ZIP code"
            >
              <StoreTypeStackedChart data={zipChartData} height={300} />
            </Card>
          )}

          <div className="mt-8 grid md:grid-cols-3 gap-4 md:gap-6">
            {snapByZip?.map((zip) => (
              <Card key={zip.zipCode}>
                <h3 className="text-lg font-bold text-slate-800 mb-3">ZIP {zip.zipCode}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Retailers</span>
                    <span className="font-semibold">{zip.total}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Supermarkets</span>
                    <span className="font-semibold">{zip.supermarkets}</span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>Grocery Stores</span>
                    <span className="font-semibold">{zip.grocery}</span>
                  </div>
                  <div className="flex justify-between text-amber-600">
                    <span>Convenience</span>
                    <span className="font-semibold">{zip.convenience}</span>
                  </div>
                  <div className="flex justify-between text-lime-600">
                    <span>Farmers Market</span>
                    <span className="font-semibold">{zip.farmersMarket}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: The Convenience Store Problem */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            The Convenience Store Problem
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            When convenience stores make up nearly 60% of food retailers, residents face
            significant challenges in accessing healthy, affordable food options.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">
                Convenience Store Reality
              </h3>
              <ul className="space-y-3 text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Limited fresh produce and perishables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Higher prices than traditional grocery stores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Emphasis on processed and packaged foods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Smaller quantities increase cost-per-unit</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                What Full-Service Groceries Offer
              </h3>
              <ul className="space-y-3 text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Wide variety of fresh fruits and vegetables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Competitive pricing through volume purchasing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Fresh meat, dairy, and bakery departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>WIC and SNAP-eligible healthy options</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-4 md:p-8">
            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
              <div>
                <p className="text-2xl md:text-4xl font-bold text-amber-600">{stats?.conveniencePercent.toFixed(0)}%</p>
                <p className="text-sm md:text-base text-slate-600">Convenience Stores</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-bold text-green-600">{stats?.supermarketPercent.toFixed(0)}%</p>
                <p className="text-sm md:text-base text-slate-600">Supermarkets</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-bold text-slate-800">
                  {((stats?.convenienceCount || 0) / (stats?.supermarketCount || 1)).toFixed(0)}:1
                </p>
                <p className="text-sm md:text-base text-slate-600">Ratio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Insight */}
      <section className="py-12 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Food Deserts: A Policy Outcome</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            The food access landscape in Wards 7 and 8 is not an accident. It reflects
            decades of policy decisions that have shaped where grocery stores locate,
            which neighborhoods receive investment, and who has access to healthy,
            affordable food. "Food deserts" are better understood as policy outcomes—
            the result of structural barriers and disinvestment rather than natural
            market forces.
          </p>
          <div className="bg-slate-700 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-3 text-purple-300">
              Resilience Spotlight: Community Solutions
            </h3>
            <p className="text-slate-300">
              Local initiatives like mobile markets, community gardens, and food co-ops
              are working to bridge the food access gap. Organizations across Wards 7
              and 8 are creating innovative solutions to bring fresh, affordable food
              directly to residents who need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/story1"
            className="bg-ward7 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            ← Previous: Same City, Different Lives
          </Link>
          <Link
            to="/explore"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center w-full sm:w-auto"
          >
            Explore All Data →
          </Link>
        </div>
      </section>
    </div>
  );
}
