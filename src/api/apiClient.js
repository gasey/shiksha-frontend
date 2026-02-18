import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 🔥 REQUIRED for HttpOnly cookies
});

/**
 * Response interceptor:
 * - If access token expired (401)
 * - Attempt refresh using refresh cookie
 * - Retry original request
 * - If refresh fails → redirect to login
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshCall = originalRequest.url.includes("/refresh/");

    // Only try refresh if:
    // - 401
    // - not already retried
    // - not the refresh endpoint itself
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
