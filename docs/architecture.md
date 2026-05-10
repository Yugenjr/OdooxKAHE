# Architecture & System Design

This document explains the high-level system design, technology decisions, and architecture of OdooxKAHE.

---

## System Overview

OdooxKAHE is a full-stack travel planning platform with:
- **Frontend:** Vite + React + TypeScript (modern, fast development)
- **Backend:** Node.js + Express (assumed from package.json)
- **State Management:** React Query via QueryProvider pattern
- **Styling:** Tailwind CSS
- **Build:** Vite with Hot Module Replacement

---

## Architecture Diagram

```mermaid
graph TB
  Browser["🌐 Browser"]
  Frontend["Frontend Layer\n(React + Vite + TS)"]
  API["API Gateway"]
  Backend["Backend Services\n(Node.js + Express)"]
  DB["Database\n(PostgreSQL/MongoDB)"]
  
  Browser -->|HTTP/REST| Frontend
  Frontend -->|REST API| API
  API --> Backend
  Backend --> DB
  
  style Frontend fill:#3b82f6,color:#fff
  style Backend fill:#ec4899,color:#fff
  style DB fill:#f59e0b,color:#fff
```

---

## Tech Stack Decisions

### Why Vite + React?

**Vite:**
- ⚡ Near-instant dev server startup
- 🔥 Hot Module Replacement (HMR) for instant feedback
- 📦 Smaller production bundles
- ✨ Native ES modules in dev

**React + TypeScript:**
- 💪 Strong type safety
- 🧩 Component-based architecture
- 📚 Massive ecosystem
- ♻️ Reusable UI logic with hooks

### Why React Query (QueryProvider)?

**Instead of Redux/Zustand:**
- ✅ Automatic caching and refetching
- ✅ Built-in optimistic UI support
- ✅ Handles stale data automatically
- ✅ Request deduplication
- ✅ Less boilerplate

**Server state vs. UI state:**
- React Query manages server data (API responses)
- Component hooks manage local UI state
- Much cleaner separation of concerns

### Why Node.js + Express Backend?

- ✅ JavaScript/TypeScript across full stack
- ✅ Fast REST API development
- ✅ Rich middleware ecosystem
- ✅ Async/await support
- ✅ Easy authentication (JWT, OAuth)

---

## Data Flow at a Glance

```mermaid
sequenceDiagram
  participant User
  participant React
  participant ReactQuery as React Query
  participant API
  participant Backend
  participant DB
  
  User->>React: Click "Save Trip"
  React->>ReactQuery: Execute mutation
  ReactQuery->>API: POST /api/trips
  API->>Backend: Route to trip service
  Backend->>DB: Insert trip
  DB-->>Backend: Confirm
  Backend-->>API: Return trip data
  API-->>ReactQuery: Success response
  ReactQuery-->>React: Update cache
  React-->>User: Show success
```

---

## API Integration Pattern

All API calls follow this flow:

1. **Page Component** → Calls React Query hook
2. **Hook** → Calls `apiService.method()`
3. **apiService** → Makes HTTP request with auth headers
4. **Backend** → Processes and returns data
5. **React Query** → Caches response automatically
6. **Component** → Re-renders from cache

**Centralized in:** `frontend/src/shared/services/apiService.ts`

---

## Next Steps

- **Setup & Development:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Frontend Architecture:** [FRONTEND.md](FRONTEND.md)
- **Backend Services:** [BACKEND.md](BACKEND.md)
- **API Reference:** [API.md](API.md)

---

## System Overview

OdooxKAHE is a travel-planning web application enabling users to discover activities, build multi-day itineraries, and share trips with friends.

**Key Technology Stack:**
- Frontend: Vite + React + TypeScript
- Backend: Node.js (Express) API
- State Management: QueryProvider (React Query or similar)
- Shared Types: `frontend/src/shared`

**High-level Architecture:**

```mermaid
flowchart TD
  subgraph Frontend
    F1[Landing and Search]
    F2[Trip Builder]
    F3[Profile and Saved Trips]
  end

  subgraph Backend
    B1[API Layer]
    B2[Auth Service]
    B3[Trip Service]
  end

  User --> F1
  F1 --> F2
  F2 -->|REST or GraphQL| B1
  B1 --> B2
  B1 --> B3
  B3 --> DB[(Database or External APIs)]
```

---

## App Component Hierarchy

The React app is structured with global providers and layout wrappers shared across all pages:

```mermaid
graph TD
  App[App Root]

  App --> Providers[QueryProvider]
  App --> Layout[Navbar and Sidebar Layout]

  Layout --> Landing[Landing Page]
  Layout --> Search[Search Activities]
  Layout --> CitySearch[City Search]
  Layout --> ActivityDetail[Activity Detail]
  Layout --> TripBuilder[Trip Builder]
  Layout --> Itinerary[Itinerary Page]
  Layout --> MyTrips[My Trips]
  Layout --> Profile[Profile and Notes]
  Layout --> Auth[Auth Pages]

  Providers --> API[apiService]
  API --> Backend[(Backend API)]
```

