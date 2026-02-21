// Color palette for the dashboard

export const COLORS = {
  // Ward colors
  ward7: '#2563eb',      // Blue
  ward8: '#7c3aed',      // Purple
  dcAverage: '#94a3b8',  // Gray

  // Store type colors
  supermarket: '#22c55e',     // Green
  grocery: '#3b82f6',         // Blue
  convenience: '#f59e0b',     // Amber
  farmersMarket: '#84cc16',   // Lime
  other: '#6b7280',           // Gray

  // Status indicators
  positive: '#22c55e',        // Green
  negative: '#ef4444',        // Red
  neutral: '#6b7280',         // Gray

  // Food access
  lowAccess: '#ef4444',       // Red
  adequate: '#22c55e',        // Green
  moderate: '#f59e0b',        // Amber

  // Chart backgrounds
  chartBg: '#f8fafc',         // Light gray
  gridLine: '#e2e8f0',        // Slate 200
};

// Gradient definitions for charts
export const GRADIENTS = {
  ward7: ['#2563eb', '#3b82f6'],
  ward8: ['#7c3aed', '#8b5cf6'],
};

// Get color by store type
export function getStoreTypeColor(storeType: string): string {
  const type = storeType.toLowerCase();
  if (type.includes('supermarket') || type.includes('super store')) {
    return COLORS.supermarket;
  }
  if (type.includes('grocery')) {
    return COLORS.grocery;
  }
  if (type.includes('convenience')) {
    return COLORS.convenience;
  }
  if (type.includes('farmer')) {
    return COLORS.farmersMarket;
  }
  return COLORS.other;
}

// Chart color arrays for Recharts
export const CHART_COLORS = [
  COLORS.ward7,
  COLORS.ward8,
  COLORS.dcAverage,
];

export const STORE_TYPE_COLORS = [
  COLORS.supermarket,
  COLORS.grocery,
  COLORS.convenience,
  COLORS.farmersMarket,
  COLORS.other,
];
