import axios from 'axios';

const BASE_URL = 'http://127.O.0.1:8000/';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


export const streamDb = axios.create({
    baseURL: 'http://localhost:3001',
});


