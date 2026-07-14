import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:8081",
});

export const jobApi = axios.create({
  baseURL: import.meta.env.VITE_JOB_API_BASE_URL || "http://localhost:8082",
});

const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authApi.interceptors.request.use(attachToken, (error) => Promise.reject(error));
jobApi.interceptors.request.use(attachToken, (error) => Promise.reject(error));

export default authApi;
