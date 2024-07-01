// Api.js
import axios from 'axios';
import {getToken, getUserData} from '../src/Auth';

export const Base_url = 'http://194.238.17.185:3003/api/';

const getHeaders = async () => {
  const token = await getToken();
  const userData = await getUserData();

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    if (userData?.super_admin === false) {
      if (userData && userData.Tenant.username) {
        headers['x-username'] = userData.Tenant.username;
      }
      if (userData && userData.Tenant.id) {
        headers['x-tenant-id'] = userData.Tenant.id;
      }
    }
  } else {
    headers['x-username'] = 'bigleap';
    headers['x-tenant-id'] = 1;
  }

  return headers;
};

export const getData = async url => {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${Base_url}${url}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (url, payload) => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${Base_url}${url}`, payload, {headers});
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const putData = async (url, payload) => {
  try {
    const headers = await getHeaders();
    const response = await axios.put(`${Base_url}${url}`, payload, {headers});
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
};

export const deleteData = async url => {
  try {
    const headers = await getHeaders();
    const response = await axios.delete(`${Base_url}${url}`, {headers});
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
