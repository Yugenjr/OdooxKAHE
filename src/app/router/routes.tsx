import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout'

import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { SignupPage } from '@/modules/auth/pages/SignupPage'

import { DashboardPage } from '@/modules/dashboard/pages/DashboardPage'

import { InspirationPage } from '@/modules/dashboard/pages/InspirationPage'


import { MyTripsPage } from '@/modules/trips/pages/MyTripsPage'
import { CreateTripPage } from '@/modules/trips/pages/CreateTripPage'

import LandingPage from '@/landing/LandingPage'

// Main App Routes
const appRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <DashboardPage />,
  },

  {
    path: 'inspiration',
    element: <InspirationPage />,
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

// All Routes
const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },

  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

  {
    path: '/signup',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignupPage />,
      },
    ],
  },

  {
    path: '/app',
    element: <MainLayout />,
    children: appRoutes,
  },

  {
    path: '*',
    element: (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">
          404 - Page Not Found
        </h1>
      </div>
    ),
  },
]

export const router = createBrowserRouter(routes)