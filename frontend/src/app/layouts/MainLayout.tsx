import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/app/components/Sidebar'

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 overflow-x-hidden">
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
