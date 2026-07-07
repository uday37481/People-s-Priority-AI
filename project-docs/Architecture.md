# Architecture Documentation

## System Architecture

### Overview

The platform follows a modular three-tier architecture consisting of:

- Presentation Layer (Frontend)
- Application Layer (Backend APIs & AI Services)
- Data Layer (MongoDB)

The architecture enables citizens to submit development suggestions through multiple input methods while allowing AI to analyze feedback, identify demand hotspots, combine public datasets, and generate priority recommendations for Members of Parliament (MPs).

### High-Level Architecture

```
                        Citizens
                            │
      ┌─────────────────────┼─────────────────────┐
      │                     │                     │
   Text Input          Voice Input          Image Upload
      │                     │                     │
      └─────────────────────┴─────────────────────┘
                            │
                     React Frontend
                            │
             (Authentication & UI Layer)
                            │
                    REST API Requests
                            │
                    Express.js Backend
                            │
 ┌──────────────┬────────────┼───────────────┬──────────────┐
 │              │            │               │              │
Auth Module  Suggestion   AI Service   Dashboard API   Project API
              Module
 │              │            │               │              │
 └──────────────┴────────────┴───────────────┴──────────────┘
                            │
                    Gemini AI Service
                            │
      Category • Summary • Translation • Priority
                            │
                    MongoDB Database
                            │
 Users • Suggestions • AI Analysis
 Public Datasets • Projects
 Hotspots • Recommendations
                            │
                    MP Dashboard
                            │
     Charts • Heatmaps • Priority Ranking • Analytics
```

## Architecture Layers

### 1. Presentation Layer

**Technology:**
- React.js
- Tailwind CSS
- React Router
- Axios
- Leaflet Maps
- Recharts

**Responsibilities:**
- User Authentication
- Complaint Submission
- Voice Recording
- Image Upload
- Interactive Maps
- Analytics Dashboard
- Development Priority Visualization

### 2. Application Layer

**Technology:**
- Node.js
- Express.js

**Responsibilities:**
- Authentication
- Business Logic
- API Management
- AI Integration
- File Upload Handling
- Dashboard Services
- Priority Calculation
- Role-Based Access Control

The backend acts as the central controller between users, AI services, and MongoDB.

### 3. AI Processing Layer

**Technology:**
- Gemini API

**Responsibilities:**
The AI service performs:
- Language Detection
- Translation to English (if required)
- Complaint Categorization
- AI Summary Generation
- Keyword Extraction
- Duplicate Complaint Detection
- Sentiment Analysis
- Urgency Prediction
- Development Priority Recommendation

The AI layer processes only the complaint content and returns structured insights to the backend.

### 4. Data Layer

**Technology:**
- MongoDB Atlas
- Mongoose ODM

**Collections:**
- Users
- Constituencies
- CitizenSuggestions
- AIAnalysis
- DemandHotspots
- PublicDatasets
- DevelopmentProjects
- PriorityRecommendations

**Responsibilities:**
- Persistent storage
- Geospatial queries
- Aggregation pipelines
- Fast dashboard analytics
- AI metadata storage

## Module Architecture

### Authentication Module

**Responsible for:**
- Registration
- Login
- JWT Authentication
- Password Hashing
- Role Management

**Roles:**
- Citizen
- MP
- Admin

### Citizen Suggestion Module

**Responsible for:**
- Accepting Text
- Voice Upload
- Image Upload
- Location Capture
- Complaint Storage

### AI Analysis Module

Triggered immediately after a citizen submits a suggestion.

**Processes:**
- Language Detection
- Translation
- Category Classification
- AI Summary
- Keyword Extraction
- Sentiment Detection
- Urgency Prediction

Stores processed data in the AIAnalysis collection.

### Demand Hotspot Module

**Aggregates:**
- Complaint Locations
- Complaint Categories
- Complaint Frequency

**Generates:**
- Heatmaps
- Regional Demand Clusters

### Public Data Module

**Stores:**
- Population
- Schools
- Hospitals
- Road Coverage
- Water Coverage
- Literacy Rate
- Internet Access

These datasets improve AI decision-making beyond citizen complaints.

### Priority Recommendation Module

**Combines:**
- Citizen Demand
- AI Analysis
- Infrastructure Gaps
- Demographic Data
- Existing Development Projects

to generate AI-powered development priorities.

### Dashboard Module

**Citizen Dashboard**
Displays:
- Submitted Suggestions
- Complaint Status
- AI Analysis Result

