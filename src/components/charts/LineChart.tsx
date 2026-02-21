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
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

interface LineChartProps {
  data: {
    year: number | string;
    ward7: number;
    ward8: number;
    dcAverage?: number;
  }[];
  format?: 'currency' | 'percent' | 'number';
  height?: number;
  showDCAverage?: boolean;
  title?: string;
}

export function LineChart({
  data,
  format = 'number',
  height = 300,
  showDCAverage = false,
}: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        No data available
      </div>
    );
  }

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercent(value);
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
    return formatNumber(value);
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: COLORS.gridLine }}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: COLORS.gridLine }}
        />
        <Tooltip
          formatter={(value: number) => formatValue(value)}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => (
            <span style={{ color: '#374151', fontWeight: 500 }}>{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="ward7"
          name="Ward 7"
          stroke={COLORS.ward7}
          strokeWidth={3}
          dot={{ fill: COLORS.ward7, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="ward8"
          name="Ward 8"
          stroke={COLORS.ward8}
          strokeWidth={3}
          dot={{ fill: COLORS.ward8, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        {showDCAverage && data[0]?.dcAverage !== undefined && (
          <Line
            type="monotone"
            dataKey="dcAverage"
            name="DC Average"
            stroke={COLORS.dcAverage}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: COLORS.dcAverage, strokeWidth: 2, r: 3 }}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

// Mini sparkline version for cards
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({
  data,
  color = COLORS.ward7,
  height = 40,
  width = 100,
}: SparklineProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Convert array of numbers to chart data format
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
