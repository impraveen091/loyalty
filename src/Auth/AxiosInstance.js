import axios from 'axios';
import {Base_url} from '../../services/Api';
import {getToken, getUserData, refreshToken, removeToken} from './Auth';
import {userid, username} from '../constants/Constants';
import {navigationRef} from '../../App';

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
    console.log('error', error.response.status);
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      await removeToken();
      if (navigationRef.isReady()) {
        navigationRef.navigate('Signin');
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
