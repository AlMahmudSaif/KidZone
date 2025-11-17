//services/authService.js
import API from './api'

export const authService = {
  async login(email, password) {
    const response = await API.post('/auth/login', { email, password })
    return response.data
  },

  async register(userData) {
    const response = await API.post('/auth/register', userData)
    return response.data
  },

  async logout() {
    // Remove token from storage first
    localStorage.removeItem('token')
    const response = await API.post('/auth/logout')
    return response.data
  },

  async getCurrentUser() {
    try {
      const response = await API.get('/auth/me')
      return response.data.user
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token') // Clear invalid token
        return null
      }
      throw error
    }
  },

  async switchToKidMode(pin) {
    const response = await API.post('/parents/switch-to-kid-mode', { pin })
    return response.data
  },

  async switchToParentMode(pin) {
    const response = await API.post('/parents/switch-to-parent-mode', { pin })
    return response.data
  },

  // Helper to check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token')
  },

  // Helper to get token
  getToken() {
    return localStorage.getItem('token')
  },

  // Helper to clear token (for logout)
  clearToken() {
    localStorage.removeItem('token')
  }
}
