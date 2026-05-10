import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { router } from '@/app/router/routes'
import MyTripsPage from './modules/trips/pages/MyTripsPage'
import '@/index.css'

const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
