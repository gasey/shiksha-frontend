import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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
        window.location.href = "https://www.shikshacom.com/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
