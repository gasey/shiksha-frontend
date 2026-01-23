import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireRole = ({ role, children }) => {
  const { hasRole, loading } = useAuth();

  if (loading) return null;
  if (!hasRole(role)) return <Navigate to="/" replace />;

  return children;
};

export default RequireRole;
