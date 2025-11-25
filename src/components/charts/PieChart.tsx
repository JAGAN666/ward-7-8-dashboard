import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatNumber, formatPercent } from '../../utils/formatters';
import { getStoreTypeColor, COLORS } from '../../utils/colors';

interface PieChartProps {
  data: {
    name: string;
    value: number;
    percentage?: number;
  }[];
  height?: number;
  showPercentage?: boolean;
}

export function StoreTypePieChart({ data, height = 350, showPercentage = true }: PieChartProps) {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for very small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showPercentage ? renderCustomizedLabel : undefined}
          outerRadius={120}
          innerRadius={60}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getStoreTypeColor(entry.name)}
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => {
            const item = data.find(d => d.name === name);
            return [
              `${formatNumber(value)} stores (${item?.percentage ? formatPercent(item.percentage) : ''})`,
              name,
            ];
          }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Legend
          formatter={(value: string) => (
            <span style={{ color: '#374151', fontSize: 13 }}>{value}</span>
          )}
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

// Simple comparison donut chart
interface ComparisonDonutProps {
  value: number;
  maxValue: number;
  label: string;
  color?: string;
  height?: number;
}

export function ComparisonDonut({
  value,
  maxValue,
  label,
  color = COLORS.ward7,
  height = 200,
}: ComparisonDonutProps) {
  const percentage = (value / maxValue) * 100;
  const remaining = 100 - percentage;

  const data = [
    { name: label, value: percentage },
    { name: 'Remaining', value: remaining },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#e2e8f0" />
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">
          {formatPercent(percentage)}
        </span>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
    </div>
  );
}
