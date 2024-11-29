import axios from 'axios';
import { API_PREFIX } from '@/config/api/constrants';
// import getToken from '@/utils/token/token-fetcher';

const apiService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${API_PREFIX}`,
});

apiService.interceptors.request.use(
  async (config) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      config.headers['Authorization'] = `Bearer ${token}`;
      // const token = await getToken();
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log('Auth failed', error);
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response?.data || {},
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

export default apiService;
