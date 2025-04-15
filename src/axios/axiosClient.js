import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {

    // Only set JSON content-type if it's not FormData
    if (
      config.data &&
      !(config.data instanceof FormData) &&
      !config.headers['Content-Type']
    ) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - maybe redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
