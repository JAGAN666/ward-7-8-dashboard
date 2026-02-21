import { COLORS } from '../../utils/colors';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

interface ComparisonCardProps {
  metric: string;
  ward7Value: number;
  ward8Value: number;
  ward7Trend?: 'up' | 'down' | 'stable';
  ward8Trend?: 'up' | 'down' | 'stable';
  ward7TrendPercent?: number;
  ward8TrendPercent?: number;
  format?: 'currency' | 'percent' | 'number';
  higherIsBetter?: boolean;
  subtitle?: string;
}

export function ComparisonCard({
  metric,
  ward7Value,
  ward8Value,
  ward7Trend,
  ward8Trend,
  ward7TrendPercent,
  ward8TrendPercent,
  format = 'number',
  higherIsBetter = true,
  subtitle,
}: ComparisonCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percent':
        return formatPercent(val);
      default:
        return formatNumber(val);
    }
  };

  const gap = ward7Value - ward8Value;
  const gapPercent = ward8Value !== 0 ? ((gap / ward8Value) * 100) : 0;

  // Determine which ward is "better" based on higherIsBetter
  const ward7Better = higherIsBetter ? ward7Value > ward8Value : ward7Value < ward8Value;
  const ward8Better = higherIsBetter ? ward8Value > ward7Value : ward8Value < ward7Value;

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable', percent?: number, isGood?: boolean) => {
    if (!trend) return null;

    const trendColor = trend === 'stable'
      ? 'text-slate-500'
      : isGood
        ? 'text-green-600'
        : 'text-red-600';

    if (trend === 'up') {
      return (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {percent !== undefined && `${Math.abs(percent).toFixed(1)}%`}
        </span>
      );
    }

    if (trend === 'down') {
      return (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {percent !== undefined && `${Math.abs(percent).toFixed(1)}%`}
        </span>
      );
    }

    return (
      <span className="flex items-center text-xs font-medium text-slate-500">
        —
      </span>
    );
  };

  // Determine trend goodness
  const ward7TrendGood = ward7Trend
    ? higherIsBetter
      ? ward7Trend === 'up'
      : ward7Trend === 'down'
    : undefined;
  const ward8TrendGood = ward8Trend
    ? higherIsBetter
      ? ward8Trend === 'up'
      : ward8Trend === 'down'
    : undefined;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-800">{metric}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        {/* Ward 7 */}
        <div className={`p-4 ${ward7Better ? 'bg-green-50' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS.ward7 }}
            />
            <span className="text-sm font-medium text-slate-600">Ward 7</span>
            {ward7Better && (
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                Better
              </span>
            )}
          </div>
          <p className="text-xl font-bold text-ward7">{formatValue(ward7Value)}</p>
          <div className="mt-1">
            {getTrendIcon(ward7Trend, ward7TrendPercent, ward7TrendGood)}
          </div>
        </div>

        {/* Ward 8 */}
        <div className={`p-4 ${ward8Better ? 'bg-green-50' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS.ward8 }}
            />
            <span className="text-sm font-medium text-slate-600">Ward 8</span>
            {ward8Better && (
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                Better
              </span>
            )}
          </div>
          <p className="text-xl font-bold text-ward8">{formatValue(ward8Value)}</p>
          <div className="mt-1">
            {getTrendIcon(ward8Trend, ward8TrendPercent, ward8TrendGood)}
          </div>
        </div>
      </div>

      {/* Gap indicator */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Difference</span>
          <span className={`font-medium ${gap > 0 ? 'text-ward7' : gap < 0 ? 'text-ward8' : 'text-slate-500'}`}>
            {gap > 0 ? '+' : ''}{formatValue(Math.abs(gap))} ({gapPercent > 0 ? '+' : ''}{gapPercent.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

// Compact version for grid layouts
interface CompactComparisonProps {
  metric: string;
  ward7Value: number;
  ward8Value: number;
  format?: 'currency' | 'percent' | 'number';
  higherIsBetter?: boolean;
}

export function CompactComparison({
  metric,
  ward7Value,
  ward8Value,
  format = 'number',
  higherIsBetter = true,
}: CompactComparisonProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percent':
        return formatPercent(val);
      default:
        return formatNumber(val);
    }
  };

  const ward7Better = higherIsBetter ? ward7Value > ward8Value : ward7Value < ward8Value;
  const ward8Better = higherIsBetter ? ward8Value > ward7Value : ward8Value < ward7Value;

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-600">{metric}</span>
      <div className="flex items-center gap-4">
        <span className={`text-sm font-semibold ${ward7Better ? 'text-green-600' : 'text-ward7'}`}>
          {formatValue(ward7Value)}
        </span>
        <span className="text-slate-300">|</span>
        <span className={`text-sm font-semibold ${ward8Better ? 'text-green-600' : 'text-ward8'}`}>
          {formatValue(ward8Value)}
        </span>
      </div>
    </div>
  );
}