**Key Components:**

- **App Root** — Bootstraps the entire application and registers global providers
- **QueryProvider** — Manages data fetching, caching, and mutations; handles global error states
- **Navbar + Sidebar Layout** — Persistent navigation wrappers shared across all pages
- **Pages** — Individual route modules organized by feature (landing, auth, trips, activities, dashboard, etc.)
- **apiService** — Centralized HTTP client used by all pages and the query provider for backend communication

---

## Pages & Responsibilities

### Public Pages (No Authentication Required)

| Page | Location | Purpose |
|------|----------|---------|
| **Landing** | `modules/landing` | Marketing hub, feature highlights, call-to-action for signup/login |
| **Search** | `modules/activities/ActivitySearchPage` | Full-text search, filters, results list for activities |
| **City Search** | `modules/activities/CitySearchPage` | City-focused discovery and browse experience |
| **Activity Detail** | `shared/detail components` | Full activity info, images, availability, Add to trip action |

### Authenticated Pages (Auth Required)

| Page | Location | Purpose |
|------|----------|---------|
| **Trip Builder** | `modules/trips/CreateTripPage` | Compose itineraries: add, reorder, organize activities by day/time |
| **Itinerary** | `modules/itinerary/ItineraryPage` | Review, finalize, and export day-by-day plans |
| **My Trips** | `modules/trips/MyTripsPage` | List of saved trips; edit, duplicate, delete, or share |
| **Profile / Notes** | `modules/profile/pages/*` | User settings, packing lists, trip notes, manage shared trips |
| **Dashboard** | `modules/dashboard/pages/*` | Curated suggestions, analytics, and trip recommendations |

### Auth Module

| Page | Location | Purpose |
|------|----------|---------|
| **Login** | `modules/auth/LoginPage` | User authentication with optional social login |
| **Signup** | `modules/auth/SignupPage` | New account creation |

---

## User Navigation Flows

### Flow 1: High-Level Journey (Discovery → Save)

```mermaid
flowchart TD
  subgraph Public
    L[Landing]
    S[Search]
    C[City Search]
    D[Activity Detail]
  end

  subgraph Auth
    Login[Login or Signup]
    Builder[Trip Builder]
    Itin[Itinerary]
    MyTrips[My Trips]
    Profile[Profile and Notes]
  end

  L --> S
  L --> C
  S --> D
  C --> D
  D -->|Add to trip| CheckAuth{Authenticated?}
  CheckAuth -->|no| Login
  CheckAuth -->|yes| Builder
  Login --> Builder
  Builder --> Itin
  Itin --> MyTrips
  MyTrips --> Profile
  Profile --> MyTrips

  %% shortcuts
  Navbar[Navbar] -.-> S
  Navbar -.-> MyTrips
  Navbar -.-> Profile

  style Login fill:#fff2cc,stroke:#cc9a00
  style Builder fill:#e6f7ff,stroke:#40a9ff
```

**Key Insights:**
- Public pages allow exploration without authentication
- Adding to a trip triggers auth gate if not logged in
- After login, user is returned to the Trip Builder
- Navbar provides shortcuts to major sections

### Flow 2: Detailed User Journey (Landing → Trip Saved)

```mermaid
flowchart TD
  L[Landing] -->|Explore| S[Search]
  L -->|Discover Cities| C[City Search]

  S --> D[Activity Detail]
  C --> D

  D -->|Try Add to Trip| CheckAuth{Logged in?}

  CheckAuth -->|No| Login[Login or Signup]
  CheckAuth -->|Yes| Builder[Trip Builder]

  Login -->|Redirect back| Builder

  Builder -->|Organize| Itin[Itinerary]

  Itin -->|Save| MyTrips[My Trips]

  MyTrips -->|Edit| Builder
  MyTrips -->|View| Itin

  MyTrips --> Profile[Profile and Notes]
  Profile --> MyTrips
```

**Flow Description:** User begins with discovery, views activity details, attempts to add to trip (auth required), builds itinerary, saves trip, and can revisit/edit later.

### Flow 3: Add-to-Trip Modal (Optimistic Updates)

```mermaid
flowchart TD
  D[Activity Detail] --> OpenModal[Open Add to Trip Modal]
  OpenModal --> ChooseDay[Choose day or create new]
  ChooseDay --> ChooseTime[Choose time slot]
  ChooseTime --> Confirm[Confirm add]
  Confirm -->|optimistic| Builder[Update Trip Builder UI]
  Builder --> Persist[Persist in background]
  Persist -->|success| SuccessToast[Show success]
  Persist -->|fail| UndoOption[Show undo or retry]
```

**Pattern:** Uses optimistic UI updates (show change immediately) while syncing to backend in background. Failures are rollable.

### Flow 4: Trip Builder Operations (Composition)

