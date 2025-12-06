import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("suporte_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
