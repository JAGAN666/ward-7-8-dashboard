import type { SNAPRetailer, SNAPByZip, StoreTypeCount } from '../../types';
import { calculatePercent } from '../../utils/formatters';

// Normalize store type to category
function normalizeStoreType(storeType: string): string {
  const type = storeType.toLowerCase();
  if (type.includes('supermarket') || type.includes('super store')) {
    return 'Supermarket';
  }
  if (type.includes('large grocery') || type.includes('medium grocery') || type.includes('small grocery')) {
    return 'Grocery Store';
  }
  if (type.includes('convenience')) {
    return 'Convenience Store';
  }
  if (type.includes('farmer')) {
    return 'Farmers Market';
  }
  return 'Other';
}

// Filter active retailers (no end date or end date in future)
export function filterActiveRetailers(retailers: SNAPRetailer[]): SNAPRetailer[] {
  const today = new Date();
  return retailers.filter(r => {
    if (!r['End Date']) return true;
    const endDate = new Date(r['End Date']);
    return endDate > today;
  });
}

// Transform SNAP data grouped by ZIP code
export function transformSNAPByZip(retailers: SNAPRetailer[]): SNAPByZip[] {
  const zipGroups: { [zip: string]: SNAPRetailer[] } = {};

  for (const retailer of retailers) {
    const zip = retailer['Zip Code'];
    if (!zipGroups[zip]) {
      zipGroups[zip] = [];
    }
    zipGroups[zip].push(retailer);
  }

  return Object.entries(zipGroups)
    .map(([zipCode, stores]) => {
      const typeCounts = {
        supermarkets: 0,
        grocery: 0,
        convenience: 0,
        farmersMarket: 0,
        other: 0,
      };

      for (const store of stores) {
        const normalizedType = normalizeStoreType(store['Store Type']);
        switch (normalizedType) {
          case 'Supermarket':
            typeCounts.supermarkets++;
            break;
          case 'Grocery Store':
            typeCounts.grocery++;
            break;
          case 'Convenience Store':
            typeCounts.convenience++;
            break;
          case 'Farmers Market':
            typeCounts.farmersMarket++;
            break;
          default:
            typeCounts.other++;
        }
      }

      return {
        zipCode,
        total: stores.length,
        ...typeCounts,
      };
    })
    .filter(z => ['20019', '20020', '20032'].includes(z.zipCode))
    .sort((a, b) => b.total - a.total);
}

// Get store type distribution across all retailers
export function getStoreTypeDistribution(retailers: SNAPRetailer[]): StoreTypeCount[] {
  const typeCounts: { [type: string]: number } = {};

  for (const retailer of retailers) {
    const normalizedType = normalizeStoreType(retailer['Store Type']);
    typeCounts[normalizedType] = (typeCounts[normalizedType] || 0) + 1;
  }

  const total = retailers.length;

  return Object.entries(typeCounts)
    .map(([type, count]) => ({
      type,
      count,
      percentage: calculatePercent(count, total),
    }))
    .sort((a, b) => b.count - a.count);
}

// Get ZIP code chart data
export function getZipCodeChartData(snapByZip: SNAPByZip[]) {
  return snapByZip.map(z => ({
    zipCode: z.zipCode,
    total: z.total,
    Supermarket: z.supermarkets,
    'Grocery Store': z.grocery,
    'Convenience Store': z.convenience,
    'Farmers Market': z.farmersMarket,
    Other: z.other,
  }));
}

// Get key statistics for SNAP retailers
export function getSNAPStats(retailers: SNAPRetailer[]) {
  const distribution = getStoreTypeDistribution(retailers);
  const supermarkets = distribution.find(d => d.type === 'Supermarket');
  const convenience = distribution.find(d => d.type === 'Convenience Store');

  return {
    totalRetailers: retailers.length,
    supermarketCount: supermarkets?.count || 0,
    supermarketPercent: supermarkets?.percentage || 0,
    convenienceCount: convenience?.count || 0,
    conveniencePercent: convenience?.percentage || 0,
  };
}