```mermaid
flowchart TD
  Start[Open Trip Builder]

  Start --> LoadTrip[Load Existing Trip or Create New]

  LoadTrip --> AddActivity[Add Activity]

  AddActivity --> ChooseDay[Select Day]
  ChooseDay --> ChooseTime[Select Time Slot]

  ChooseTime --> SaveTemp[Optimistic UI Update]

  SaveTemp --> SyncAPI[Sync with Backend]

  SyncAPI -->|Success| Continue[Continue]
  SyncAPI -->|Fail| Rollback[Undo Changes]

  Continue --> Reorder[Drag to Reorder]
  Reorder --> SaveFinal[Save Itinerary]

  SaveFinal --> ItineraryPage[Go to Itinerary]
```

**Features:**
- Load or create new trips
- Add activities with day/time selection
- Optimistic updates with background sync
- Drag-and-drop reordering
- Save and finalize itineraries

### Flow 5: Auth Redirect Pattern

```mermaid
flowchart TD
  Action[Protected Action] --> IsAuth{Is authenticated?}
  IsAuth -->|yes| Proceed[Proceed with action]
  IsAuth -->|no| SaveState[Save attempted action]
  SaveState --> Auth[Show Login or Signup]
  Auth --> Callback[On success restore state]
  Callback --> Proceed
```

**Benefit:** Users don't lose context when forced to authenticate. After login, they're returned to complete their original action.

### Flow 6: Save & Export

```mermaid
flowchart TD
  Itin[Itinerary Page] --> Export[Choose export method]
  Export --> PDF[Export PDF]
  Export --> Link[Create shareable link]
  Export --> Email[Send via email]
  Link --> Shorten[Shorten link]
  Link --> Track[Track share clicks]
```

---

## Data & API Flows

### Frontend-to-Backend Data Flow

```mermaid
sequenceDiagram
  participant UI as Page UI
  participant Query as QueryProvider
  participant API as apiService
  participant Server as Backend

  UI->>Query: Request data (activities/trips)
  Query->>API: Fetch request
  API->>Server: HTTP call
  Server-->>API: Response
  API-->>Query: Data
  Query-->>UI: Cached result

  UI->>Query: Mutate (Add to Trip)
  Query->>API: POST /trip
  API->>Server: Save trip
  Server-->>API: Success
  API-->>Query: Response
  Query-->>UI: Optimistic update
```

**Key Pattern:**
- Queries are cached and reused
- Mutations trigger optimistic UI updates
- Background sync ensures data consistency
- Global error handling through QueryProvider

### API Endpoints by Page

Each frontend page depends on specific backend endpoints:

```mermaid
graph TD
  Search -->|GET activities| ActivitiesAPI
  CitySearch -->|GET cities| ActivitiesAPI
  ActivityDetail -->|GET activity| ActivityAPI

  TripBuilder -->|POST or PATCH trips| TripAPI
  Itinerary -->|GET trip| TripAPI
  MyTrips -->|GET trips| TripAPI

  Profile -->|GET or PATCH user| UserAPI
  Auth -->|POST login or signup| AuthAPI
```

### Persistent Navigation

```mermaid
graph LR
  Navbar[Navbar]
  Sidebar[Sidebar]

  Navbar --> Search[Search]
  Navbar --> MyTrips[My Trips]
  Navbar --> Profile[Profile]
  Navbar --> Dashboard[Dashboard]

  Sidebar --> MyTrips
  Sidebar --> Builder[Trip Builder]
  Sidebar --> Itinerary[Itinerary]
```

**Purpose:** Users can jump between major sections without losing current work. Both Navbar and Sidebar provide quick access to frequently used pages.

---

## Technical Patterns

### 1. Optimistic UI Updates

When users add activities or make changes:
1. Immediately update the UI (optimistic)
2. Send mutation to backend
3. On success: keep UI as-is
4. On failure: rollback UI and show error

**Benefit:** Perceived responsiveness, better UX

### 2. Global Query Caching

The QueryProvider caches all API responses:
- Repeated queries return cached data without re-fetching
- Mutations invalidate related caches for consistency
- Reduces network traffic and improves performance

### 3. Auth-Protected Flows

Protected actions (Add to Trip, Save) require authentication:
1. Check authentication state
2. If unauthenticated: save action context and show login
3. After auth: resume original action

**Benefit:** Seamless experience, no context loss

### 4. Separation of Concerns

- **Pages** handle routing and user interactions
- **QueryProvider** manages data and state
- **apiService** handles HTTP communication
- **Components** are reusable and composable

---

## Component Responsibilities

- `QueryProvider` (providers/QueryProvider.tsx) — Central data fetching, caching, mutations, error handling
- `Navbar`, `Sidebar` (components) — Persistent navigation and quick access
- `apiService` (services/apiService.ts) — Unified HTTP client
- `shared/types` — Data contracts shared between frontend and backend
- `shared/hooks` — Custom React hooks for common patterns

---

**For setup and development instructions, see [GETTING_STARTED.md](GETTING_STARTED.md).**
