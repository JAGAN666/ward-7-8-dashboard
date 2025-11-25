import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { COLORS } from '../../utils/colors';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

interface GroupedBarChartProps {
  data: {
    category: string;
    ward7: number;
    ward8: number;
    dcAverage?: number;
  }[];
  format?: 'currency' | 'percent' | 'number';
  height?: number;
  showDCAverage?: boolean;
}

export function GroupedBarChart({
  data,
  format = 'number',
  height = 300,
  showDCAverage = true,
}: GroupedBarChartProps) {
  // Safety check for empty data
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
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
        <XAxis
          dataKey="category"
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
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => (
            <span style={{ color: '#374151', fontWeight: 500 }}>{value}</span>
          )}
        />
        <Bar dataKey="ward7" name="Ward 7" fill={COLORS.ward7} radius={[4, 4, 0, 0]} />
        <Bar dataKey="ward8" name="Ward 8" fill={COLORS.ward8} radius={[4, 4, 0, 0]} />
        {showDCAverage && data[0]?.dcAverage !== undefined && (
          <Bar
            dataKey="dcAverage"
            name="DC Average"
            fill={COLORS.dcAverage}
            radius={[4, 4, 0, 0]}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

// Horizontal version for SNAP retailers by ZIP
interface HorizontalBarChartProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  format?: 'currency' | 'percent' | 'number';
  height?: number;
}

export function HorizontalBarChart({
  data,
  format = 'number',
  height = 300,
}: HorizontalBarChartProps) {
  // Safety check for empty data
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

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 90, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: '#64748b' }}
          tickFormatter={(value) => formatValue(value)}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12, fill: '#64748b' }}
          width={80}
        />
        <Tooltip
          formatter={(value: number) => formatValue(value)}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS.ward7}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
