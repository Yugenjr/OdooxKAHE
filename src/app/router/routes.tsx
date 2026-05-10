import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { SignupPage } from '@/modules/auth/pages/SignupPage'
import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'
import { MyTripsPage } from '@/modules/trips/pages/MyTripsPage'
import { CreateTripPage } from '@/modules/trips/pages/CreateTripPage'
import LandingPage from '@/landing/LandingPage'

// Auth routes
const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignupPage />,
  },
]

// Main app routes
const appRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <DashboardPage />,
  },
  {
    path: 'trips',
    children: [
      {
        index: true,
        element: <MyTripsPage />,
      },
      {
        path: 'create',
        element: <CreateTripPage />,
      },
    ],
  },
]

// All routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: '/app',
    element: <MainLayout />,
    children: appRoutes,
  },
  {
    path: '*',
    element: (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      </div>
    ),
  },
]

export const router = createBrowserRouter(routes)
