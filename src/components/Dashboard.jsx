import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
  const { user, hasRole, loading } = useAuth();

  // ⏳ wait until auth finishes
  if (loading) return null;

  // 🚫 Admin never sees dashboard
  if (hasRole("admin")) {
    return <Navigate to="/admin" replace />;
  }

  if (!user) return null;

  return hasRole("teacher")
    ? <TeacherDashboard />
    : <StudentDashboard />;
};

export default Dashboard;
