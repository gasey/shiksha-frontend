import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  /**
   * Convenience check used by components and routes to determine if the
   * current user has a particular role. The backend returns a `role` string,
   * so we normalize to lowercase when comparing and gracefully handle
   * `null`/`undefined` values.
   */
  /**
   * Bootstraps user session using HttpOnly cookie
   */
  const bootstrap = useCallback(async () => {
    try {
      const res = await api.get("/accounts/me/");
      setUser(res.data);
      return res.data; // return fetched user so callers can act on it
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Run bootstrap on first load
   * Browser automatically sends cookies
   */
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  /**
   * Login
   * Backend sets HttpOnly cookies
   */
  const login = async (email, password) => {
    try {
      await api.post("/accounts/login/", { email, password });

      setLoading(true);
      // bootstrap returns the authenticated user object
      const me = await bootstrap();
      return me;
    } catch (err) {
      setLoading(false);
      return Promise.reject(extractError(err));
    }
  };

  /**
   * Signup
   */
  const signup = async (payload) => {
    try {
      await api.post("/accounts/signup/", payload);
    } catch (err) {
      return Promise.reject(extractError(err));
    }
  };

  /**
   * Logout
   * Calls backend to clear cookies
   */
  const logout = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch {
      // ignore network failure
    }

    setUser(null);
  };

  /**
   * Check if user has a specific role
   */
const hasRole = (role) => {
  if (!user?.role || !role) return false;
  return String(user.role).toLowerCase() === String(role).toLowerCase();
};
    
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, signup, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
