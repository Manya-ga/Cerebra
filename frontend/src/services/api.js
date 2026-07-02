import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getSystemStatus = () => api.get('/system/status');
export const getDashboardStats = () => api.get('/system/stats');

export default api;
