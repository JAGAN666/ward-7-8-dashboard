import Plot from 'react-plotly.js';
import { useMemo, useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { Data, Layout } from 'plotly.js';

interface PlotlyMapProps {
  traces: Data[];
  className?: string;
  style?: CSSProperties;
  height?: string;
  scrollZoom?: boolean;
  showFullscreenToggle?: boolean;
}

// Center point for Ward 7 & 8 area in DC
const DEFAULT_CENTER = { lat: 38.87, lon: -76.98 };
const DEFAULT_ZOOM = 11;

export function BaseMap({
  traces,
  className = 'w-full',
  style,
  height = '600px',
  scrollZoom = true,
  showFullscreenToggle = true,
}: PlotlyMapProps) {
  // Track revision to force re-renders when traces change
  const [revision, setRevision] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Increment revision whenever traces change
  useEffect(() => {
    setRevision(prev => prev + 1);
  }, [traces]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const layout: Partial<Layout> = useMemo(() => ({
    mapbox: {
      style: 'open-street-map',
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    showlegend: false,
    autosize: true,
    datarevision: revision,
  }), [revision]);

  const config = {
    scrollZoom: scrollZoom,
    displayModeBar: true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d'] as ('select2d' | 'lasso2d')[],
    responsive: true,
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-[9999] bg-white'
    : `${className} rounded-xl shadow-lg overflow-hidden`;

  const containerStyle = isFullscreen
    ? { width: '100vw', height: '100vh' }
    : { ...style, height };

  return (
    <div className={containerClasses} style={containerStyle}>
      {showFullscreenToggle && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-[1001] bg-white hover:bg-slate-100 text-slate-700 p-2 rounded-lg shadow-md border border-slate-200 transition-colors focus-ring"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
      )}
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
        revision={revision}
      />
    </div>
  );
}

export { DEFAULT_CENTER, DEFAULT_ZOOM };

