import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for bootstrap to finish
  if (loading) return null;

  if (!isAuthenticated) {
    // Redirect to marketing login page
    window.location.href = "https://www.shikshacom.com/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;
