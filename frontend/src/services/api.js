//services/api.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://kidzone-backend.onrender.com/api'

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // Using headers instead of cookies
})

// Request interceptor - ADD TOKEN TO HEADERS
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request headers');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// Response interceptor - SAVE TOKEN FROM LOGIN/REGISTER
API.interceptors.response.use(
  (response) => {
    // If login/register successful, save token
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token saved to localStorage');
    }
    return response;
  },
  (error) => {
    // If unauthorized, remove token
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      console.log('Token removed due to 401 error');
      // Optional: redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)

export default API;
