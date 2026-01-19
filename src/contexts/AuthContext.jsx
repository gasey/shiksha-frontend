import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiFetch } from "./http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const res = await apiFetch("/me/");
        if (!res.ok) throw new Error();
        const data = await res.json();

        if (!mounted) return;
        setIsAuthenticated(true);
        setUser(data);
      } catch {
        if (!mounted) return;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    restoreSession();
    return () => {
      mounted = false;
    };
  }, []);

  const login = ({ access, refresh, user }) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading authentication…</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
