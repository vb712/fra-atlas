import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PublicRoute({ redirectTo = "/" }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
