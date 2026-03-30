import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireProfileComplete = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (location.pathname === "/form-fillup") return children;

  if (user && user.profile_complete === false) {
    return <Navigate to="/form-fillup" state={{ onboarding: true }} replace />;
  }

  return children;
};

export default RequireProfileComplete;
