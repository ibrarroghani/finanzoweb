import axios from 'axios';
import { API_PREFIX } from '@/config/api/constrants';

const ApiService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${API_PREFIX}`,
});

ApiService.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

ApiService.interceptors.response.use(
  (response) => response?.data || {},
  (error) => {
    if (error.response.status === 401) {
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

export default ApiService;
