import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';
import type { MetricComparison } from '../../hooks/useData';

interface MetricCardProps {
  metric: MetricComparison;
  showFieldCode?: boolean;
}

export function MetricCard({ metric, showFieldCode = false }: MetricCardProps) {
  const formatValue = (value: number | null, format: string): string => {
    if (value === null) return 'N/A';
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercent(value);
      case 'ratio':
        return value.toFixed(1);
      default:
        return formatNumber(value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h4 className="font-semibold text-slate-800 text-sm">{metric.label}</h4>
        {showFieldCode && (
          <p className="text-xs text-slate-400 font-mono mt-0.5">{metric.fieldCode}</p>
        )}
      </div>

      {/* Values */}
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        {/* Ward 7 */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-ward7" />
            <span className="text-xs font-medium text-slate-500">Ward 7</span>
          </div>
          <p className="text-lg font-bold text-ward7">
            {formatValue(metric.ward7Value, metric.format)}
          </p>
        </div>

        {/* Ward 8 */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-ward8" />
            <span className="text-xs font-medium text-slate-500">Ward 8</span>
          </div>
          <p className="text-lg font-bold text-ward8">
            {formatValue(metric.ward8Value, metric.format)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Compact version for tables/lists
interface MetricRowProps {
  metric: MetricComparison;
  showFieldCode?: boolean;
}

export function MetricRow({ metric, showFieldCode = false }: MetricRowProps) {
  const formatValue = (value: number | null, format: string): string => {
    if (value === null) return 'N/A';
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercent(value);
      case 'ratio':
        return value.toFixed(1);
      default:
        return formatNumber(value);
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="py-3 px-4">
        <div>
          <span className="text-sm font-medium text-slate-800">{metric.label}</span>
          {showFieldCode && (
            <span className="text-xs text-slate-400 font-mono ml-2">{metric.fieldCode}</span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{metric.description}</p>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="text-sm font-semibold text-ward7">
          {formatValue(metric.ward7Value, metric.format)}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="text-sm font-semibold text-ward8">
          {formatValue(metric.ward8Value, metric.format)}
        </span>
      </td>
    </tr>
  );
}

// Category section component
interface MetricCategorySectionProps {
  category: string;
  metrics: MetricComparison[];
  showFieldCodes?: boolean;
  viewMode?: 'grid' | 'table';
}

export function MetricCategorySection({
  category,
  metrics,
  showFieldCodes = false,
  viewMode = 'grid',
}: MetricCategorySectionProps) {
  if (viewMode === 'table') {
    return (
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">{category}</h3>
          <p className="text-xs text-slate-500">{metrics.length} metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-2 px-4 text-xs font-semibold text-slate-600">Metric</th>
                <th className="text-right py-2 px-4 text-xs font-semibold text-ward7">Ward 7</th>
                <th className="text-right py-2 px-4 text-xs font-semibold text-ward8">Ward 8</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map(metric => (
                <MetricRow key={metric.fieldCode} metric={metric} showFieldCode={showFieldCodes} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800">{category}</h3>
        <p className="text-sm text-slate-500">{metrics.length} metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <MetricCard key={metric.fieldCode} metric={metric} showFieldCode={showFieldCodes} />
        ))}
      </div>
    </div>
  );
}
