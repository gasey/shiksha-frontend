import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshCall = originalRequest.url?.includes("/refresh/");
    const isMeCall = originalRequest.url?.includes("/me/");

    // 🚫 If simply not logged in, do NOT attempt refresh
    if (isUnauthorized && isMeCall) {
      return Promise.reject(error);
    }

    // 🔄 Attempt refresh only once and not for refresh endpoint
    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await api.post("/refresh/");
        return api(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
