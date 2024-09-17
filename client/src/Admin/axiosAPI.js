import axios from 'axios';
import Cookies from "js-cookie";

// Create the axios instance with the base URL
const baseURL = 'http://localhost:1234/';
const axiosAPI = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor to add token to headers
axiosAPI.interceptors.request.use(
  (config) => {
    const token = Cookies.get('Bearer');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
export const setupInterceptors = (updateUser) => {
  axiosAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axiosAPI.get('refresh');
          const newAccessToken = response.data.accessToken;
          const user = response.data.user;
          Cookies.remove("Bearer");
          Cookies.set('Bearer', newAccessToken);
          updateUser({
            user,
            token: newAccessToken
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosAPI(originalRequest);
        } catch (error) {
          console.error('Refresh token failed', error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosAPI;
