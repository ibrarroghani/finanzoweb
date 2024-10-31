import axios from 'axios';

const ApiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

ApiService.interceptors.request.use(
  async (config) => {
    // config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    return response?.data || {};
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default ApiService;
