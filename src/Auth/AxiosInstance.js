import axios from 'axios';
import {Base_url} from '../../services/Api';
import {getToken, getUserData, refreshToken, removeToken} from './Auth';
import {userid, username} from '../constants/Constants';

const axiosInstance = axios.create({
  baseURL: Base_url,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken();
    const userData = await getUserData();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-username'] = username;
      config.headers['x-tenant-id'] = userid;
    } else {
      config.headers['x-username'] = username;
      config.headers['x-tenant-id'] = userid;
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
