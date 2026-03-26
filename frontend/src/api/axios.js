// src/api/axios.js
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL || 'https://med-management-system.onrender.com';

const api = axios.create({
  baseURL,
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - logging out');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;