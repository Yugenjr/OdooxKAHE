import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { useAuthStore } from '@/store/authStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 10000

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, config = {}) {
    return this.api.get<T>(url, config)
  }

  public post<T>(url: string, data?: unknown, config = {}) {
    return this.api.post<T>(url, data, config)
  }

  public put<T>(url: string, data?: unknown, config = {}) {
    return this.api.put<T>(url, data, config)
  }

  public delete<T>(url: string, config = {}) {
    return this.api.delete<T>(url, config)
  }

  public patch<T>(url: string, data?: unknown, config = {}) {
    return this.api.patch<T>(url, data, config)
  }
}

export const apiService = new ApiService()
