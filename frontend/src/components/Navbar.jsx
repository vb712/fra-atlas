import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const NAVIGATION = {
  guest: [
    { to: "/", label: "Home" },
    { to: "/map", label: "Map" },
    { to: "/help", label: "Help" },
    { to: "/about", label: "About" },
  ],
  user: [
    { to: "/", label: "Home" },
    { to: "/map", label: "Map" },
    { to: "/new-claim", label: "New Claim" },
    { to: "/digitalise", label: "Digitalise" },
    { to: "/status", label: "Status" },
    { to: "/help", label: "Help" },
    { to: "/about", label: "About" },
  ],
  admin: [
    { to: "/", label: "Home" },
    { to: "/map", label: "Map" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/claims", label: "Claims" },
    { to: "/ai-insights", label: "AI Insights" },
    { to: "/reports", label: "Reports" },
  ],
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = useMemo(() => {
    if (!isAuthenticated) {
      return NAVIGATION.guest;
    }
    if (user?.role === "admin") {
      return NAVIGATION.admin;
    }
    return NAVIGATION.user;
  }, [isAuthenticated, user?.role]);

  const isActive = (path) => location.pathname === path;

  const actionLabel = isAuthenticated ? "Logout" : "Login";

  const handleAction = () => {
    setIsMobileMenuOpen(false);
    if (isAuthenticated) {
      logout();
      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-lg font-semibold text-white">
              FA
            </div>
            <div>
              <span className="block text-white font-bold text-xl">FRA Atlas</span>
              {isAuthenticated && user?.fullName && (
                <span className="block text-xs text-slate-300">Signed in as {user.fullName}</span>
              )}
            </div>
          </div>

          <nav className="hidden items-center space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium text-white px-3 py-2 rounded-md hover:bg-teal-700 ${isActive(item.to) ? "bg-teal-600" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center space-x-3 md:flex">
            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="rounded-md border border-teal-300 px-3 py-2 text-sm font-medium text-teal-100 hover:bg-teal-600 hover:text-white"
              >
                Register
              </button>
            )}
            <button
              type="button"
              onClick={handleAction}
              className="rounded-md bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              {actionLabel}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
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

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium text-white ${isActive(item.to) ? "bg-teal-600" : "hover:bg-teal-700"}`}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-teal-700"
              >
                Register
              </Link>
            )}
            <button
              type="button"
              onClick={handleAction}
              className="mt-2 w-full rounded-md bg-teal-500 px-3 py-2 text-base font-medium text-white hover:bg-teal-600"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
