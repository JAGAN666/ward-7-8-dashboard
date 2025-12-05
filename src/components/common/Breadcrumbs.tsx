import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

const ROUTES: Record<string, BreadcrumbItem[]> = {
    '/': [{ label: 'Home' }],
    '/summary': [{ label: 'Home', path: '/' }, { label: 'Executive Summary' }],
    '/ward7': [{ label: 'Home', path: '/' }, { label: 'Ward 7' }],
    '/ward8': [{ label: 'Home', path: '/' }, { label: 'Ward 8' }],
    '/compare': [{ label: 'Home', path: '/' }, { label: 'Compare Wards' }],
    '/story1': [{ label: 'Home', path: '/' }, { label: 'Same City, Different Lives' }],
    '/story2': [{ label: 'Home', path: '/' }, { label: 'Hunger by Design' }],
    '/explore': [{ label: 'Home', path: '/' }, { label: 'Data Explorer' }],
    '/crime': [{ label: 'Home', path: '/' }, { label: 'Crime Analysis' }],
    '/map': [{ label: 'Home', path: '/' }, { label: 'Interactive Map' }],
    '/food-access': [{ label: 'Home', path: '/' }, { label: 'Research Data', path: '/explore' }, { label: 'Food Access' }],
    '/demographics': [{ label: 'Home', path: '/' }, { label: 'Research Data', path: '/explore' }, { label: 'Demographics' }],
    '/economics': [{ label: 'Home', path: '/' }, { label: 'Research Data', path: '/explore' }, { label: 'Economics' }],
    '/housing': [{ label: 'Home', path: '/' }, { label: 'Research Data', path: '/explore' }, { label: 'Housing' }],
    '/social': [{ label: 'Home', path: '/' }, { label: 'Research Data', path: '/explore' }, { label: 'Social' }],
    '/data-dictionary': [{ label: 'Home', path: '/' }, { label: 'Data Dictionary' }],
};

export function Breadcrumbs() {
    const location = useLocation();
    const items = ROUTES[location.pathname] || [{ label: 'Home', path: '/' }];

    // Don't show breadcrumbs on home page
    if (location.pathname === '/') return null;

    return (
        <nav
            className="bg-slate-100 border-b border-slate-200 py-2 px-4 text-sm"
            aria-label="Breadcrumb"
        >
            <ol className="max-w-6xl mx-auto flex items-center gap-2 flex-wrap">
                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-2">
                        {index > 0 && (
                            <span className="text-slate-400" aria-hidden="true">/</span>
                        )}
                        {item.path ? (
                            <Link
                                to={item.path}
                                className="text-slate-600 hover:text-slate-900 hover:underline focus-ring rounded"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-slate-900 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
