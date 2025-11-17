//services/api.js

import axios from 'axios'

// Use environment variable or fallback to production URL
const BASE_URL = import.meta.env.VITE_API_URL || 'https://kidzone-backend.onrender.com/api'

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

// Request interceptor
API.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - REMOVE automatic redirect
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't automatically redirect - let components handle auth errors
    return Promise.reject(error)
  }
)

export default API
