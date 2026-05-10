# Backend

Location: `backend/`

Purpose

- Provide API endpoints for authentication, trip management, and integrations with external activity providers.
- Responsible for data validation, persistence, and business rules.

Core services

- Auth Service — user sessions, token management
- Trip Service — CRUD for trips and itineraries
- Integration Layer — adapters to third-party activity APIs

Request/response flow

```mermaid
sequenceDiagram
  participant F as Frontend
  participant B as Backend
  participant D as Database/External

  F->>B: POST /api/trips {trip payload}
  B->>D: store trip / call external APIs
  D-->>B: data / ack
  B-->>F: 201 Created (trip id)
```

Helpful notes

- Inspect `backend/package.json` for available scripts and environment variables.
- Look for `.env` or config files for database connection and API keys.

Data & contracts

- Shared types live in `frontend/src/shared/types` — use these as the source of truth for API payloads.

## Frontend-to-Backend Data Flow

The diagram below shows how data flows from the UI through the QueryProvider and apiService to the backend:

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

Caption: Queries are cached and reused; mutations trigger optimistic UI updates with background sync to the backend.

## API Endpoints by Page

Each frontend page depends on specific backend endpoints:

```mermaid
graph TD
  Search -->|"GET /api/activities"| ActivitiesAPI
  CitySearch -->|"GET /api/cities"| ActivitiesAPI
  ActivityDetail -->|"GET /api/activities/:id"| ActivityAPI

  TripBuilder -->|"POST/PATCH /api/trips"| TripAPI
  Itinerary -->|"GET /api/trips/:id"| TripAPI
  MyTrips -->|"GET /api/trips"| TripAPI

  Profile -->|"GET/PATCH /api/users/:id"| UserAPI
```

Caption: Use this diagram to map which pages call which endpoints, helping you understand backend contract changes and their impact on the frontend.

