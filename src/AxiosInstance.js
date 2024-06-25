import axios from 'axios';
import {Base_url} from '../services/Api';
import {getToken, getUserData, refreshToken, removeToken} from './Auth';

const axiosInstance = axios.create({
  baseURL: Base_url,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken();
    const userData = await getUserData();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      if (userData?.super_admin === false) {
        if (userData && userData.Tenant.username) {
          config.headers['x-username'] = userData.Tenant.username;
        }
        if (userData && userData.Tenant.id) {
          config.headers['x-tenant-id'] = userData.Tenant.id;
        }
      }
    } else {
      config.headers['x-username'] = 'runolfssoninc';
      config.headers['x-tenant-id'] = 1;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        await removeToken();
        // handle redirection to login page
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
