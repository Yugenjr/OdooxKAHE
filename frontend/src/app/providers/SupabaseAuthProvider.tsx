import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    let mounted = true

    const syncSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!mounted || error) {
        return
      }

      const session = data.session

      if (!session?.user) {
        logout()
        return
      }

      setUser({
        id: session.user.id,
        email: session.user.email || '',
        name:
          session.user.user_metadata?.name ||
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'Traveler',
      })
      setToken(session.access_token)
    }

    syncSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return
      }

      if (!session?.user) {
        logout()
        return
      }

      setUser({
        id: session.user.id,
        email: session.user.email || '',
        name:
          session.user.user_metadata?.name ||
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'Traveler',
      })
      setToken(session.access_token)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [logout, setToken, setUser])

  return <>{children}</>
}