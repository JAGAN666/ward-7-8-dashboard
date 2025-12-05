import { Sparkline } from '../charts/LineChart';
import { COLORS } from '../../utils/colors';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

interface SparklineCardProps {
  label: string;
  value: number;
  format?: 'currency' | 'percent' | 'number';
  trend?: 'up' | 'down' | 'stable';
  trendPercent?: number;
  trendIsGood?: boolean; // Is this trend direction positive?
  sparklineData?: number[];
  color?: 'ward7' | 'ward8' | 'gray';
  compareValue?: number;
  compareLabel?: string;
}

export function SparklineCard({
  label,
  value,
  format = 'number',
  trend,
  trendPercent,
  trendIsGood,
  sparklineData,
  color = 'ward7',
  compareValue,
  compareLabel,
}: SparklineCardProps) {
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

  const colorMap = {
    ward7: COLORS.ward7,
    ward8: COLORS.ward8,
    gray: COLORS.dcAverage,
  };

  const bgColorMap = {
    ward7: 'bg-blue-50 border-blue-200',
    ward8: 'bg-purple-50 border-purple-200',
    gray: 'bg-slate-50 border-slate-200',
  };

  const textColorMap = {
    ward7: 'text-ward7',
    ward8: 'text-ward8',
    gray: 'text-slate-600',
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    const isPositive = trendIsGood !== undefined
      ? (trend === 'up' ? trendIsGood : !trendIsGood)
      : trend === 'up';

    const trendColor = isPositive ? 'text-green-600' : 'text-red-600';

    if (trend === 'up') {
      return (
        <span className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {trendPercent !== undefined && `${Math.abs(trendPercent).toFixed(1)}%`}
        </span>
      );
    }

    if (trend === 'down') {
      return (
        <span className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {trendPercent !== undefined && `${Math.abs(trendPercent).toFixed(1)}%`}
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
        Stable
      </span>
    );
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${bgColorMap[color]}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-slate-600 font-medium">{label}</span>
        {getTrendIcon()}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className={`text-2xl font-bold ${textColorMap[color]}`}>
            {formatValue(value)}
          </p>
          {compareValue !== undefined && (
            <p className="text-xs text-slate-500 mt-1">
              {compareLabel || 'vs comparison'}: {formatValue(compareValue)}
            </p>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="flex-shrink-0">
            <Sparkline
              data={sparklineData}
              color={colorMap[color]}
              height={40}
              width={80}
            />
          </div>
        )}
      </div>
    </div>
  );
}
