import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const DEFAULT_REDIRECTS = {
  admin: "/dashboard",
  user: "/",
};

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    const redirectTo = DEFAULT_REDIRECTS[user?.role] || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
