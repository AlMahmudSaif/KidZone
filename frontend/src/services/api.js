//services/api.js

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://kidzone-backend.onrender.com/api'

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

// Request interceptor - ADD TOKEN TO HEADERS AS FALLBACK
API.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage as fallback
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// Response interceptor - SAVE TOKEN FROM RESPONSE
API.interceptors.response.use(
  (response) => {
    // If login/register successful, you might want to save token in localStorage as backup
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default API;
