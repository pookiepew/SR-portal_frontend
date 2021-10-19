import axios from 'axios';

export let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_PROD_BACKEND_URL;
}

if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.REACT_APP_DEV_BACKEND_URL;
}

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default API;
