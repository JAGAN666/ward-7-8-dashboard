import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [researchMenuOpen, setResearchMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isResearchPage = ['/demographics', '/economics', '/housing', '/social', '/food-access', '/data-dictionary'].includes(location.pathname);

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
          <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
            <Link
              to="/ward7"
              className={`focus-ring px-3 py-1.5 rounded transition-colors ${isActive('/ward7') ? 'bg-ward7 text-white' : 'text-blue-300 hover:text-white hover:bg-ward7/20'}`}
              aria-current={isActive('/ward7') ? 'page' : undefined}
            >
              Ward 7
            </Link>
            <Link
              to="/ward8"
              className={`focus-ring px-3 py-1.5 rounded transition-colors ${isActive('/ward8') ? 'bg-ward8 text-white' : 'text-purple-300 hover:text-white hover:bg-ward8/20'}`}
              aria-current={isActive('/ward8') ? 'page' : undefined}
            >
              Ward 8
            </Link>
            <Link
              to="/compare"
              className={`focus-ring px-3 py-1.5 rounded transition-colors ${isActive('/compare') ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              aria-current={isActive('/compare') ? 'page' : undefined}
            >
              Compare
            </Link>

            {/* Research Data Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResearchMenuOpen(!researchMenuOpen)}
                onBlur={() => setTimeout(() => setResearchMenuOpen(false), 150)}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${isResearchPage ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Research Data
                <svg className={`w-4 h-4 transition-transform ${researchMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {researchMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 z-50">
                  <Link to="/demographics" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/demographics') ? 'text-blue-400' : 'text-slate-300'}`}>Demographics</Link>
                  <Link to="/economics" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/economics') ? 'text-green-400' : 'text-slate-300'}`}>Economics</Link>
                  <Link to="/housing" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/housing') ? 'text-amber-400' : 'text-slate-300'}`}>Housing</Link>
                  <Link to="/social" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/social') ? 'text-purple-400' : 'text-slate-300'}`}>Social</Link>
                  <Link to="/food-access" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/food-access') ? 'text-teal-400' : 'text-slate-300'}`}>Food Access</Link>
                  <div className="border-t border-slate-700 my-1"></div>
                  <Link to="/data-dictionary" className={`block px-4 py-2 text-sm hover:bg-slate-700 ${isActive('/data-dictionary') ? 'text-indigo-400' : 'text-slate-300'}`}>Data Dictionary</Link>
                </div>
              )}
            </div>

            <Link
              to="/crime"
              className={`px-3 py-1.5 rounded transition-colors ${isActive('/crime') ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Crime
            </Link>
            <Link
              to="/map"
              className={`px-3 py-1.5 rounded transition-colors ${isActive('/map') ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Map
            </Link>
            <Link
              to="/story1"
              className={`px-3 py-1.5 rounded transition-colors ${isActive('/story1') || isActive('/story2') ? 'bg-slate-700 text-white font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              Stories
            </Link>
            <Link
              to="/explore"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive('/explore') ? 'bg-blue-700' : 'bg-ward7 hover:bg-blue-700'}`}
            >
              Explore
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-slate-700 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/ward7"
                className={`py-2 px-3 rounded text-center transition-colors ${isActive('/ward7') ? 'bg-ward7 text-white' : 'bg-slate-800 text-blue-300 hover:bg-ward7'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ward 7
              </Link>
              <Link
                to="/ward8"
                className={`py-2 px-3 rounded text-center transition-colors ${isActive('/ward8') ? 'bg-ward8 text-white' : 'bg-slate-800 text-purple-300 hover:bg-ward8'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ward 8
              </Link>
            </div>
            <Link
              to="/compare"
              className={`py-2 transition-colors ${isActive('/compare') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare Wards
            </Link>

            {/* Research Data Section */}
            <div className="pt-2 border-t border-slate-700">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Research Data</p>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/demographics" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/demographics') ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Demographics</Link>
                <Link to="/economics" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/economics') ? 'bg-green-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Economics</Link>
                <Link to="/housing" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/housing') ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Housing</Link>
                <Link to="/social" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/social') ? 'bg-purple-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Social</Link>
                <Link to="/food-access" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/food-access') ? 'bg-teal-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Food Access</Link>
                <Link to="/data-dictionary" className={`py-2 px-3 rounded text-center text-sm transition-colors ${isActive('/data-dictionary') ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`} onClick={() => setMobileMenuOpen(false)}>Dictionary</Link>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <Link
                to="/crime"
                className={`py-2 transition-colors block ${isActive('/crime') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Crime Analysis
              </Link>
              <Link
                to="/map"
                className={`py-2 transition-colors block ${isActive('/map') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Interactive Map
              </Link>
              <Link
                to="/story1"
                className={`py-2 transition-colors block ${isActive('/story1') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Story: Same City, Different Lives
              </Link>
              <Link
                to="/story2"
                className={`py-2 transition-colors block ${isActive('/story2') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Story: Hunger by Design
              </Link>
            </div>
            <Link
              to="/explore"
              className={`py-2 px-4 rounded-lg text-center transition-colors ${isActive('/explore') ? 'bg-blue-700' : 'bg-ward7 hover:bg-blue-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore All Data
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
