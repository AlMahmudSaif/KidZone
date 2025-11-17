//src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isKidMode, setIsKidMode] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setError(null)
      const userData = await authService.getCurrentUser()
      if (userData) {
        setUser(userData)
        setIsKidMode(userData.mode === 'kid')
      } else {
        setUser(null)
        setIsKidMode(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      setIsKidMode(false)
      // Don't set error for initial auth check to avoid showing errors on load
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)
      setUser(response.user)
      setIsKidMode(response.user.mode === 'kid')
      return response
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authService.register(userData)
      setUser(response.user)
      setIsKidMode(response.user.mode === 'kid')
      return response
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await authService.logout()
      setUser(null)
      setIsKidMode(false)
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local state
      setUser(null)
      setIsKidMode(false)
    }
  }

  const enterKidMode = async (pin) => {
    try {
      setError(null)
      const response = await authService.switchToKidMode(pin)
      await checkAuthStatus()
      return response
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to enter kid mode')
      throw error
    }
  }

  const exitKidMode = async (pin) => {
    try {
      setError(null)
      const response = await authService.switchToParentMode(pin)
      await checkAuthStatus()
      return response
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to exit kid mode')
      throw error
    }
  }

  const clearError = () => setError(null)

  const value = {
    user,
    login,
    register,
    logout,
    isKidMode,
    enterKidMode,
    exitKidMode,
    loading,
    error,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
