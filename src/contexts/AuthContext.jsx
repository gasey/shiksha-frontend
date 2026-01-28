import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const bootstrap = async () => {
    try {
      const res = await api.get("/me/");
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      bootstrap();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/login/", { email, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setLoading(true);
      await bootstrap();
    } catch (err) {
      throw extractError(err);
    }
  };

  const signup = async (payload) => {
    try {
      await api.post("/signup/", payload);
    } catch (err) {
      throw extractError(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
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
