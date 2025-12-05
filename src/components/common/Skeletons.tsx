interface ChartSkeletonProps {
    height?: number;
    bars?: number;
}

export function ChartSkeleton({ height = 300, bars = 5 }: ChartSkeletonProps) {
    return (
        <div
            className="chart-skeleton bg-slate-50 rounded-xl border border-slate-200"
            style={{ height }}
            aria-label="Loading chart..."
            role="progressbar"
        >
            {/* Y-axis labels */}
            <div className="flex gap-4 h-full p-4">
                <div className="flex flex-col justify-between w-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="skeleton h-4 w-10" />
                    ))}
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end justify-around gap-4 pb-8">
                    {[...Array(bars)].map((_, i) => (
                        <div
                            key={i}
                            className="skeleton flex-1 rounded-t-lg"
                            style={{
                                height: `${30 + Math.random() * 60}%`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-around px-16 -mt-4">
                {[...Array(bars)].map((_, i) => (
                    <div key={i} className="skeleton h-3 w-16" />
                ))}
            </div>
        </div>
    );
}

interface StatSkeletonProps {
    count?: number;
}

export function StatSkeleton({ count = 4 }: StatSkeletonProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-200 p-4"
                    aria-label="Loading stat..."
                    role="progressbar"
                >
                    <div className="skeleton h-8 w-24 mb-2" />
                    <div className="skeleton h-4 w-20" />
                </div>
            ))}
        </div>
    );
}

export function MapSkeleton() {
    return (
        <div
            className="skeleton rounded-xl"
            style={{ height: 600 }}
            aria-label="Loading map..."
            role="progressbar"
        >
            <div className="h-full flex items-center justify-center">
                <div className="text-slate-400 flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span>Loading map...</span>
                </div>
            </div>
        </div>
    );
}
