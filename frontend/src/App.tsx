import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { SupabaseAuthProvider } from '@/app/providers/SupabaseAuthProvider'
import { router } from '@/app/router/routes'
import '@/index.css'

const App: React.FC = () => {
  return (
    <QueryProvider>
      <SupabaseAuthProvider>
        <RouterProvider router={router} />
      </SupabaseAuthProvider>
    </QueryProvider>
  )
}

export default App
