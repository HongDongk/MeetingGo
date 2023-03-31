import axios from 'axios';
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from '../config/constants';

const setupToken = (config) => {
  const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
  if (!accessToken) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

/** @type {import('axios').AxiosStatic} */
const backend = {
  get(url, config) {
    return axios.get(API_URL + url, setupToken(config));
  },
  post(url, data, config) {
    return axios.post(API_URL + url, data, setupToken(config));
  },
  put(url, data, config) {
    return axios.put(API_URL + url, data, setupToken(config));
  },
  patch(url, data, config) {
    return axios.patch(API_URL + url, data, setupToken(config));
  },
  delete(url, config) {
    return axios.delete(API_URL + url, setupToken(config));
  },
};

export default backend;
