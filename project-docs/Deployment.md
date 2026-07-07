# Deployment Documentation

## Deployment Strategy

### Deployment Overview

The People's Priority AI platform is deployed using a cloud-native architecture to ensure high availability, scalability, and easy maintenance. Each component of the application is independently deployed, allowing frontend, backend, database, and AI services to scale as required.

The deployment strategy is designed to support rapid development during the hackathon while remaining suitable for future production deployment.

### Deployment Architecture

```
Citizens / MPs
      │
      ▼
React Frontend (Vercel)
      │
      │ HTTPS REST APIs
      │
      ▼
Express Backend (Render)
      │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
MongoDB Atlas    Gemini AI API    Cloud File Storage
  (Database)     (AI Processing)  (Images & Audio)
      │
      ▼
MP Analytics Dashboard
```

## Deployment Components

### 1. Frontend

#### Platform
Vercel

#### Technology
- React.js
- Tailwind CSS
- React Router
- Axios
- Leaflet Maps
- Recharts

#### Responsibilities
- User Interface
- Authentication
- Complaint Submission
- Dashboard
- Analytics
- Heatmap Visualization

---

### 2. Backend

#### Platform
Render

#### Technology
- Node.js
- Express.js

#### Responsibilities
- REST APIs
- Authentication
- Business Logic
- AI Integration
- File Upload Handling
- Dashboard Services
- Priority Calculation

---

### 3. Database

#### Platform
MongoDB Atlas

#### Responsibilities
- User Management
- Citizen Suggestions
- AI Analysis
- Demand Hotspots
- Public Datasets
- Development Projects
- Priority Recommendations

MongoDB Atlas provides automatic backups, cloud scalability, and secure access.

---

### 4. AI Service

#### Platform
Google Gemini API

#### Responsibilities
- Language Detection
- Translation
- Complaint Categorization
- AI Summary Generation
- Keyword Extraction
- Urgency Prediction
- Duplicate Complaint Detection
- Development Priority Recommendation

The backend securely communicates with Gemini using API keys stored in environment variables.

---

### 5. File Storage

**During the hackathon prototype:**
- Images and voice recordings may be stored locally or using Cloudinary.

**For production:**
- Cloudinary or AWS S3 can be used for scalable and secure file storage.

---

## Deployment Workflow

```
Developer
      │
      ▼
Push Code to GitHub
      │
      ├──────────────┐
      ▼              ▼
Vercel          Render
(Frontend)      (Backend)
      │              │
      └──────┬───────┘
             ▼
      MongoDB Atlas
             │
             ▼
        Gemini AI API
             │
             ▼
         Live Application
```

## Environment Variables

Sensitive credentials are never stored in source code.

### Frontend
- `VITE_API_URL`

### Backend
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## CI/CD Workflow

The deployment pipeline supports Continuous Integration and Continuous Deployment.

**Workflow:**
1. Developer pushes code to GitHub
2. Vercel automatically builds and deploys the frontend
3. Render automatically builds and deploys the backend
4. MongoDB Atlas stores application data
5. Gemini API is accessed during runtime

This enables rapid updates without manual deployment.

## Deployment Security

The deployed application implements:

- HTTPS communication
- JWT Authentication
- Environment Variables
- CORS Configuration
- Secure MongoDB Atlas Connection
- Rate Limiting
- Password Hashing using bcrypt
- Secure File Upload Validation

## Scalability

The deployment architecture supports future scaling through:

- Independent frontend and backend deployment
- Cloud-hosted MongoDB Atlas
- Horizontal backend scaling
- AI model upgrades without frontend changes
- Cloud file storage
- Integration with government APIs
- Support for multiple constituencies across India

## Availability

To improve reliability:

- MongoDB Atlas provides managed cloud infrastructure
- Vercel distributes frontend assets through a global CDN
- Render automatically restarts backend services if failures occur
- AI failures are handled gracefully by returning meaningful error messages

## Monitoring

Future monitoring support includes:

- Render Logs
- Vercel Analytics
- MongoDB Atlas Monitoring
- API Response Monitoring
- Error Logging
- Performance Metrics

## Disaster Recovery

The deployment strategy includes:

- MongoDB Atlas automated backups
- GitHub version control
- Environment variable backups
- Stateless backend services
- Easy redeployment from GitHub

## Future Deployment Enhancements

The architecture is designed for future production deployment with:

- Docker containerization
- Kubernetes orchestration
- Redis caching
- CDN optimization
- Load balancing
- WebSocket support for real-time updates
- Multi-region deployment
- Government cloud infrastructure integration

## Deployment Workflow for End Users

```
Citizen Opens Website
↓
React Application Loads
↓
User Authentication
↓
Submit Complaint (Text, Voice, Image)
↓
Backend Validates Request
↓
Store Data in MongoDB
↓
Gemini AI Processes Complaint
↓
AI Generates Category, Summary, and Priority
↓
Demand Hotspots Updated
↓
Priority Recommendations Generated
↓
MP Dashboard Displays Analytics and Ranked Development Works
```

## Deployment Benefits

- Fast and reliable cloud deployment
- Automatic deployments through GitHub
- Secure environment variable management
- Scalable architecture for increasing user traffic
- Easy maintenance and future feature expansion
- Cost-effective deployment using free cloud services suitable for hackathon prototypes

