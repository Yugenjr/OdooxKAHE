# Backend Services

This document outlines the backend structure, services, controllers, database schema, authentication, and business logic.

---

## Quick Note

The backend code is not included in the workspace provided. This document is a **template** for documenting your backend. Please fill in the actual implementation details.

---

## Backend Structure

Expected folder structure:

```
backend/
├── src/
│   ├── routes/                    # Route handlers
│   │   ├── auth.routes.ts
│   │   ├── trips.routes.ts
│   │   ├── activities.routes.ts
│   │   └── users.routes.ts
│   │
│   ├── controllers/               # Business logic
│   │   ├── authController.ts
│   │   ├── tripController.ts
│   │   ├── activityController.ts
│   │   └── userController.ts
│   │
│   ├── services/                  # Data & external services
│   │   ├── tripService.ts
│   │   ├── activityService.ts
│   │   ├── authService.ts
│   │   └── emailService.ts
│   │
│   ├── models/                    # Database models/schemas
│   │   ├── User.ts
│   │   ├── Trip.ts
│   │   ├── Activity.ts
│   │   ├── Itinerary.ts
│   │   └── Budget.ts
│   │
│   ├── middleware/                # Express middleware
│   │   ├── auth.ts                # JWT verification
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts                 # JWT token generation/verification
│   │   ├── passwordHash.ts
│   │   └── validators.ts
│   │
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── constants.ts
│   │
│   └── app.ts                     # Express app setup
│
├── .env.example
├── package.json
└── README.md
```

---

## Authentication System

### JWT (JSON Web Tokens)

**Token Flow:**
1. User submits email + password
2. Backend validates credentials
3. If valid, generates JWT token
4. Frontend stores token in localStorage
5. Frontend sends token in Authorization header for protected endpoints

**Token Structure:**
```
Header.Payload.Signature

Payload contains:
{
  "id": "userId",
  "email": "user@example.com",
  "iat": 1234567890,        // Issued at
  "exp": 1234651290         // Expires in (e.g., 24 hours)
}
```

### Protected Routes Middleware

Middleware checks every request to protected endpoints:
```
1. Extract Authorization header
2. Verify JWT signature
3. Check expiration
4. If valid → attach user to request
5. If invalid → return 401 Unauthorized
```

---

## Database Schema

### Users Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| email | String | Unique, lowercase |
| passwordHash | String | Bcrypt hash (never store plain password) |
| firstName | String | |
| lastName | String | |
| profilePicture | String | URL or base64 |
| createdAt | DateTime | Auto-set on signup |
| updatedAt | DateTime | Auto-updated |

### Trips Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| userId | UUID | Foreign key → Users |
| title | String | Trip name (e.g., "Paris Adventure") |
| destination | String | City/country |
| startDate | DateTime | Trip start |
| endDate | DateTime | Trip end |
| description | String | Optional trip notes |
| isPublic | Boolean | Shareable with others |
| budget | Decimal | Total trip budget |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### Activities Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | Activity name |
| description | String | Details |
| city | String | Location |
| category | String | Type (restaurant, museum, etc.) |
| rating | Float | User rating |
| price | Decimal | Estimated cost |
| duration | Int | Minutes |
| externalId | String | ID from external API |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### Itinerary Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| tripId | UUID | Foreign key → Trips |
| dayNumber | Int | Which day (1, 2, 3...) |
| activityId | UUID | Foreign key → Activities |
| startTime | DateTime | When activity starts |
| notes | String | Optional day notes |
| order | Int | Order within day |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### Budget Table

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| tripId | UUID | Foreign key → Trips |
| category | String | Type (accommodation, food, etc.) |
| amount | Decimal | Cost |
| currency | String | USD, EUR, etc. |
| notes | String | |
| createdAt | DateTime | |
| updatedAt | DateTime | |

---

## Core Services

### Auth Service

**Responsibilities:**
- User registration (email validation, password hashing)
- User login (credential verification, token generation)
- Token refresh (when token expires)
- Password reset workflow

