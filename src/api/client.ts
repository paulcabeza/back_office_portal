import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach access token
client.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("auth-tokens");
  if (tokens) {
    const { access_token } = JSON.parse(tokens);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});

// Response interceptor: handle 401 with token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't retry refresh or login endpoints
    if (
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const tokens = localStorage.getItem("auth-tokens");
      if (!tokens) throw new Error("No tokens");

      const { refresh_token } = JSON.parse(tokens);
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refresh_token,
      });

      localStorage.setItem(
        "auth-tokens",
        JSON.stringify({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );

      processQueue(null, data.access_token);
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return client(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem("auth-tokens");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default client;
