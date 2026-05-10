# API Reference

This document outlines all backend API endpoints, request/response formats, and authentication requirements.

---

## Quick Note

This is a **template** for API documentation. Please fill in your actual endpoints, parameters, and response structures.

---

## Base URL

```
Development:  http://localhost:5000/api
Production:   https://api.odoox.example.com/api
```

---

## Authentication

### JWT Header Format

All protected endpoints require an Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Getting a token:**
1. Call `POST /auth/login`
2. Receive token in response
3. Store in localStorage (frontend)
4. Send in every protected request

**Token expiration:**
- Tokens expire after 24 hours
- Use `POST /auth/refresh` to get a new token
- If token is invalid, API returns `401 Unauthorized`

---

## Authentication Endpoints

### POST /auth/register

**Description:** Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

**Errors:**
- `400` — Email already exists or invalid input
- `422` — Validation error (weak password, etc.)

---

### POST /auth/login

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  },
  "message": "Login successful"
}
```

**Errors:**
- `401` — Invalid credentials
- `404` — User not found

---

### POST /auth/refresh

**Description:** Get a new token using existing token

**Request Header:**
```
Authorization: Bearer <EXPIRED_OR_VALID_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

**Errors:**
- `401` — Invalid or expired token

---

## Trips Endpoints

### GET /trips

**Description:** Get all trips for authenticated user

**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "trip-123",
      "title": "Paris Adventure",
      "destination": "Paris, France",
      "startDate": "2024-06-01",
      "endDate": "2024-06-10",
      "budget": 5000,
      "isPublic": false,
      "createdAt": "2024-05-10T10:30:45Z"
    },
    {
      "id": "trip-456",
      "title": "Tokyo Expedition",
      "destination": "Tokyo, Japan",
      "startDate": "2024-08-15",
      "endDate": "2024-08-25",
      "budget": 8000,
      "isPublic": true,
      "createdAt": "2024-05-09T14:20:30Z"
    }
  ]
}
```

---

### POST /trips

**Description:** Create a new trip

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "Paris Adventure",
  "destination": "Paris, France",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10",
  "description": "A romantic getaway to Paris",
  "budget": 5000,
  "isPublic": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "trip-123",
    "userId": "user-456",
    "title": "Paris Adventure",
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-10",
    "description": "A romantic getaway to Paris",
    "budget": 5000,
    "isPublic": false,
    "createdAt": "2024-05-10T10:30:45Z"
  }
}
```

**Errors:**
- `400` — Missing required fields
- `401` — Not authenticated

---

### GET /trips/:tripId

**Description:** Get a specific trip with full details

**Auth Required:** Yes (unless isPublic=true)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "trip-123",
    "title": "Paris Adventure",
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-10",
    "budget": 5000,
    "itineraryDays": [
      {
        "day": 1,
        "date": "2024-06-01",
        "activities": [
          {
            "id": "activity-1",
            "name": "Eiffel Tower Visit",
            "time": "10:00",
            "duration": 120
          }
        ]
      }
    ]
  }
}
```

**Errors:**
- `404` — Trip not found
- `403` — Access denied (private trip)

---

### PUT /trips/:tripId

**Description:** Update trip details

**Auth Required:** Yes (must be trip owner)

**Request Body:**
```json
{
  "title": "Updated Title",
  "budget": 6000,
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* updated trip */ }
}
```

---

### DELETE /trips/:tripId

**Description:** Delete a trip

**Auth Required:** Yes (must be trip owner)

**Response (204 No Content):**
```
(empty body, just status code)
```

**Errors:**
- `403` — Not trip owner
- `404` — Trip not found

---

## Activities Endpoints

### GET /activities/search

**Description:** Search activities by keyword

**Auth Required:** No (public endpoint)

**Query Parameters:**
```
?keyword=museum&limit=20&offset=0
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity-123",
      "name": "Louvre Museum",
      "city": "Paris",
      "category": "museum",
      "rating": 4.8,
      "price": 15,
      "duration": 180,
      "description": "The world's largest art museum..."
    }
  ],
  "total": 245,
  "limit": 20,
  "offset": 0
}
```

---

### GET /activities/city/:city

**Description:** Search activities by city

**Auth Required:** No (public endpoint)

**Query Parameters:**
```
?limit=20&offset=0
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity-456",
      "name": "Arc de Triomphe",
      "city": "Paris",
      "category": "landmark",
      "rating": 4.6,
      "price": 10
    }
  ]
}
```

---

### GET /activities/:activityId

**Description:** Get activity details

**Auth Required:** No

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "activity-123",
    "name": "Louvre Museum",
    "description": "The world's largest art museum and a historic monument in Paris...",
    "city": "Paris",
    "category": "museum",
    "rating": 4.8,
    "price": 15,
    "duration": 180,
    "hours": "9:00 AM - 6:00 PM",
    "address": "Rue de Rivoli, 75004 Paris",
    "phone": "+33 1 40 20 50 50",
    "website": "https://www.louvre.fr/"
  }
}
```

---

## Itinerary Endpoints

### GET /trips/:tripId/itinerary

