import axios from 'axios';

export let backendBaseUrl;
export let backendSocketUrl;

if (process.env.NODE_ENV === 'production') {
  backendBaseUrl = process.env.REACT_APP_PROD_BACKEND_ENDPOINT;
  backendSocketUrl = process.env.REACT_APP_PROD_SOCKET_ENDPOINT;
}

if (process.env.NODE_ENV === 'development') {
  backendBaseUrl = process.env.REACT_APP_DEV_BACKEND_ENDPOINT;
  backendSocketUrl = process.env.REACT_APP_DEV_SOCKET_ENDPOINT;
}

const API = axios.create({
  baseURL: backendBaseUrl,
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
