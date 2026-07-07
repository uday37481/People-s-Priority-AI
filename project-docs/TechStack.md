# Technology Stack

## Part 1 – Technology Overview & Architecture

### Document Overview

This document outlines the complete technology stack for the PeoplePriority AI platform, including architecture decisions, tools, libraries, and deployment strategies.

### Technology Overview

The platform is built on the **MERN Stack** (MongoDB, Express, React, Node.js) with modern AI capabilities and cloud-native deployment. This stack provides excellent developer productivity, scalability, and community support.

### Why MERN Stack

- **React**: Declarative, component-based UI with excellent performance
- **Express**: Lightweight, flexible backend framework
- **MongoDB**: Schema-less, document-oriented database perfect for unstructured citizen submissions
- **Node.js**: Fast, event-driven runtime for I/O-heavy operations
- **Full Stack JavaScript**: Consistent language across frontend and backend
- **Large Ecosystem**: Rich library of packages and tools
- **Rapid Development**: Perfect for hackathon and startup environments

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (Vercel)         │
│  - Tailwind CSS  - React Router        │
│  - Leaflet Maps  - Recharts            │
└──────────────────┬──────────────────────┘
                   │ HTTPS REST API
                   ↓
┌─────────────────────────────────────────┐
│      Express Backend (Render)           │
│  - Authentication  - Business Logic    │
│  - AI Integration  - File Handling     │
└────────┬──────────────────┬────────────┘
         │                  │
         ↓                  ↓
┌─────────────────┐ ┌──────────────────┐
│  MongoDB Atlas  │ │   Gemini API     │
│   (Database)    │ │   (AI Service)   │
└─────────────────┘ └──────────────────┘
         │
         ↓
┌─────────────────┐
│   Cloudinary    │
│  (File Storage) │
└─────────────────┘
```

### Frontend Technologies

- **React 18**: Modern, concurrent features, server components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router v6**: Declarative routing for single-page apps
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, consistent icon library
- **Leaflet**: Interactive maps for geospatial features
- **Recharts**: Composable charting library built on React components
- **React Hook Form**: Performant, flexible form validation
- **Zod**: TypeScript-first schema validation
- **React Query**: Data fetching, caching, synchronization

### Backend Technologies

- **Node.js 20**: LTS version with latest features
- **Express.js 4**: Minimalist web framework
- **Mongoose 8**: MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)**: Secure authentication tokens
- **bcrypt**: Password hashing library
- **Multer**: File upload handling middleware
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers middleware
- **Rate Limit**: Request rate limiting
- **dotenv**: Environment variable management
- **Express Validator**: Input validation
- **Morgan**: HTTP request logging

### Database Technologies

- **MongoDB Atlas**: Managed cloud database service
- **Mongoose ODM**: Schema validation, middleware, query building
- **MongoDB Aggregation Pipeline**: Complex data processing
- **Geospatial Indexes**: 2dsphere for location-based queries
- **Atlas Search**: Full-text search capabilities (future)
- **Atlas Triggers**: Database event handling (future)

### Authentication

- **JWT (JSON Web Tokens)**: Stateless authentication
- **bcrypt**: Password hashing (10+ salt rounds)
- **Access Tokens + Refresh Tokens**: Secure session management
- **Role-Based Access Control (RBAC)**: Citizen, MP, Admin roles
- **HTTP Only Cookies**: Secure token storage (production)
- **Protected Routes**: Route-level authorization checks

### AI Integration

- **Google Gemini API**:
  - Multimodal (text, image, audio) processing
  - Language detection and translation
  - Complaint categorization
  - AI summary generation
  - Keyword extraction
  - Sentiment analysis
  - Priority scoring
  - Duplicate detection
- **LangChain (optional)**: Advanced AI workflows (future)
- **Prompt Engineering**: Structured prompts for consistent outputs
- **Response Validation**: AI output parsing and sanitization

### Maps

- **Leaflet (Primary)**:
  - Open-source, lightweight
  - Excellent performance
  - Custom markers and layers
  - Heatmap plugins
  - Works offline with tile caching
- **Google Maps (Optional Alternative)**:
  - Better satellite imagery
  - More POI data
  - Higher cost at scale

### Charts

- **Recharts (Primary)**:
  - Native React components
  - Excellent TypeScript support
  - Highly customizable
  - Responsive out of the box
  - Good performance
- **Chart.js (Alternative)**:
  - More chart types
  - Larger ecosystem
  - Canvas-based rendering

### File Upload Strategy

- **Cloudinary**:
  - Image and audio storage
  - Automatic optimization
  - CDN delivery
  - Transformations on the fly
  - Secure signed URLs
- **Fallback Strategy**: Local storage during development
- **Validation**: MIME type checking, size limits
- **Preview**: Client-side previews before upload
- **Progress**: Upload progress indicators

---

## Part 2 – Project Architecture & Development

### Project Folder Structure

```
PeoplePriority AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── layouts/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.js
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── project-docs/
│   ├── PRD.md
│   ├── Features.md
│   ├── UIUX.md
│   ├── TechStack.md
│   ├── Database.md
│   ├── API.md
│   ├── Architecture.md
│   ├── Security.md
│   ├── Deployment.md
│   └── AI_Instructions.md
│
└── README.md
```

### API Architecture

**RESTful API Design**:
- Base URL: `/api/v1`
- Resource-based routes: `/auth`, `/suggestions`, `/ai`, `/hotspots`, etc.
- Standard HTTP methods: GET, POST, PUT, PATCH, DELETE
- JSON request/response format
- Proper HTTP status codes: 200, 201, 400, 401, 403, 404, 500

**Layered Architecture**:
- **Routes**: Define endpoints and request handling
- **Controllers**: Business logic and request/response handling
- **Services**: Reusable business logic (AI processing, calculations)
- **Models**: Mongoose schemas and database operations
- **Middleware**: Authentication, validation, error handling

### Database Schema Overview

**Collections**:
- `users`: User accounts and profiles
- `constituencies`: Constituency information and boundaries
- `citizenSuggestions`: Submitted complaints and requests
- `aiAnalysis`: AI-generated insights and analysis
- `demandHotspots`: Geospatial hotspot data
- `publicDatasets`: Demographic and infrastructure data
- `developmentProjects`: Proposed and ongoing projects
- `priorityRecommendations`: AI-generated priority rankings

See [Database.md](./Database.md) for complete schema details.

### Data Flow

```
1. User interacts with React frontend
   ↓
