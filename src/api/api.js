import axios from "axios";

const API_BASE = "https://backend-helpdesk-4.onrender.com/";

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
