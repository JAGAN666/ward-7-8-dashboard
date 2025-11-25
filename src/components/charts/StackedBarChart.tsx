import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '../../utils/colors';
import { formatPercent } from '../../utils/formatters';

// Colors for education levels (from less to more education)
const EDUCATION_COLORS = {
  lessHighSchool: '#ef4444',   // Red - less than high school
  highSchool: '#f97316',        // Orange
  someCollege: '#eab308',       // Yellow
  associates: '#84cc16',        // Lime
  bachelors: '#22c55e',         // Green
  graduate: '#0d9488',          // Teal
};

interface EducationStackedChartProps {
  data: {
    wardName: string;
    lessHighSchool: number;
    highSchool: number;
    someCollege: number;
    associates: number;
    bachelors: number;
    graduate: number;
  }[];
  height?: number;
}

export function EducationStackedChart({ data, height = 350 }: EducationStackedChartProps) {
  const formatTooltip = (value: number) => formatPercent(value);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 12, fill: '#64748b' }}
        />
        <YAxis
          type="category"
          dataKey="wardName"
          tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }}
          width={80}
        />
        <Tooltip
          formatter={(value: number, name: string) => [formatTooltip(value), getEducationLabel(name)]}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#374151', fontSize: 12 }}>
              {getEducationLabel(value)}
            </span>
          )}
        />
        <Bar
          dataKey="lessHighSchool"
          stackId="education"
          fill={EDUCATION_COLORS.lessHighSchool}
          name="lessHighSchool"
        />
        <Bar
          dataKey="highSchool"
          stackId="education"
          fill={EDUCATION_COLORS.highSchool}
          name="highSchool"
        />
        <Bar
          dataKey="someCollege"
          stackId="education"
          fill={EDUCATION_COLORS.someCollege}
          name="someCollege"
        />
        <Bar
          dataKey="associates"
          stackId="education"
          fill={EDUCATION_COLORS.associates}
          name="associates"
        />
        <Bar
          dataKey="bachelors"
          stackId="education"
          fill={EDUCATION_COLORS.bachelors}
          name="bachelors"
        />
        <Bar
          dataKey="graduate"
          stackId="education"
          fill={EDUCATION_COLORS.graduate}
          name="graduate"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function getEducationLabel(key: string): string {
  const labels: Record<string, string> = {
    lessHighSchool: 'Less than High School',
    highSchool: 'High School Graduate',
    someCollege: 'Some College',
    associates: "Associate's Degree",
    bachelors: "Bachelor's Degree",
    graduate: 'Graduate Degree',
  };
  return labels[key] || key;
}

// Store type stacked chart for SNAP data
const STORE_TYPE_COLORS = {
  Supermarket: COLORS.supermarket,
  'Grocery Store': '#3b82f6',
  'Convenience Store': COLORS.convenience,
  'Farmers Market': '#84cc16',
  Other: COLORS.other,
};

interface StoreTypeStackedChartProps {
  data: {
    zipCode: string;
    Supermarket: number;
    'Grocery Store': number;
    'Convenience Store': number;
    'Farmers Market': number;
    Other: number;
    total: number;
  }[];
  height?: number;
}

export function StoreTypeStackedChart({ data, height = 300 }: StoreTypeStackedChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: '#64748b' }}
        />
        <YAxis
          type="category"
          dataKey="zipCode"
          tick={{ fontSize: 14, fill: '#374151', fontWeight: 500 }}
          width={70}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: '#374151', fontSize: 12 }}>{value}</span>
          )}
        />
        <Bar
          dataKey="Supermarket"
          stackId="stores"
          fill={STORE_TYPE_COLORS.Supermarket}
        />
        <Bar
          dataKey="Grocery Store"
          stackId="stores"
          fill={STORE_TYPE_COLORS['Grocery Store']}
        />
        <Bar
          dataKey="Convenience Store"
          stackId="stores"
          fill={STORE_TYPE_COLORS['Convenience Store']}
        />
        <Bar
          dataKey="Farmers Market"
          stackId="stores"
          fill={STORE_TYPE_COLORS['Farmers Market']}
        />
        <Bar
          dataKey="Other"
          stackId="stores"
          fill={STORE_TYPE_COLORS.Other}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
