import { Link } from 'react-router-dom';
import { useWardComparisonData, useFoodAccessAnalysis, useCrimeAnalysis } from '../hooks/useData';
import { extractWardStats, calculateKeyGaps, DC_AVERAGES } from '../data/dcAverages';
import { StatCard } from '../components/common/Card';
import { formatCurrency, formatNumber } from '../utils/formatters';

// Executive Summary page for policymakers
// ALL data is pulled from real data sources via existing hooks
// No hardcoded or fake data - everything comes from:
// - ACS 5-year estimates (economic, housing, social)
// - USDA SNAP retailer data
// - DC Open Data crime incidents

export function ExecutiveSummary() {
    const { data: wardData, isLoading: loadingWard } = useWardComparisonData();
    const { stats: foodStats, activeRetailers, isLoading: loadingFood } = useFoodAccessAnalysis();
    const { stats: crimeStats, isLoading: loadingCrime } = useCrimeAnalysis();

    const isLoading = loadingWard || loadingFood || loadingCrime;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4" />
                    <p className="text-slate-600">Loading data...</p>
                </div>
            </div>
        );
    }

    // Extract ward data from real ACS data
    const { ward7, ward8 } = wardData ? extractWardStats(wardData) : { ward7: null, ward8: null };
    const gaps = ward7 && ward8 ? calculateKeyGaps(ward7, ward8) : null;

    if (!ward7 || !ward8 || !gaps) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-600">Error loading data</p>
            </div>
        );
    }

    // Key findings derived from real data
    const keyFindings = [
        {
            title: 'Income Disparity',
            finding: `Ward 7 median income (${formatCurrency(ward7.medianIncome)}) is ${formatCurrency(gaps.incomeGap)} higher than Ward 8 (${formatCurrency(ward8.medianIncome)}). Both are significantly below DC average (${formatCurrency(DC_AVERAGES.medianHouseholdIncome)}).`,
            metric: formatCurrency(gaps.incomeGap),
            metricLabel: 'Gap',
            severity: 'high' as const,
        },
        {
            title: 'Homeownership Gap',
            finding: `Ward 7's homeownership rate (${ward7.homeownershipRate}%) is ${gaps.homeownershipGap.toFixed(1)} percentage points higher than Ward 8 (${ward8.homeownershipRate}%). DC average is ${DC_AVERAGES.homeownershipRate}%.`,
            metric: `${gaps.homeownershipGap.toFixed(1)}%`,
            metricLabel: 'Gap',
            severity: 'high' as const,
        },
        {
            title: 'Educational Attainment',
            finding: `Only ${ward7.bachelorsDegreeRate}% (Ward 7) and ${ward8.bachelorsDegreeRate}% (Ward 8) have bachelor's degrees, compared to ${DC_AVERAGES.bachelorsDegreeRate}% citywide.`,
            metric: `${DC_AVERAGES.bachelorsDegreeRate - Math.min(ward7.bachelorsDegreeRate, ward8.bachelorsDegreeRate)}%`,
            metricLabel: 'Below DC',
            severity: 'medium' as const,
        },
        {
            title: 'Poverty Concentration',
            finding: `Poverty rates in Ward 7 (${ward7.povertyRate}%) and Ward 8 (${ward8.povertyRate}%) far exceed the DC average (${DC_AVERAGES.povertyRate}%).`,
            metric: `${ward8.povertyRate}%`,
            metricLabel: 'Ward 8',
            severity: 'high' as const,
        },
    ];

    // Food access findings from real SNAP data
    if (foodStats) {
        keyFindings.push({
            title: 'Food Access Crisis',
            finding: `Of ${foodStats.totalRetailers} SNAP retailers, only ${foodStats.supermarketCount} (${foodStats.supermarketPercent.toFixed(1)}%) are supermarkets. ${foodStats.conveniencePercent.toFixed(0)}% are convenience stores.`,
            metric: `${foodStats.supermarketCount}`,
            metricLabel: 'Supermarkets',
            severity: 'high' as const,
        });
    }

    // Crime findings from real DC Open Data
    if (crimeStats) {
        const latestYear = crimeStats.latestYear;
        keyFindings.push({
            title: 'Public Safety',
            finding: `In ${latestYear.year}, Ward 7 had ${formatNumber(latestYear.ward7)} incidents and Ward 8 had ${formatNumber(latestYear.ward8)} incidents. 5-year total: ${formatNumber(crimeStats.totals.all)} incidents.`,
            metric: formatNumber(crimeStats.totals.all),
            metricLabel: '5-Year Total',
            severity: 'medium' as const,
        });
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="bg-slate-900 text-white py-12 print:bg-white print:text-black print:py-4">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/" className="text-slate-400 hover:text-slate-300 print:hidden">
                            ← Back to Dashboard
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm print:hidden"
                        >
                            Print / Save PDF
                        </button>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Executive Summary: Wards 7 & 8
                    </h1>
                    <p className="text-slate-300 print:text-slate-600">
                        Key findings for policymakers and stakeholders
                    </p>
                </div>
            </section>

            {/* At a Glance Stats */}
            <section className="py-8 -mt-6 print:mt-0">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            label="Population (Combined)"
                            value={formatNumber(ward7.population + ward8.population)}
                            subValue={`W7: ${formatNumber(ward7.population)} | W8: ${formatNumber(ward8.population)}`}
                            color="blue"
                        />
                        <StatCard
                            label="Income Gap"
                            value={formatCurrency(gaps.incomeGap)}
                            subValue="Ward 7 vs Ward 8"
                            color="red"
                        />
                        {foodStats && (
                            <StatCard
                                label="SNAP Retailers"
                                value={activeRetailers?.length || foodStats.totalRetailers}
                                subValue={`Only ${foodStats.supermarketCount} supermarkets`}
                                color="green"
                            />
                        )}
                        {crimeStats && (
                            <StatCard
                                label="Crime (5-Year)"
                                value={formatNumber(crimeStats.totals.all)}
                                subValue={`W7: ${formatNumber(crimeStats.totals.ward7)} | W8: ${formatNumber(crimeStats.totals.ward8)}`}
                                color="purple"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Key Findings */}
            <section className="py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Key Findings</h2>
                    <div className="space-y-4">
                        {keyFindings.map((finding, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl border-l-4 p-6 shadow-sm ${finding.severity === 'high'
                                    ? 'border-l-red-500'
                                    : finding.severity === 'medium'
                                        ? 'border-l-amber-500'
                                        : 'border-l-blue-500'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-800 mb-2">
                                            {index + 1}. {finding.title}
                                        </h3>
                                        <p className="text-slate-600">{finding.finding}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-2xl font-bold text-slate-800">{finding.metric}</div>
                                        <div className="text-sm text-slate-500">{finding.metricLabel}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Priority Areas */}
            <section className="py-8 bg-white print:bg-slate-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Priority Areas for Policy Action</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                            <div className="text-red-600 text-3xl mb-3">🏠</div>
                            <h3 className="font-bold text-lg text-red-800 mb-2">Housing & Wealth Building</h3>
                            <p className="text-red-700 text-sm mb-4">
                                Ward 8's {ward8.homeownershipRate}% homeownership rate severely limits wealth accumulation.
                            </p>
                            <ul className="text-sm text-red-700 space-y-1">
                                <li>• Expand down payment assistance</li>
                                <li>• Increase affordable housing stock</li>
                                <li>• Support tenant-to-owner programs</li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                            <div className="text-amber-600 text-3xl mb-3">🍎</div>
                            <h3 className="font-bold text-lg text-amber-800 mb-2">Food Access & Equity</h3>
                            <p className="text-amber-700 text-sm mb-4">
                                Only {foodStats?.supermarketCount || 0} supermarkets serve {formatNumber(ward7.population + ward8.population)} residents.
                            </p>
                            <ul className="text-sm text-amber-700 space-y-1">
                                <li>• Incentivize grocery store development</li>
                                <li>• Expand mobile market programs</li>
                                <li>• Support corner store healthy food initiatives</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <div className="text-blue-600 text-3xl mb-3">💼</div>
                            <h3 className="font-bold text-lg text-blue-800 mb-2">Economic Opportunity</h3>
                            <p className="text-blue-700 text-sm mb-4">
                                Unemployment ({ward7.unemploymentRate}% / {ward8.unemploymentRate}%) and poverty ({ward7.povertyRate}% / {ward8.povertyRate}%) remain elevated.
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Expand workforce development</li>
                                <li>• Target job creation in area</li>
                                <li>• Support small business programs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Sources */}
            <section className="py-8 bg-slate-100 print:bg-white print:border-t">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Data Sources</h2>
                    <div className="text-sm text-slate-600 space-y-2">
                        <p><strong>Economic, Housing, Social Data:</strong> U.S. Census Bureau, American Community Survey 5-Year Estimates (2018-2022)</p>
                        <p><strong>Food Access:</strong> USDA SNAP Retailer Locator (November 2024)</p>
                        <p><strong>Crime Incidents:</strong> DC Open Data - Crime Incidents (2020-2025)</p>
                        <p><strong>DC Averages:</strong> ACS 2023 1-Year Estimates for Washington, DC</p>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-6 print:hidden">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/story1"
                        className="bg-ward7 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Economic Analysis →
                    </Link>
                    <Link
                        to="/story2"
                        className="bg-ward8 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Food Access →
                    </Link>
                    <Link
                        to="/crime"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Crime Analysis →
                    </Link>
                </div>
            </section>
        </div>
    );
}
