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
import LandingPage from '@/modules/landing/LandingPage'
import CitySearchPage from '@/modules/activities/pages/CitySearchPage'
import ActivitySearchPage from '@/modules/activities/pages/ActivitySearchPage'
import ItineraryPage from '@/modules/itinerary/pages/ItineraryPage'
import BudgetPage from '@/modules/budget/pages/BudgetPage'
import PackingPage from '@/modules/profile/pages/PackingPage'
import NotesPage from '@/modules/profile/pages/NotesPage'
import SharedTripsPage from '@/modules/profile/pages/SharedTripsPage'
import ProfilePage from '@/modules/profile/pages/ProfilePage'

// Main app routes
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
  {
    path: 'city-search',
    element: <CitySearchPage />,
  },
  {
    path: 'activity-search',
    element: <ActivitySearchPage />,
  },
  {
    path: 'shared-trips',
    element: <SharedTripsPage />,
  },
  {
    path: 'itinerary',
    element: <ItineraryPage />,
  },
  {
    path: 'budget',
    element: <BudgetPage />,
  },
  {
    path: 'packing',
    element: <PackingPage />,
  },
  {
    path: 'notes',
    element: <NotesPage />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
]

// All routes
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
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      </div>
    ),
  },
]

export const router = createBrowserRouter(routes)
