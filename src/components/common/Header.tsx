import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ward7 to-ward8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">Ward 7 & 8 Data Dashboard</h1>
              <p className="text-sm text-slate-400">Understanding Inequality in Washington, DC</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/story1"
              className={`transition-colors ${isActive('/story1') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              Same City, Different Lives
            </Link>
            <Link
              to="/story2"
              className={`transition-colors ${isActive('/story2') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              Hunger by Design
            </Link>
            <Link
              to="/explore"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive('/explore') ? 'bg-blue-700' : 'bg-ward7 hover:bg-blue-700'}`}
            >
              Explore Data
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-700 flex flex-col gap-3">
            <Link
              to="/story1"
              className={`py-2 transition-colors ${isActive('/story1') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Same City, Different Lives
            </Link>
            <Link
              to="/story2"
              className={`py-2 transition-colors ${isActive('/story2') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hunger by Design
            </Link>
            <Link
              to="/explore"
              className={`py-2 px-4 rounded-lg text-center transition-colors ${isActive('/explore') ? 'bg-blue-700' : 'bg-ward7 hover:bg-blue-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Data
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