**MP Dashboard**
Displays:
- Complaint Statistics
- Demand Heatmaps
- Category Distribution
- AI Recommendations
- Priority Ranking
- Development Insights

## System Workflow

```
Step 1: Citizen logs in
↓
Step 2: Citizen submits a suggestion using text, voice, or image
↓
Step 3: Backend stores the original submission
↓
Step 4: Gemini AI analyzes the submission
↓
Step 5: AI generates: Category, Summary, Urgency, Keywords, Confidence Score
↓
Step 6: Backend stores AI analysis
↓
Step 7: Demand hotspot engine groups similar complaints
↓
Step 8: System combines complaint trends with public demographic and infrastructure datasets
↓
Step 9: Priority engine generates ranked development recommendations
↓
Step 10: MP Dashboard displays actionable insights with supporting analytics
```

## Communication Flow

```
Frontend
↓
REST API
↓
Express Backend
↓
Gemini AI
↓
MongoDB
↓
Express Backend
↓
Frontend Dashboard
```

## Scalability

The architecture is designed to support:

- Multiple constituencies
- Thousands of citizen submissions
- Additional AI models
- WhatsApp integration
- Government API integration
- Mobile applications
- Real-time analytics
- Future microservice migration

## Security Architecture

- JWT Authentication
- bcrypt Password Hashing
- Role-Based Authorization
- Input Validation
- Secure File Upload
- Environment Variables
- MongoDB Injection Protection
- CORS Configuration
- Rate Limiting

## Architecture Benefits

- Modular and easy to maintain
- AI services are independent from business logic
- Supports multilingual citizen participation
- Optimized for geospatial analytics and hotspot detection
- Scalable for constituency and state-level deployment
- Easily extendable with government datasets and future communication channels

## AI Decision Engine

The AI Decision Engine is the core intelligence layer of the platform. Instead of relying only on complaint counts, it combines multiple sources of information to generate explainable development priorities.

### Inputs

- Citizen Suggestions
- AI Category Detection
- AI Urgency Analysis
- Public Demographic Data
- Infrastructure Availability
- Existing Development Projects

### Processing

1. Group similar complaints
2. Identify demand hotspots using geospatial clustering
3. Compare citizen demand with infrastructure gaps
4. Calculate a weighted priority score
5. Generate an AI explanation for every recommendation

### Output

Each recommended project includes:
- Priority Rank
- Priority Score
- Supporting Statistics
- AI Explanation

## AI Decision Flow

```
Citizen Submission
        │
        ▼
Gemini AI Analysis
(Category, Summary, Keywords, Urgency)
        │
        ▼
Cluster Similar Complaints
        │
        ▼
Generate Demand Hotspots
        │
        ▼
Merge with Public Dataset
(Population, Roads, Schools, Hospitals)
        │
        ▼
Compare with Existing Development Projects
        │
        ▼
Calculate AI Priority Score
        │
        ▼
Generate Explainable Recommendation
        │
        ▼
MP Dashboard
```

## Priority Scoring Strategy

The platform generates a priority score using multiple indicators rather than complaint frequency alone.

### Example scoring factors:

| Factor               | Weight |
|---------------------|--------|
| Citizen Demand      | 40%    |
| Infrastructure Gap  | 25%    |
| Population Impact   | 20%    |
| AI Urgency Analysis | 10%    |
| Existing Project Status | 5% |

### Example

Road Repair
- Citizen Demand = 92
- Infrastructure Gap = 88
- Population Impact = 80
- Urgency = High
- Final Priority Score = 89.6

This approach makes recommendations transparent and data-driven.

## Explainable AI

Every recommendation generated by the system includes a human-readable explanation.

**Example:**

Road Repair – Priority Rank #1

Reason:
- 512 citizens reported road issues
- The affected villages have poor road connectivity
- Population impacted: 34,000
- No ongoing road development project exists
- AI Confidence: 96%

Providing explanations increases trust and helps MPs understand why a project is recommended.

## Future Architecture Enhancements

The architecture is designed for future expansion without major redesign.

Possible enhancements include:

- WhatsApp chatbot for complaint submission
- IVR (phone call) support for citizens without smartphones
- Government Open Data API integration
- Real-time dashboards using WebSockets
- Predictive analytics for future infrastructure needs
- Offline-first mobile application for rural areas
- Multi-language AI assistant for constituency support
- Microservices for AI processing and analytics
- Automated report generation for MPs
- District and state-level analytics dashboards

