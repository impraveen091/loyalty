// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Base_url} from '../services/Api';

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Failed to save token:', error);
  }
};

export const saveUserData = async (dataKey, data) => {
  console.log(dataKey, data);
  try {
    await AsyncStorage.setItem(`${dataKey}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const getUserData = async dataKey => {
  try {
    const data = await AsyncStorage.getItem(`${dataKey}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    console.error('Failed to get token:', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${Base_url}/refresh-token`,
      {},
      {withCredentials: true},
    );
    const {accessToken} = response.data;
    await saveToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};