**Description:** Get full itinerary for a trip (day by day)

**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "day": 1,
      "date": "2024-06-01",
      "activities": [
        {
          "id": "itinerary-item-1",
          "activityId": "activity-123",
          "name": "Eiffel Tower",
          "startTime": "10:00",
          "duration": 120,
          "notes": "Bring camera"
        },
        {
          "id": "itinerary-item-2",
          "activityId": "activity-456",
          "name": "Lunch at Cafe",
          "startTime": "12:30",
          "duration": 90,
          "notes": "Reservation at noon"
        }
      ]
    },
    {
      "day": 2,
      "date": "2024-06-02",
      "activities": [
        {
          "id": "itinerary-item-3",
          "activityId": "activity-789",
          "name": "Louvre Museum",
          "startTime": "09:00",
          "duration": 180
        }
      ]
    }
  ]
}
```

---

### POST /trips/:tripId/itinerary

**Description:** Add activity to a trip day

**Auth Required:** Yes

**Request Body:**
```json
{
  "dayNumber": 1,
  "activityId": "activity-123",
  "startTime": "10:00",
  "notes": "Bring camera"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "itinerary-item-1",
    "tripId": "trip-123",
    "dayNumber": 1,
    "activityId": "activity-123",
    "startTime": "10:00",
    "notes": "Bring camera"
  }
}
```

---

### DELETE /itinerary/:itemId

**Description:** Remove activity from itinerary

**Auth Required:** Yes

**Response (204 No Content):**
```
(empty body)
```

---

## Budget Endpoints

### GET /trips/:tripId/budget

**Description:** Get budget breakdown for a trip

**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tripId": "trip-123",
    "total": 5000,
    "currency": "USD",
    "expenses": [
      {
        "id": "expense-1",
        "category": "accommodation",
        "amount": 2000,
        "notes": "3 nights hotel"
      },
      {
        "id": "expense-2",
        "category": "food",
        "amount": 1500,
        "notes": "Meals and restaurants"
      },
      {
        "id": "expense-3",
        "category": "activities",
        "amount": 1000,
        "notes": "Museum and tours"
      },
      {
        "id": "expense-4",
        "category": "transport",
        "amount": 500,
        "notes": "Metro and taxi"
      }
    ]
  }
}
```

---

### POST /trips/:tripId/budget

**Description:** Add expense to trip budget

**Auth Required:** Yes

**Request Body:**
```json
{
  "category": "accommodation",
  "amount": 2000,
  "currency": "USD",
  "notes": "3 nights hotel"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "expense-1",
    "tripId": "trip-123",
    "category": "accommodation",
    "amount": 2000,
    "currency": "USD",
    "notes": "3 nights hotel"
  }
}
```

---

## Profile Endpoints

### GET /users/me

**Description:** Get current user profile

**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profilePicture": "https://...",
    "createdAt": "2024-01-15T10:30:45Z"
  }
}
```

---

### PUT /users/me

**Description:** Update user profile

**Auth Required:** Yes

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "profilePicture": "data:image/png;base64,..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* updated user */ }
}
```

---

## Sharing Endpoints

### POST /trips/:tripId/share

**Description:** Share a trip with another user

**Auth Required:** Yes

**Request Body:**
```json
{
  "recipientEmail": "friend@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Trip shared successfully"
}
```

---

### GET /trips/shared

**Description:** Get trips shared with user

**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "trip-789",
      "title": "Tokyo Trip",
      "destination": "Tokyo, Japan",
      "sharedBy": "friend@example.com",
      "sharedAt": "2024-05-08T12:00:00Z"
    }
  ]
}
```

---

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| `400` | Bad Request | Invalid input format |
| `401` | Unauthorized | Missing or invalid token |
| `403` | Forbidden | Don't have permission |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Email already exists |
| `422` | Unprocessable | Validation error |
| `500` | Server Error | Database failure |

---

## Response Envelope

All endpoints return responses in this format:

```json
{
  "success": true/false,
  "data": { /* payload */ },
  "message": "User-friendly message",
  "statusCode": 200,
  "timestamp": "2024-05-10T10:30:45Z"
}
```

---

## Rate Limiting

Expected rate limits (to be confirmed):
- **Public endpoints:** 100 requests/hour
- **Authenticated endpoints:** 1000 requests/hour
- **Auth endpoints:** 10 requests/minute

---

## TODO: Document Your Actual API

Please provide:

- [ ] Complete list of all endpoints
- [ ] Actual request/response examples
- [ ] Field validation rules
- [ ] Supported HTTP methods (GET, POST, PUT, DELETE, etc.)
- [ ] Pagination details (if applicable)
- [ ] Sorting/filtering options
- [ ] Upload endpoint details (if images/files)
- [ ] Rate limiting specifics
- [ ] CORS policy
- [ ] Deprecation notices or versioning

---

## Next Steps

- **Setup & Running:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Frontend Architecture:** [frontend.md](frontend.md)
- **Backend Services:** [backend.md](backend.md)
- **System Architecture:** [architecture.md](architecture.md)
