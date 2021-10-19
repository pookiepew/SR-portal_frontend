import axios from 'axios';

export let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_BACKEND_URL;
}

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000';
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