2. Action triggers API call via Axios
   ↓
3. Express backend receives request
   ↓
4. Authentication middleware validates JWT
   ↓
5. Request validation and sanitization
   ↓
6. Controller processes business logic
   ↓
7. Mongoose interacts with MongoDB
   ↓
8. AI service called if needed (Gemini API)
   ↓
9. Response formatted and sent to frontend
   ↓
10. React updates UI with new data
```

### Environment Variables

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:5000/api/v1
```

**Backend (.env)**:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
GEMINI_API_KEY=your-gemini-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:5173
```

### Third-Party Services

- **Vercel**: Frontend deployment
- **Render**: Backend deployment
- **MongoDB Atlas**: Database hosting
- **Google Gemini API**: AI/ML processing
- **Cloudinary**: File storage and CDN
- **GitHub**: Version control and CI/CD triggers

### Libraries & Dependencies

**Frontend (package.json)**:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.290.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "recharts": "^2.10.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "react-query": "^3.39.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vite": "^5.0.0"
  }
}
```

**Backend (package.json)**:
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.0",
    "express-validator": "^7.0.0",
    "multer": "^1.4.5",
    "cloudinary": "^1.41.0",
    "dotenv": "^16.3.0",
    "morgan": "^1.10.0",
    "@google/generative-ai": "^0.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

### Build Process

**Frontend**:
- Vite for fast development and optimized builds
- Tree shaking and code splitting
- Asset optimization
- Production build: `npm run build` → `dist/` folder

**Backend**:
- No build step needed (Node.js)
- Nodemon for development hot-reloading
- Production: `npm start`

