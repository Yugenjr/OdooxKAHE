import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation header will be added here */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="container-custom flex h-16 items-center justify-between">
          <div className="text-xl font-bold">Traveloop</div>
          <div>{/* Navigation links will be added here */}</div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer will be added here */}
    </div>
  )
}
