# Database Documentation

## Database Design (MongoDB)

## Database Overview

The application uses MongoDB Atlas as its primary database due to its flexible document-oriented architecture, which is well-suited for storing diverse citizen submissions such as multilingual text, voice recordings, images, AI-generated insights, geospatial coordinates, and external public datasets.

The database is designed to support real-time citizen participation, AI-driven analysis, hotspot detection, and intelligent prioritization of constituency development projects.

## Design Principles

The database is designed to achieve the following objectives:

- Store multilingual citizen suggestions
- Support text, voice, image, and future messaging platform submissions
- Store AI-generated summaries and classifications separately from raw user data
- Support geospatial queries for hotspot identification
- Enable AI-based prioritization using citizen demand and public datasets
- Scale efficiently for thousands of submissions across multiple constituencies

## Collections

### 1. Users

Stores all registered users.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| fullName          | String     | Full name                    |
| email             | String     | Unique email                 |
| password          | String     | Hashed password              |
| role              | String     | Citizen, MP, Admin           |
| phone             | String     | Mobile number                |
| preferredLanguage | String     | Preferred language           |
| constituencyId    | ObjectId   | Linked constituency          |
| createdAt         | Date       | Account creation             |
| updatedAt         | Date       | Last update                  |

### 2. Constituencies

Stores constituency information managed by MPs.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| constituencyName  | String     | Constituency name            |
| district          | String     | District                     |
| state             | String     | State                        |
| mpName            | String     | Member of Parliament         |
| population        | Number     | Population                   |
| area              | Number     | Area in square kilometers    |
| createdAt         | Date       | Creation timestamp           |

### 3. CitizenSuggestions

Stores all citizen development requests.

A submission may originate from:
- Website
- Mobile application
- Voice recording
- Image upload
- WhatsApp integration (future)
- Government grievance portals (future)

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| userId            | ObjectId   | Citizen reference            |
| constituencyId    | ObjectId   | Constituency reference       |
| title             | String     | Complaint title              |
| originalText      | String     | Original citizen message     |
| translatedText    | String     | English translation          |
| submissionType    | String     | Text, Voice, Image           |
| imageUrl          | String     | Uploaded image               |
| audioUrl          | String     | Uploaded voice recording     |
| location          | GeoJSON    | Latitude and longitude       |
| status            | String     | Pending, Reviewed, Resolved  |
| createdAt         | Date       | Submission timestamp         |

### 4. AIAnalysis

Stores AI-generated insights for every citizen submission.

Separating AI outputs from citizen submissions allows the system to regenerate AI results whenever improved AI models become available without modifying original data.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| suggestionId      | ObjectId   | Citizen suggestion reference |
| detectedCategory  | String     | Road, Water, Education, Healthcare, Agriculture, Employment, Sanitation, Electricity |
| aiSummary         | String     | AI-generated summary         |
| sentiment         | String     | Positive, Neutral, Negative  |
| urgency           | String     | Low, Medium, High            |
| extractedKeywords | Array      | Important keywords           |
| duplicateClusterId| String     | Similar complaint group      |
| confidenceScore   | Number     | AI confidence score          |
| processedAt       | Date       | Processing timestamp         |

### 5. DemandHotspots

Stores AI-generated demand hotspots.

Instead of repeatedly scanning all complaints, hotspot information is precomputed for faster dashboard visualization.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| constituencyId    | ObjectId   | Constituency                 |
| category          | String     | Development category         |
| hotspotCenter     | GeoJSON    | Hotspot location             |
| complaintCount    | Number     | Total complaints             |
| severityScore     | Number     | AI hotspot score             |
| updatedAt         | Date       | Last update                  |

### 6. PublicDatasets

Stores demographic and infrastructure datasets used for intelligent prioritization.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| constituencyId    | ObjectId   | Constituency                 |
| population        | Number     | Population                   |
| literacyRate      | Number     | Literacy percentage          |
| unemploymentRate  | Number     | Unemployment percentage      |
| hospitalCount     | Number     | Number of hospitals          |
| schoolCount       | Number     | Number of schools            |
| roadCoverage      | Number     | Road infrastructure coverage |
| drinkingWaterCoverage | Number | Drinking water coverage      |
| internetCoverage  | Number     | Internet availability        |
| source            | String     | Dataset source               |
| updatedAt         | Date       | Last updated                 |

### 7. DevelopmentProjects

Stores proposed and ongoing constituency development projects.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| constituencyId    | ObjectId   | Constituency                 |
| projectTitle      | String     | Project title                |
| category          | String     | Development category         |
| estimatedBudget   | Number     | Estimated cost               |
| status            | String     | Proposed, Approved, Ongoing, Completed |
| description       | String     | Project description          |
| createdAt         | Date       | Creation timestamp           |

### 8. PriorityRecommendations

Stores AI-generated development priorities presented to MPs.

This collection combines:
- Citizen demand
- Public datasets
- Infrastructure gaps
- Development plans

to recommend the most impactful projects.

| Field             | Type       | Description                  |
|-------------------|------------|------------------------------|
| _id               | ObjectId   | Unique identifier            |
| constituencyId    | ObjectId   | Constituency                 |
| projectCategory   | String     | Road, Water, School, Hospital, etc. |
| citizenDemandScore| Number     | Derived from complaint frequency |
| infrastructureGapScore | Number | Derived from public datasets |
| demographicNeedScore | Number   | Based on population statistics |
| aiPriorityScore   | Number     | Overall AI score             |
| priorityRank      | Number     | Final ranking                |
| aiReason          | String     | AI explanation               |
| generatedAt       | Date       | Timestamp                    |

## Collection Relationships

```
Users
   │
   ├───────────────┐
   │               │
CitizenSuggestions │
        │          │
        ▼          │
    AIAnalysis     │
        │          │
        ▼          │
  DemandHotspots   │
        │          │
        ▼          │
PriorityRecommendations
        ▲
        │
PublicDatasets
        │
        ▼
DevelopmentProjects

Constituencies connect to all major collections through constituencyId.
```

## GeoSpatial Design

MongoDB GeoJSON (2dsphere) indexes are used for:

- Complaint hotspot visualization
- Demand clustering
- Constituency-wise heatmaps
- Nearby issue detection
- Interactive map analytics

## Indexing Strategy

Indexes are created on:

- email (unique)
- constituencyId
- userId
- detectedCategory
- urgency
- priorityRank
- createdAt
- status
- hotspotCenter (2dsphere)
- location (2dsphere)

## AI Data Flow

```
Citizen Submission
↓
Stored in CitizenSuggestions
↓
AI categorizes, summarizes, detects urgency, and extracts keywords
↓
AIAnalysis collection updated
↓
Citizen demand combined with PublicDatasets
↓
Demand hotspots generated
↓
PriorityRecommendations calculated
↓
MP Dashboard displays ranked development works with AI explanations
```

