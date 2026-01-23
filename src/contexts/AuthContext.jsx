import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔐 Single source of truth for user state
  const bootstrap = async () => {
    try {
      const res = await api.get("/me/");
      setUser(res.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Restore session on refresh
  useEffect(() => {
    if (localStorage.getItem("access")) {
      bootstrap();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔑 LOGIN
  const login = async (email, password) => {
    const res = await api.post("/token/", { email, password });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    await bootstrap(); // ✅ normalize user
  };

  // 🔑 SIGNUP (FIXED)
  const signup = async (payload) => {
    const res = await api.post("/signup/", payload);

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    await bootstrap(); // ✅ SAME as login
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // 🎭 ROLE CHECK
  const hasRole = (role) => {
    return user?.roles?.includes(role) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
