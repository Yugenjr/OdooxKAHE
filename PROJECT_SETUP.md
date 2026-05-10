# Traveloop - React + TypeScript + Vite

A professional, scalable, and production-ready frontend project setup with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 8** - Build tool & dev server
- **React Router v7** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **TanStack Query v5** - Server state management
- **TailwindCSS** - Utility-first CSS
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── app/                          # Application core
│   ├── router/
│   │   └── routes.tsx           # Centralized route configuration
│   ├── providers/
│   │   └── QueryProvider.tsx    # React Query provider setup
│   └── layouts/
│       ├── AuthLayout.tsx       # Authentication layout
│       └── MainLayout.tsx       # Main app layout
│
├── modules/                      # Feature modules
│   ├── auth/
│   │   └── pages/
│   │       ├── LoginPage.tsx
│   │       └── SignupPage.tsx
│   ├── dashboard/
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   ├── trips/
│   │   └── pages/
│   │       ├── MyTripsPage.tsx
│   │       └── CreateTripPage.tsx
│   ├── itinerary/
│   ├── budget/
│   ├── activities/
│   └── profile/
│
├── shared/                       # Shared utilities & components
│   ├── components/              # Reusable components (TBD)
│   ├── hooks/
│   │   └── index.ts            # Custom hooks (useAuth, useLogout)
│   ├── services/
│   │   └── apiService.ts       # Axios instance with interceptors
│   ├── utils/
│   │   └── index.ts            # Utility functions
│   ├── constants/
│   │   └── index.ts            # App constants & routes
│   └── types/
│       └── index.ts            # TypeScript type definitions
│
├── store/                        # Zustand stores
│   └── authStore.ts            # Authentication state
│
├── styles/                       # Global styles (TBD)
├── App.tsx                       # Main App component
├── index.css                     # Global styles with Tailwind directives
└── main.tsx                      # Application entry point
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

```bash
# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Traveloop
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🎯 Features Implemented

### ✅ Core Setup
- [x] Vite + React + TypeScript configuration
- [x] Tailwind CSS with custom utilities
- [x] ESLint + Prettier configuration
- [x] TypeScript path aliases (@/)
- [x] Environment variables support

### ✅ State Management
- [x] Zustand store with auth state
- [x] Persistent storage middleware
- [x] DevTools integration

### ✅ API Integration
- [x] Axios instance with interceptors
- [x] Bearer token authorization
- [x] 401 auto-logout handling
- [x] Request/response interceptors

### ✅ Server State Management
- [x] TanStack Query provider setup
- [x] Default query configurations
- [x] Stale time & cache time settings

### ✅ Routing
- [x] React Router v7 configuration
- [x] Auth layout for authentication pages
- [x] Main layout for app pages
- [x] Centralized route configuration
- [x] 404 not found page

### ✅ Utilities
- [x] Custom hooks (useAuth, useLogout)
- [x] Utility functions (cn, formatDate, sleep, etc.)
- [x] Type definitions (User, ApiResponse, etc.)
- [x] Application constants (ROUTES, STORAGE_KEYS)

## 🎨 Tailwind CSS

### Configured Utilities

Custom component utilities available:

```tsx
<div className="container-custom">     {/* Main container */}
<button className="btn btn-primary">   {/* Primary button */}
<button className="btn btn-secondary"> {/* Secondary button */}
```

## 🔐 Authentication Flow

1. User logs in on `/login`
2. Auth store saves token and user info
3. Axios interceptor adds Bearer token to requests
4. 401 responses trigger logout and redirect to login
5. Auth state persists across page reloads

## 📝 TypeScript Path Aliases

```tsx
// Instead of:
import { apiService } from '../../../shared/services/apiService'

// Use:
import { apiService } from '@/shared/services/apiService'
```

## 🚦 Development Workflow

1. Create new features in `/modules` folder
2. Add types to `/shared/types`
3. Add utilities to `/shared/utils`
4. Add custom hooks to `/shared/hooks`
5. Create reusable components in `/shared/components`
6. Export from index files for clean imports

## 🧪 Code Quality

- ESLint checks for code quality issues
- Prettier ensures consistent formatting
- TypeScript provides type safety
- Path aliases keep imports clean

```bash
# Run linting
npm run lint

# Fix linting + format code
npm run lint:fix && npm run format
```

## 📦 Adding New Packages

```bash
# Add runtime dependency
npm install package-name

# Add dev dependency
npm install -D package-name

# For Tailwind/PostCSS plugins
npm install -D @tailwindcss/plugin-name
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Builds the app to the `dist` folder for production.

### Environment Setup

Update `.env.local` with production URLs before building.

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🎯 Next Steps

1. Create UI components in `/shared/components`
2. Build authentication pages (Login, Signup)
3. Implement API services for each module
4. Add animations and transitions
5. Setup error handling & notifications
6. Implement user authentication
7. Create dashboard features
8. Build trip management features

## 📝 Notes

- The project uses TypeScript strict mode
- All unused imports/variables will cause build errors
- Code must pass ESLint checks before committing
- Use absolute imports (@/) for better readability
- Keep components small and focused
- Use custom hooks for reusable logic

## 🤝 Contributing

Follow these guidelines:

1. Use TypeScript for all new code
2. Follow ESLint rules
3. Format code with Prettier before committing
4. Add proper type definitions
5. Use path aliases (@/) for imports
6. Keep components in the appropriate modules

---

**Version**: 1.0.0  
**Last Updated**: May 10, 2026  
**Status**: Ready for development 🚀
