import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '../../utils/colors';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface BOTGChartProps {
  data: {
    year: number;
    ward7: number;
    ward8: number;
    dcAverage?: number;
  }[];
  ward: 7 | 8;
  format?: 'currency' | 'percent' | 'number';
  height?: number;
  title?: string;
  unit?: string;
}

export function BOTGChart({
  data,
  ward,
  format = 'number',
  height = 250,
  title,
  unit,
}: BOTGChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 bg-slate-50 rounded-lg">
        No historical data available
      </div>
    );
  }

  // Transform data to show only the selected ward and DC
  const chartData = data.map(d => ({
    year: d.year,
    [`Ward ${ward}`]: ward === 7 ? d.ward7 : d.ward8,
    'DC Average': d.dcAverage,
  }));

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return `${value.toFixed(1)}%`;
      default:
        return formatNumber(value);
    }
  };

  const formatYAxis = (value: number) => {
    if (format === 'currency') {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    if (format === 'percent') {
      return `${value}%`;
    }
    return value >= 1000 ? `${(value / 1000).toFixed(0)}K` : formatNumber(value);
  };

  const wardColor = ward === 7 ? COLORS.ward7 : COLORS.ward8;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      {title && (
        <div className="mb-4">
          <h4 className="font-semibold text-slate-700">{title}</h4>
          {unit && <p className="text-xs text-slate-500">Unit: {unit}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            width={60}
          />
          <Tooltip
            formatter={(value: number, name: string) => [formatValue(value), name]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '13px',
            }}
            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => (
              <span style={{ color: '#374151', fontWeight: 500, fontSize: '13px' }}>{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey={`Ward ${ward}`}
            stroke={wardColor}
            strokeWidth={3}
            dot={{ fill: wardColor, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, strokeWidth: 2 }}
          />
          {chartData[0]?.['DC Average'] !== undefined && (
            <Line
              type="monotone"
              dataKey="DC Average"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Compact version for grid layouts
interface CompactBOTGProps {
  data: {
    year: number;
    ward7: number;
    ward8: number;
    dcAverage?: number;
  }[];
  ward: 7 | 8;
  label: string;
  currentValue: number | null;
  dcValue: number | null;
  format?: 'currency' | 'percent' | 'number';
}

export function CompactBOTG({
  data,
  ward,
  label,
  currentValue,
  dcValue,
  format = 'number',
}: CompactBOTGProps) {
  const formatValue = (value: number | null) => {
    if (value === null) return 'N/A';
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return `${value.toFixed(1)}%`;
      default:
        return formatNumber(value);
    }
  };

  const wardColor = ward === 7 ? COLORS.ward7 : COLORS.ward8;

  // Transform data for mini chart
  const chartData = data
    .filter(d => (ward === 7 ? d.ward7 : d.ward8) !== undefined)
    .map(d => ({
      year: d.year,
      value: ward === 7 ? d.ward7 : d.ward8,
      dc: d.dcAverage,
    }))
    .sort((a, b) => a.year - b.year);

  const latestYear = chartData.length > 0 ? chartData[0].year : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={`text-2xl font-bold`} style={{ color: wardColor }}>
            {formatValue(currentValue)}
          </p>
        </div>
        {dcValue !== null && (
          <div className="text-right">
            <p className="text-xs text-slate-400">DC Avg</p>
            <p className="text-sm font-medium text-slate-500">{formatValue(dcValue)}</p>
          </div>
        )}
      </div>

      {chartData.length > 1 && (
        <div className="mt-3">
          <ResponsiveContainer width="100%" height={60}>
            <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={wardColor}
                strokeWidth={2}
                dot={false}
              />
              {chartData[0]?.dc !== undefined && (
                <Line
                  type="monotone"
                  dataKey="dc"
                  stroke="#cbd5e1"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-1">
            {chartData[chartData.length - 1]?.year} - {latestYear}
          </p>
        </div>
      )}
    </div>
  );
}
