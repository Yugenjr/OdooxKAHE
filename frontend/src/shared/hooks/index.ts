/**
 * Custom hooks for the application
 */

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  return useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])
}

export const useAuth = () => {
  const authState = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    setUser: state.setUser,
    setToken: state.setToken,
    logout: state.logout,
  }))

  return authState
}
