# Traveloop - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Setup Local Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 2. Start Development Server

```bash
npm run dev
```

Server runs at: `http://localhost:5173/`

### 3. Start Building Features

Open `src/modules/` and start creating features!

---

## 📋 Common Tasks

### Create a New Page Component

```tsx
// src/modules/feature-name/pages/FeaturePage.tsx
import React from 'react'

export const FeaturePage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Feature Title</h1>
      {/* Page content */}
    </div>
  )
}
```

### Create a Custom Hook

```tsx
// src/shared/hooks/useFeature.ts
import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/shared/services/apiService'

export const useFeature = () => {
  return useQuery({
    queryKey: ['feature'],
    queryFn: () => apiService.get('/feature'),
  })
}
```

### Create a Zustand Store

```tsx
// src/store/featureStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FeatureState {
  data: string
  setData: (data: string) => void
}

export const useFeatureStore = create<FeatureState>()(
  devtools(
    persist((set) => ({
      data: '',
      setData: (data) => set(() => ({ data })),
    }), {
      name: 'feature-storage',
    })
  )
)
```

### Add a New Route

Edit `src/app/router/routes.tsx`:

```tsx
import { NewPage } from '@/modules/new-module/pages/NewPage'

// Add to appRoutes array:
{
  path: 'new-route',
  element: <NewPage />,
}
```

### Use API Service

```tsx
import { apiService } from '@/shared/services/apiService'
import { useQuery } from '@tanstack/react-query'

export const useData = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: () => apiService.get('/data').then(res => res.data),
  })
}
```

### Access Auth State

```tsx
import { useAuth } from '@/shared/hooks'

export const Component = () => {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <div>
      {isAuthenticated && <p>Hello, {user?.name}!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Style with Tailwind

```tsx
<div className="flex flex-col gap-4">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
  <p className="text-gray-600">Description</p>
  <button className="btn btn-primary">Action</button>
</div>
```

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build          # Production build
npm run preview        # Preview prod build

# Code Quality
npm run lint           # Check for issues
npm run lint:fix       # Fix linting issues
npm run format         # Format code

# Type Checking
npx tsc               # Check TypeScript types
npx tsc --watch       # Watch mode
```

---

## 📁 Where to Put Things

| Item | Location |
|------|----------|
| Pages | `src/modules/[module]/pages/` |
| Components | `src/shared/components/` (for reusables) or `src/modules/[module]/components/` |
| Hooks | `src/shared/hooks/` |
| Stores | `src/store/` |
| Services | `src/shared/services/` |
| Types | `src/shared/types/` |
| Constants | `src/shared/constants/` |
| Utils | `src/shared/utils/` |

---

## 🔄 Development Workflow

1. **Create feature** in appropriate module
2. **Add types** for data structures
3. **Create API service** for backend calls
4. **Create custom hook** for data fetching
5. **Build UI components** using Tailwind
6. **Add route** to router configuration
7. **Test** with `npm run dev`
8. **Lint & format** with `npm run lint:fix && npm run format`

---

## 🐛 Troubleshooting

### Port 5173 already in use

```bash
# Kill the process using the port or use a different port:
npm run dev -- --port 5174
```

### ESLint errors

```bash
npm run lint:fix
```

### Module not found

- Check path alias is correct (starts with `@/`)
- Verify file path exists
- Clear node_modules and reinstall

### TypeScript errors

- Check types are properly imported
- Verify `tsconfig.json` path aliases
- Use `npx tsc` to see all errors

---

## 🎓 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/docs
- React Query: https://tanstack.com/query/latest
- Zustand: https://github.com/pmndrs/zustand

---

## ✨ Pro Tips

1. Use `@/` prefix for all imports from src
2. Keep components small and focused
3. Use TypeScript strict mode
4. Export index files for clean imports
5. Add proper error handling
6. Use custom hooks for reusable logic
7. Keep API logic separate from UI
8. Test components while developing

---

Happy coding! 🚀
