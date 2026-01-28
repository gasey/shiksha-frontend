import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔐 Load current user
  const bootstrap = async () => {
    try {
      const res = await api.get("/me/");
      setUser(res.data);
    } catch (err) {
      // ✅ Only logout on UNAUTHORIZED (token invalid)
      if (err.response?.status === 401) {
        localStorage.clear();
        setUser(null);
      }
      // ❗ 403 should NOT logout
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Restore session
  useEffect(() => {
    if (localStorage.getItem("access")) {
      bootstrap();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔑 LOGIN
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
  // 🔑 SIGNUP
  const signup = async (payload) => {
  try {
    await api.post("/signup/", payload);
    // ❌ DO NOT store tokens
    // ❌ DO NOT call bootstrap
  } catch (err) {
    throw extractError(err);
  }
};

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
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