**Key Methods:**
```
register(email, password, firstName, lastName)
login(email, password)
refreshToken(token)
resetPassword(email, newPassword)
verifyToken(token)
```

### Trip Service

**Responsibilities:**
- Create trips
- Update trip details
- Delete trips
- Fetch user's trips
- Share trips with other users
- Get trip by ID

**Key Methods:**
```
createTrip(userId, tripData)
updateTrip(tripId, updates)
deleteTrip(tripId)
getUserTrips(userId)
getTripById(tripId)
shareTrip(tripId, recipientEmail)
getSharedTrips(userId)
```

### Activity Service

**Responsibilities:**
- Search activities by keyword
- Search activities by city
- Get activity details
- Add activity to trip day
- Remove activity from trip

**Key Methods:**
```
searchActivities(keyword, limit)
searchByCity(city, limit)
getActivityById(activityId)
addActivityToItinerary(tripId, dayNumber, activityId)
removeActivityFromItinerary(activityId)
```

### Itinerary Service

**Responsibilities:**
- Manage trip day-by-day planning
- Reorder activities within a day
- Update activity times
- Generate itinerary for export

**Key Methods:**
```
getItinerary(tripId)
addActivityToDay(tripId, dayNumber, activityId, startTime)
reorderDay(tripId, dayNumber, activityOrders)
updateActivityTime(activityId, newTime)
generateExport(tripId, format) // PDF, JSON, etc.
```

### Budget Service

**Responsibilities:**
- Track trip expenses
- Calculate total costs
- Per-category breakdown
- Manage shared costs

**Key Methods:**
```
addExpense(tripId, category, amount, notes)
updateExpense(expenseId, updates)
deleteExpense(expenseId)
getBudgetBreakdown(tripId)
getTotalBudget(tripId)
calculatePerPerson(tripId, numPeople)
```

---

## API Response Format

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "trip-123",
    "title": "Paris Trip",
    "destination": "Paris, France"
  },
  "message": "Trip created successfully"
}
```

### Error Response (400, 401, 404, 500)

```json
{
  "success": false,
  "error": "Invalid email format",
  "statusCode": 400,
  "timestamp": "2024-05-10T10:30:45Z"
}
```

---

## Authentication Flow

```mermaid
flowchart TD
  User["User"] -->|POST /auth/login| Login["Login Endpoint"]
  Login --> Validate["Validate Email + Password"]
  Validate -->|Invalid| Error["Return 401"]
  Validate -->|Valid| Hash["Generate JWT Token"]
  Hash --> Return["Return token + user data"]
  Return -->|Save Token| Frontend["Frontend localStorage"]
  
  Frontend -->|GET /api/trips| Protected["Protected Endpoint"]
  Protected --> Check["Verify JWT in header"]
  Check -->|Valid| Process["Process request"]
  Check -->|Invalid| Unauthorized["Return 401"]
  Process --> Response["Return data"]
  
  Error -.->|UI shows error| User
  Unauthorized -.->|Redirect to login| User
```

---

## Environment Variables (.env)

Your backend should use:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/odoox
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=24h
CORS_ORIGIN=http://localhost:5173

# Optional: External APIs
GOOGLE_MAPS_API_KEY=...
WEATHER_API_KEY=...
```

---

## TODO: Document Your Backend

Please provide:

- [ ] Actual folder structure and file organization
- [ ] Database system used (PostgreSQL, MongoDB, etc.)
- [ ] ORM or query builder (TypeORM, Prisma, Mongoose, etc.)
- [ ] Authentication implementation details
- [ ] List of all endpoints with descriptions
- [ ] Data validation rules
- [ ] Error handling strategy
- [ ] Rate limiting or security headers
- [ ] Database migration strategy
- [ ] Testing approach (unit, integration tests)

---

## Next Steps

- **Setup & Running:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Frontend Architecture:** [FRONTEND.md](FRONTEND.md)
- **System Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **API Endpoints:** [API.md](API.md)
