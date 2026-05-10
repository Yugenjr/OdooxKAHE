/**
 * Common constants for the application
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const ROUTES = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',

  // App
  DASHBOARD: '/dashboard',
  TRIPS: '/trips',
  TRIPS_CREATE: '/trips/create',
  TRIPS_DETAIL: (id: string) => `/trips/${id}`,

  // Profile
  PROFILE: '/profile',
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
} as const
