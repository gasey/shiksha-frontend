    const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshQueue = [];

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

function processQueue(token) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

export async function apiFetch(url, options = {}) {
  const access = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `Bearer ${access}` }),
    ...options.headers,
  };

  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  if (!isRefreshing) {
    isRefreshing = true;

    const newAccess = await refreshAccessToken();
    isRefreshing = false;

    if (!newAccess) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    processQueue(newAccess);
  }

  return new Promise((resolve) => {
    refreshQueue.push(async (token) => {
      const retryResponse = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(retryResponse);
    });
  });
}