### Coding Standards

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages
- **Git Flow**: Branching strategy (main, develop, feature/*)
- **DRY Principle**: Don't Repeat Yourself
- **KISS Principle**: Keep It Simple, Stupid
- **Single Responsibility**: Each component/function does one thing

### Naming Conventions

- **Components**: PascalCase (`UserProfile`, `ComplaintCard`)
- **Files**: PascalCase for components, camelCase otherwise
- **Functions**: camelCase (`handleSubmit`, `fetchData`)
- **Variables**: camelCase (`userId`, `complaintList`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_FILE_SIZE`)
- **CSS Classes**: kebab-case (`btn-primary`, `card-container`)
- **Routes**: kebab-case (`/api/v1/citizen-suggestions`)
- **Database Fields**: camelCase (`userId`, `createdAt`)

---

## Part 3 – Deployment & Production Readiness

### Deployment Stack

- **Frontend**: Vercel
  - Automatic deployments from GitHub
  - Global CDN distribution
  - Edge functions (optional)
  - Preview deployments for PRs

- **Backend**: Render
  - Automatic deployments from GitHub
  - Zero-downtime deployments
  - Automatic scaling
  - Managed SSL certificates

- **Database**: MongoDB Atlas
  - M0 cluster (free tier for development)
  - Automated backups
  - Multi-region deployment (production)
  - IP whitelisting
  - Network peering (enterprise)

### Performance Optimization

**Frontend**:
- Code splitting and lazy loading
- Image optimization (WebP, AVIF)
- CDN for static assets
- Component memoization
- Virtualized lists for large datasets
- Browser caching strategies

**Backend**:
- API response caching (Redis future)
- Database indexing
- Aggregation pipeline optimization
- Compression (gzip/brotli)
- Connection pooling
- Static file serving with cache headers

**Database**:
- Proper indexing strategy
- Query optimization
- Connection pooling
- Read replicas (production)
- Sharding (future)

### Scalability Strategy

**Horizontal Scaling**:
- Stateless backend services
- Load balancer (Render handles automatically)
- Multiple backend instances
- Read replicas for MongoDB

**Vertical Scaling**:
- Larger instance sizes as needed
- Database tier upgrades
- Memory and CPU adjustments

**Future Architecture**:
- Microservices split (AI service separate)
- Message queue (RabbitMQ/Kafka) for async processing
- Serverless functions for background jobs
- CDN for all static assets

### Security Strategy

See [Security.md](./Security.md) for complete details.

Key measures:
- JWT authentication with refresh tokens
- bcrypt password hashing
- Input validation and sanitization
- Rate limiting to prevent abuse
- Helmet security headers
- CORS configuration
- Environment variables for secrets
- MongoDB injection prevention
- File upload validation
- HTTPS only in production

### Error Handling

**Frontend**:
- Error boundaries for graceful degradation
- User-friendly error messages
- Error toast notifications
- Fallback UI components
- Network error retries

**Backend**:
- Centralized error handling middleware
- Proper HTTP status codes
- Structured error responses
- Logging of all errors
- No sensitive data in error responses

**Standard Error Response**:
```json
{
  "success": false,
  "message": "Resource not found",
  "errorCode": "NOT_FOUND"
}
```

### Logging & Monitoring

**Backend Logging**:
- Morgan for HTTP request logging
- Structured JSON logs (winston/pino future)
- Request IDs for tracing
- Error logging with stack traces

**Monitoring**:
- Render service metrics
- Vercel analytics
- MongoDB Atlas monitoring
- Custom health check endpoints
- Uptime monitoring (UptimeRobot future)

**Alerting**:
- Error rate alerts
- Performance degradation alerts
- Database connection issues
- API response time alerts

### Backup Strategy

**Database**:
- MongoDB Atlas automated backups
- Point-in-time recovery
- Cross-region backup copies
- Weekly full backups + daily incrementals

**Code**:
- GitHub version control
- Branch protection rules
- Code review requirements
- Backup repository (optional)

**Environment**:
- Environment variables documented
- Infrastructure as Code (Terraform future)
- Configuration management

### Future Improvements

**Short Term (0-3 months)**:
- Real-time notifications (Socket.io)
- WhatsApp integration
- Offline-first mobile app
- Email/SMS notifications

**Medium Term (3-6 months)**:
- Redis caching layer
- Advanced analytics dashboard
- Government data API integration
- Multi-language support (10+ languages)

**Long Term (6+ months)**:
- Microservices architecture
- Kubernetes orchestration
- Custom ML models
- Mobile apps (React Native)
- Multi-tenancy for states
- Predictive analytics

### Technical Decisions

| Decision | Rationale | Alternatives |
|----------|-----------|--------------|
| React + Tailwind | Rapid UI development, great ecosystem | Vue, Angular, SASS |
| MongoDB | Flexible schema for unstructured submissions | PostgreSQL, Firebase |
| Gemini API | Best multimodal capabilities at scale | OpenAI GPT-4, Claude |
| Leaflet | Open-source, lightweight | Google Maps API, Mapbox |
| Recharts | Native React, TypeScript | Chart.js, D3.js |
| Vercel + Render | Easy deployment, great DX | AWS, GCP, DigitalOcean |

### Final Notes

The technology stack is chosen to balance:
- **Rapid Development**: Perfect for hackathons and MVPs
- **Scalability**: Can grow from prototype to production
- **Maintainability**: Clean architecture, good tooling
- **Cost Efficiency**: Free tiers available for development
- **Community Support**: Large ecosystems and documentation

This stack provides a solid foundation for the PeoplePriority AI platform and allows for future expansion as requirements evolve.

