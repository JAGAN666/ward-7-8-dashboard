import { useQuery } from '@tanstack/react-query';

const DC_WARDS_API = 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Demographic_WebMercator/MapServer/6/query';

export function useWardBoundaries() {
  return useQuery({
    queryKey: ['wardBoundaries'],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          where: "WARD='7' OR WARD='8'",
          outFields: '*',
          f: 'geojson',
          outSR: '4326',
        });

        // Add a timeout to the fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(`${DC_WARDS_API}?${params}`, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn('Failed to fetch ward boundaries:', response.statusText);
          return null;
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.warn('Error fetching ward boundaries:', error);
        return null;
      }
    },
    staleTime: Infinity, // Ward boundaries rarely change
    gcTime: Infinity,
    retry: 1,
  });
}
