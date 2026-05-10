import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    email: string
    name: string
  } | null
  token: string | null
  setUser: (user: AuthState['user']) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        setUser: (user) =>
          set(() => ({
            user,
            isAuthenticated: !!user,
          })),
        setToken: (token) =>
          set(() => ({
            token,
          })),
        logout: () =>
          set(() => ({
            isAuthenticated: false,
            user: null,
            token: null,
          })),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)
