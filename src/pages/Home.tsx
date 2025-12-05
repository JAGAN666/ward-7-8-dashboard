import { Link } from 'react-router-dom';
import { StatCard } from '../components/common/Card';
import { useWardComparisonData } from '../hooks/useData';
import { extractWardStats, calculateKeyGaps } from '../data/dcAverages';
import { formatCurrency } from '../utils/formatters';

export function Home() {
  const { data: wardData, isLoading } = useWardComparisonData();

  // Extract ward data and calculate gaps dynamically
  const { ward7, ward8 } = wardData ? extractWardStats(wardData) : { ward7: null, ward8: null };
  const KEY_GAPS = ward7 && ward8 ? calculateKeyGaps(ward7, ward8) : null;

  if (isLoading || !ward7 || !ward8 || !KEY_GAPS) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="animated-gradient text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ward 7 & 8 Data Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Exploring inequality and opportunity in Washington, DC's most underserved communities.
            Two wards with nearly identical populations, but vastly different outcomes.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/summary"
              className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-slate-500"
            >
              📋 Executive Summary
            </Link>
            <Link
              to="/story1"
              className="bg-ward7 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Same City, Different Lives
            </Link>
            <Link
              to="/story2"
              className="bg-ward8 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Hunger by Design
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              label="Income Gap"
              value={formatCurrency(KEY_GAPS.incomeGap)}
              subValue="Ward 7 vs Ward 8"
              color="red"
            />
            <StatCard
              label="Homeownership Gap"
              value={`${KEY_GAPS.homeownershipGap.toFixed(1)}%`}
              subValue="Ward 7 vs Ward 8"
              color="purple"
            />
            <StatCard
              label="Education Gap"
              value={`${KEY_GAPS.educationGap.toFixed(1)}%`}
              subValue="Bachelor's degree+"
              color="blue"
            />
            <StatCard
              label="Poverty Gap"
              value={`${KEY_GAPS.povertyGap.toFixed(1)}%`}
              subValue="Ward 8 higher"
              color="red"
            />
          </div>
        </div>
      </section>

      {/* Stories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Explore the Data Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Story 1 Card */}
            <Link
              to="/story1"
              className="group block bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 md:p-8 border-2 border-transparent hover:border-ward7 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-ward7 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Same City, Different Lives
                </h3>
              </div>
              <p className="text-slate-600 mb-6">
                Ward 7 and Ward 8 have almost identical populations, yet geography
                continues to shape vastly different opportunities. Explore the economic,
                housing, and educational divides that define these communities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-slate-500">Ward 7 Median Income</p>
                  <p className="text-xl font-bold text-ward7">
                    {formatCurrency(ward7.medianIncome)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-slate-500">Ward 8 Median Income</p>
                  <p className="text-xl font-bold text-ward8">
                    {formatCurrency(ward8.medianIncome)}
                  </p>
                </div>
              </div>
              <span className="text-ward7 font-semibold group-hover:underline">
                Explore Story →
              </span>
            </Link>

            {/* Story 2 Card */}
            <Link
              to="/story2"
              className="group block bg-gradient-to-br from-purple-50 to-slate-50 rounded-2xl p-6 md:p-8 border-2 border-transparent hover:border-ward8 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-ward8 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🍎</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Hunger by Design
                </h3>
              </div>
              <p className="text-slate-600 mb-6">
                Food insecurity in Wards 7 and 8 results from decades of disinvestment.
                Discover how access to food and transportation intersect with income
                and opportunity in these neighborhoods.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-slate-500">SNAP Retailers</p>
                  <p className="text-xl font-bold text-ward8">399</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-slate-500">Supermarkets</p>
                  <p className="text-xl font-bold text-red-600">Only 4 (1%)</p>
                </div>
              </div>
              <span className="text-ward8 font-semibold group-hover:underline">
                Explore Story →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Data Explorer CTA */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Explore the Data Yourself
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Dive deep into the data with interactive filters and visualizations.
            Compare metrics, explore trends, and uncover insights.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Open Data Explorer
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">
            Data sources: US Census Bureau, American Community Survey, USDA SNAP Program
          </p>
          <p className="text-sm">
            Ward 7 & 8 Data Dashboard • Washington, DC
          </p>
        </div>
      </footer>
    </div>
  );
}
