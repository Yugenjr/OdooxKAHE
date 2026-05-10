# Architecture & App Structure

This document describes the high-level structure of the OdooxKAHE frontend, from the root App component down through providers, layouts, and pages.

## App Component Hierarchy

The diagram below shows how the React app is organized, including global providers and layout wrappers:

```mermaid
graph TD
  App[App Root]

  App --> Providers[QueryProvider]
  App --> Layout[Navbar + Sidebar Layout]

  Layout --> Landing[Landing Page]
  Layout --> Search[Search Activities]
  Layout --> CitySearch[City Search]
  Layout --> ActivityDetail[Activity Detail]
  Layout --> TripBuilder[Trip Builder]
  Layout --> Itinerary[Itinerary Page]
  Layout --> MyTrips[My Trips]
  Layout --> Profile[Profile / Notes]
  Layout --> Auth[Auth Pages]

  Providers --> API[apiService]
  API --> Backend[(Backend API)]
```

Key responsibilities:

- `App Root` — bootstraps the entire app and registers global providers
- `QueryProvider` — manages data fetching, caching, mutations (React Query or similar)
- `Navbar + Sidebar Layout` — persistent navigation wrapper shared across all pages
- `Pages` — individual route modules (landing, search, trip builder, etc.)
- `apiService` — centralized HTTP client used by all pages and the query provider

## Quick Navigation Paths

The Navbar and Sidebar offer shortcuts to key areas:

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

## Page-to-Backend API Dependencies

The diagram below shows which backend endpoints each page relies on:

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

---

For step-by-step user journeys and detailed page flows, see [Pages & User Flows](pages-flow.md).
