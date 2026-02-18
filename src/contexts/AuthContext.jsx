import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  /**
   * Bootstraps user session using HttpOnly cookie
   */
  const bootstrap = useCallback(async () => {
    try {
      const res = await api.get("/me/");
      setUser(res.data);
    } catch (err) {
      setUser(null);
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
      await api.post("/login/", { email, password });

      setLoading(true);
      await bootstrap();
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
      await api.post("/signup/", payload);
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
      await api.post("/logout/");
    } catch {
      // ignore network failure
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
