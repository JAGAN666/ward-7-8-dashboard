import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', title, subtitle, hoverable = true }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverable ? 'card-hover' : ''} ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-slate-100">
          {title && <h3 className="text-lg font-semibold text-slate-800">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  color?: 'blue' | 'purple' | 'gray' | 'red' | 'green';
}

export function StatCard({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  color = 'blue',
}: StatCardProps) {
  const borderColors = {
    blue: 'border-l-blue-600',
    purple: 'border-l-purple-600',
    gray: 'border-l-slate-600',
    red: 'border-l-red-600',
    green: 'border-l-green-600',
  };

  const valueColors = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    gray: 'text-slate-700',
    red: 'text-red-700',
    green: 'text-green-700',
  };

  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-500',
  };

  return (
    <div className={`card-hover bg-white rounded-xl shadow-lg border border-slate-200 border-l-4 ${borderColors[color]} p-4 md:p-6`}>
      <p className="text-sm font-medium text-slate-600 mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold ${valueColors[color]} mb-1`}>{value}</p>
      {subValue && (
        <p className="text-xs text-slate-500">{subValue}</p>
      )}
      {trend && trendLabel && (
        <div className={`mt-2 flex items-center gap-2 ${trendColor[trend]}`}>
          <span className="text-sm">{trendIcon[trend]}</span>
          <span className="text-xs font-medium">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}

interface InsightCardProps {
  title: string;
  insight: string;
  icon?: ReactNode;
  variant?: 'info' | 'warning' | 'success';
}

export function InsightCard({ title, insight, icon, variant = 'info' }: InsightCardProps) {
  const variantClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className={`rounded-xl border-2 p-4 md:p-6 ${variantClasses[variant]}`}>
      <div className="flex items-start gap-4">
        {icon && <div className="flex-shrink-0 text-2xl">{icon}</div>}
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="mt-2 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}
