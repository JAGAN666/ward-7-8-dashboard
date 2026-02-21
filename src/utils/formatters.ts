// Number and currency formatting utilities

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

export function formatValue(
  value: number,
  format: 'currency' | 'percent' | 'number' | 'boolean'
): string {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return formatPercent(value);
    case 'number':
      return formatNumber(value);
    case 'boolean':
      return value ? 'Yes' : 'No';
    default:
      return String(value);
  }
}

// Calculate percentage from two numbers
export function calculatePercent(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return (numerator / denominator) * 100;
}

// Format large gaps with +/- sign
export function formatGap(value: number, format: 'currency' | 'percent' = 'percent'): string {
  const sign = value > 0 ? '+' : '';
  if (format === 'currency') {
    return `${sign}${formatCurrency(value)}`;
  }
  return `${sign}${formatPercent(value)}`;
}
