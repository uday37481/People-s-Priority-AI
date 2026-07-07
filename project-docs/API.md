# API Documentation

## API Specification

### API Overview

The backend exposes RESTful APIs that enable citizen participation, AI-powered complaint analysis, hotspot detection, constituency management, and intelligent development prioritization.

**Base URL:** `/api/v1`

All responses use JSON.

## Authentication

Authentication is performed using JWT (JSON Web Token).

Every protected request must include:
```
Authorization: Bearer <JWT_TOKEN>
```

**Roles supported:**
- Citizen
- MP
- Admin

## Authentication APIs

### Register User

**POST** `/auth/register`

**Description:** Creates a new citizen, MP, or administrator account.

**Request:**
```json
{
  "fullName": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "password": "password123",
  "role": "Citizen",
  "preferredLanguage": "Hindi"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### Login

**POST** `/auth/login`

Returns JWT access token.

### Get Current User

**GET** `/auth/me`

Returns authenticated user profile.

## Citizen Suggestion APIs

### Submit Suggestion

**POST** `/suggestions`

**Description:** Allows citizens to submit development requests using text, voice, or images.

**Request:** Multipart Form Data

**Fields:**
- title
- description
- image
- audio
- latitude
- longitude

**Response:**
```json
{
  "success": true,
  "suggestionId": "65ab..."
}
```

### Get My Suggestions

**GET** `/suggestions/my`

Returns all submissions of the logged-in citizen.

### Get Suggestion Details

**GET** `/suggestions/:id`

Returns complete suggestion information.

## AI Analysis APIs

### Analyze Suggestion

**POST** `/ai/analyze/:suggestionId`

**Description:** Processes a citizen submission using Gemini AI.

The AI performs:
- Language detection
- Translation (if required)
- Category detection
- AI summary
- Sentiment analysis
- Urgency prediction
- Keyword extraction

**Response:**
```json
{
  "category": "Road",
  "summary": "Road repair required near the primary school.",
  "urgency": "High",
  "confidence": 97,
  "keywords": [
    "Road",
    "Potholes",
    "School"
  ]
}
```

### Regenerate AI Analysis

**POST** `/ai/regenerate/:suggestionId`

Re-runs AI analysis using the latest AI model.

## Hotspot APIs

### Generate Hotspots

**POST** `/hotspots/generate`

Groups similar complaints and calculates demand hotspots.

### Get Hotspots

**GET** `/hotspots`

Returns all hotspot locations for map visualization.

**Example Response:**
```json
[
  {
    "category": "Road",
    "count": 241,
    "severity": "High",
    "location": {
      "lat": 19.99,
      "lng": 73.78
    }
  }
]
```

## Public Dataset APIs

### Get Constituency Dataset

**GET** `/datasets/:constituencyId`

Returns demographic and infrastructure information.

### Update Dataset

**PUT** `/datasets/:id`

Admin only.

## Development Project APIs

### Create Project

**POST** `/projects`

Adds a proposed development project.

### Get All Projects

**GET** `/projects`

Returns constituency projects.

### Update Project Status

**PATCH** `/projects/:id/status`

Updates project progress.

## AI Priority Recommendation APIs

### Generate Priority Ranking

**POST** `/priority/generate`

**Description:** Combines:
- Citizen demand
- AI analysis
- Public datasets
- Existing development projects

to calculate constituency priorities.

**Response:**
```json
[
  {
    "rank": 1,
    "category": "Road",
    "priorityScore": 96,
    "reason": "Highest complaint frequency and poor infrastructure."
  },
  {
    "rank": 2,
    "category": "Water Supply",
    "priorityScore": 90
  }
]
```

### Get Latest Recommendations

**GET** `/priority`

Returns AI-generated ranked development priorities.

## Dashboard APIs

### Citizen Dashboard

**GET** `/dashboard/citizen`

Returns:
- Total submissions
- Submission status
- Recent activity

### MP Dashboard

**GET** `/dashboard/mp`

Returns:
- Total complaints
- AI category distribution
- Demand hotspots
- Priority rankings
- Recent citizen submissions
- Infrastructure statistics

## Search APIs

### Search Suggestions

**GET** `/search/suggestions?q=road`

Supports keyword search.

### Filter Suggestions

**GET** `/search/filter`

**Supported filters:**
- Category
- Constituency
- Urgency
- Date
- Status

## Notification APIs

### Send Notification

**POST** `/notifications`

Sends updates to citizens regarding their submitted suggestions.

## Admin APIs

### Get All Users

**GET** `/admin/users`

### Get Analytics

**GET** `/admin/analytics`

Returns:
- User statistics
- Complaint trends
- AI processing metrics
- Category distribution

## Standard API Response Format

### Successful Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Resource not found",
  "errorCode": "NOT_FOUND"
}
```

## API Security

- JWT Authentication
- Role-Based Authorization
- Password Hashing (bcrypt)
- Input Validation
- Request Size Limits
- File Type Validation
- Rate Limiting
- CORS Protection
- Environment Variables
- MongoDB Injection Protection

## API Workflow

```
Citizen Login
↓
Submit Suggestion
↓
Store in MongoDB
↓
Trigger Gemini AI Analysis
↓
Generate AI Summary & Category
↓
Update AI Analysis Collection
↓
Detect Demand Hotspots
↓
Combine with Public Datasets
↓
Generate Priority Rankings
↓
Display Results on MP Dashboard
```

