import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-teal-600" : "";
  };

  return (
    <header className="bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🌲</span>
            <span className="text-white font-bold text-xl">FRA Atlas</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/map" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/map")}`}>
              Map
            </Link>
            <Link to="/dashboard" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/claims" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/claims")}`}>
              Claims
            </Link>
            <Link to="/ai-insights" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/ai-insights")}`}>
              AI Insights
            </Link>
            <Link to="/reports" className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 ${isActive("/reports")}`}>
              Reports
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/map" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/map")}`}>
              Map
            </Link>
            <Link to="/dashboard" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/claims" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/claims")}`}>
              Claims
            </Link>
            <Link to="/ai-insights" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/ai-insights")}`}>
              AI Insights
            </Link>
            <Link to="/reports" className={`text-white block px-3 py-2 rounded-md text-base font-medium ${isActive("/reports")}`}>
              Reports
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
