# Traveloop Backend Setup Guide

## Overview
This document guides you through setting up the Traveloop backend with Supabase PostgreSQL database and modular service architecture.

## Architecture Overview

The backend follows a modular service architecture with the following structure:

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts         # Supabase client configuration
│   ├── middleware/
│   │   └── auth.ts             # JWT authentication middleware
│   ├── utils/
│   │   └── index.ts            # Helper functions
│   ├── modules/
│   │   ├── auth/               # Authentication module
│   │   ├── trips/              # Trip management
│   │   ├── itinerary/          # Itinerary/Stops management
│   │   ├── activities/         # Activities management
│   │   ├── budget/             # Budget/Expenses tracking
│   │   ├── packing/            # Packing checklist
│   │   ├── profile/            # User profile & preferences
│   │   ├── notes/              # Trip notes/journal
│   │   └── cities/             # City search
│   └── server.ts               # Main server file
├── DATABASE_SETUP.sql          # SQL schema for Supabase
├── .env.example                # Environment variables template
└── package.json
```

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install express cors dotenv jsonwebtoken @supabase/supabase-js
npm install --save-dev typescript @types/express @types/node nodemon ts-node
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project with PostgreSQL
3. Wait for the database to be initialized
4. Go to **Project Settings** → **API**
5. Copy:
   - `Project URL` → `SUPABASE_URL`
   - `anon` key → `SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Setup Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the entire content from `DATABASE_SETUP.sql`
4. Run the SQL script to create all tables, indexes, and RLS policies

**Note:** This automatically creates:
- User tables with Row Level Security (RLS)
- All module-specific tables
- Indexes for performance
- Sample city data
- Triggers for `updated_at` timestamps

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   PORT=3001
   NODE_ENV=development
   ```

### 5. Install TypeScript Configuration

Create `tsconfig.json` in the backend root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 6. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 7. Start the Development Server

```bash
npm run dev
```

You should see:
```
✅ Traveloop API running on http://localhost:3001
📚 API Documentation:
   - Authentication: POST /api/auth/*
   - Trips: /api/trips
   - Itinerary: /api/itinerary
   - Activities: /api/activities
   - Budget: /api/budget
   - Packing: /api/packing
   - Profile: /api/profile
   - Notes: /api/notes
   - Cities: /api/cities
```

## API Endpoints Summary

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Trips
- `POST /api/trips` - Create trip
- `GET /api/trips` - Get all user's trips
- `GET /api/trips/:tripId` - Get trip details
- `PUT /api/trips/:tripId` - Update trip
- `DELETE /api/trips/:tripId` - Delete trip

### Itinerary
- `POST /api/itinerary/:tripId/stops` - Add stop
- `GET /api/itinerary/:tripId/stops` - Get all stops
- `PUT /api/itinerary/:tripId/stops/:stopId` - Update stop
- `DELETE /api/itinerary/:tripId/stops/:stopId` - Delete stop
- `POST /api/itinerary/:tripId/reorder` - Reorder stops

### Activities
- `POST /api/activities/:stopId/activities` - Add activity
- `GET /api/activities/:stopId/activities` - Get activities for stop
- `PUT /api/activities/:stopId/activities/:activityId` - Update activity
- `DELETE /api/activities/:stopId/activities/:activityId` - Delete activity
- `GET /api/activities/search?q=query` - Search activities

### Budget
- `POST /api/budget/:tripId/expenses` - Add expense
- `GET /api/budget/:tripId/expenses` - Get expenses
- `PUT /api/budget/:tripId/expenses/:expenseId` - Update expense
- `DELETE /api/budget/:tripId/expenses/:expenseId` - Delete expense
- `GET /api/budget/:tripId/breakdown` - Get budget breakdown

### Packing
- `POST /api/packing/:tripId/packing` - Add packing item
- `GET /api/packing/:tripId/packing` - Get packing items
- `PUT /api/packing/:tripId/packing/:itemId` - Update item
- `DELETE /api/packing/:tripId/packing/:itemId` - Delete item

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `GET /api/profile/preferences` - Get preferences
- `PUT /api/profile/preferences` - Update preferences
- `GET /api/profile/destinations` - Get saved destinations
- `POST /api/profile/destinations` - Save destination

### Notes
- `POST /api/notes/:tripId/notes` - Add note
- `GET /api/notes/:tripId/notes` - Get notes
- `PUT /api/notes/:tripId/notes/:noteId` - Update note
- `DELETE /api/notes/:tripId/notes/:noteId` - Delete note

### Cities
- `GET /api/cities/search?q=query` - Search cities
- `GET /api/cities/popular` - Get popular cities
- `GET /api/cities/:cityId` - Get city details
- `GET /api/cities/country/:country` - Get cities by country

## Data Isolation & Security

### User Data Isolation
Every table includes a `user_id` field. The backend ensures:
- **Every query filters by `user_id`** to prevent users from accessing other users' data
- **Row Level Security (RLS)** is enabled on all tables
- **JWT authentication** validates user identity for every protected endpoint

### Example: Ensuring User Only Sees Own Trips
```typescript
// User can only see their own trips
const trips = await supabaseClient
  .from("trips")
  .select("*")
  .eq("user_id", userId)  // Always filter by user_id
  .order("created_at", { ascending: false });
```

### Authentication Flow
1. User logs in → Supabase Auth generates JWT token
2. Frontend sends JWT in `Authorization: Bearer {token}` header
3. Backend verifies JWT and extracts `user_id`
4. All queries include `.eq("user_id", userId)` filter
5. RLS policies enforce backend validation

## Connecting Frontend to Backend

### 1. Update Frontend API Service

Edit `frontend/src/shared/services/apiService.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiService;
```

### 2. Frontend Authentication Integration

```typescript
// Login
const response = await apiService.post('/auth/login', {
  email,
  password,
});
localStorage.setItem('auth_token', response.data.data.session.access_token);

// Get user data
const user = await apiService.get('/auth/me');

// Get user's trips
const trips = await apiService.get('/trips');
```

## Troubleshooting

### "SUPABASE_URL is required"
- Check your `.env` file has correct values
- Ensure `SUPABASE_URL` doesn't have `/` at the end

### "RLS policy violation"
- Ensure `user_id` is correctly passed
- Check that authenticated user has valid JWT token
- Verify RLS policies in Supabase dashboard

### "Connection refused on port 3001"
- Ensure backend is running with `npm run dev`
- Check if port 3001 is already in use
- Change PORT in `.env` if needed

### "User not authenticated"
- Verify JWT token is valid and not expired
- Check `Authorization` header is properly formatted: `Bearer {token}`
- Confirm token is stored in localStorage on frontend

## Next Steps

1. ✅ Backend services created for all modules
2. ✅ Database schema with RLS policies set up
3. ⏳ Connect frontend to backend APIs
4. ⏳ Build frontend components to call backend endpoints
5. ⏳ Test end-to-end data flow
6. ⏳ Deploy to production (Vercel for frontend, Railway/Render for backend)

## Production Deployment

### Backend Deployment Options:
- **Railway**: `railway.app` (recommended, simple deployment)
- **Render**: `render.com` (free tier available)
- **Heroku**: `heroku.com` (paid tier)

### Environment Variables for Production:
- Set `NODE_ENV=production`
- Use Supabase production database
- Enable CORS only for your frontend domain
- Use strong JWT secret

---

**Your backend is now ready! Connect it with your frontend and start building the Traveloop experience!** 🚀
