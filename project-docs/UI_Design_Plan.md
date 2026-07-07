# UI Design Plan for PeoplePriority AI

## Overview
This document provides detailed UI design sketches and planning for all main pages of the PeoplePriority AI platform. Each page includes layout structure, key components, and design guidelines.

---

## 1. Landing Page

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  NAVIGATION BAR                                                  │
│  [Logo]  [Home]  [Features]  [About]  [Login]  [Sign Up]       │
└─────────────────────────────────────────────────────────────────┘
│                                                                 │
│  HERO SECTION                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  "Your Voice, Your Priority"                              │ │
│  │  AI-powered constituency development platform             │ │
│  │                                                           │ │
│  │  [📝 Submit Complaint]  [👨‍⚖️ MP Login]                    │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  FEATURES GRID (3 columns)                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 🎯 Easy      │  │ 🤖 AI-Powered│  │ 📊 Smart     │          │
│  │ Submission   │  │ Analysis     │  │ Prioritization│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  AI WORKFLOW SECTION                                            │
│  [Step 1] Citizen submits → [Step 2] AI analyzes → [Step 3] Hotspots → [Step 4] Priority → [Step 5] MP Action│
│                                                                 │
│  FOOTER                                                         │
│  [Logo]  [Privacy Policy]  [Terms of Service]  [Contact]      │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Hero Section**
  - Large title with gradient text
  - Clear value proposition subtitle
  - Dual call-to-action buttons
  - Background illustration
- **Features Cards**
  - Icon + title + description
  - Hover animations
  - Responsive grid layout
- **Workflow Visualization**
  - Horizontal steps with arrows
  - Interactive on scroll
- **Footer**
  - Copyright info
  - Quick links

### Color Palette
- Primary: #2563eb (blue)
- Secondary: #10b981 (green)
- Accent: #f97316 (orange)
- Background: #f8fafc
- Text: #1e293b

---

## 2. Login/Register Page

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  [← Back to Home]                                               │
└─────────────────────────────────────────────────────────────────┘
│                                                                 │
│  CENTERED CARD LAYOUT                                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  PeoplePriority AI            [Login] [Register]          │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │                                                           │ │
│  │  [LOGIN FORM ACTIVE]                                      │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Email:                [__________________________]  │ │ │
│  │  │ Password:             [__________________________]  │ │ │
│  │  │ Forgot password?                                    │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  [ 🔐 Login with Google ]                                 │ │
│  │                                                           │ │
│  │  [ Login → ]                                             │ │
│  │                                                           │ │
│  │  Don't have an account? [Sign Up]                       │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Tabbed Interface**
  - Login and Register tabs
  - Smooth transitions
- **Form Fields**
  - Email with validation
  - Password with visibility toggle
  - Strong password indicator
- **Social Login**
  - Google OAuth button
- **Error States**
  - Field-level error messages
  - Global error display
- **Loading States**
  - Button spinner during login

### Validation Rules
- Email: Required, valid format
- Password: Min 8 chars, 1 uppercase, 1 number
- Register: Confirm password match

---

## 3. Citizen Dashboard

### Layout Structure (Sidebar + Main Content)
```
┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR           │      MAIN CONTENT AREA                    │
│  ┌─────────────┐  │  ┌───────────────────────────────────────┐│
│  │ Logo        │  │  │ Welcome Back, [Citizen Name]!        ││
│  ├─────────────┤  │  └───────────────────────────────────────┘│
│  │ [✓] Dashboard│  │                                         ││
│  │ My Complaints│  │  QUICK STATS CARDS (2x2 grid)          ││
│  │ Submit New  │  │  ┌────────────┐  ┌────────────┐        ││
│  │ Profile     │  │  │ Total:  5 │  │ Resolved: 2│        ││
│  │ Logout      │  │  └────────────┘  └────────────┘        ││
│  └─────────────┘  │  ┌────────────┐  ┌────────────┐        ││
│                   │  │ Pending: 2 │  │ Urgent:  1 │        ││
│                   │  └────────────┘  └────────────┘        ││
│                   │                                         ││
│                   │  RECENT COMPLAINTS LIST                ││
│                   │  ┌───────────────────────────────────┐││
│                   │  │ [P] Road Repair    05-07-2026    │││
│                   │  │ Category: Road | Priority: High │││
│                   │  ├───────────────────────────────────┤││
│                   │  │ [✓] Water Supply   03-07-2026    │││
│                   │  │ Category: Water | Priority: Med │││
│                   │  └───────────────────────────────────┘││
│                   │                                         ││
│                   │  [+ Submit New Complaint] (FAB)        ││
│                   │                                         ││
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Sidebar Navigation**
  - Collapsible on mobile
  - Active state indicator
  - User avatar/initials
- **Stats Dashboard**
  - Card-based layout
  - Percentage change indicators
  - Icon + number + trend
- **Complaints List**
  - Status indicators (Pending, In Review, Resolved)
  - AI summary preview
  - View details button
- **Floating Action Button**
  - Quick access to submit form

---

## 4. Submit Complaint Page

### Multi-Step Form Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard  [Step 1/4 - Basic Info]  [Next →]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STEP INDICATORS: [1 ●] → [2 ○] → [3 ○] → [4 ○]               │
│                                                                 │
│  FORM CARD                                                      │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Step 1: Complaint Details                                │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │                                                           │ │
│  │ Title: [___________________________]                     │ │
│  │ Description: [ _____________________________________ ]   │ │
│  │ [Max 500 chars] [423/500]                                │ │
│  │ Language: [▼ English ▼ Hindi ▼ Bengali ▼ Tamil ...]      │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Step 2: Media Upload
┌─────────────────────────────────────────────────────────────────┐
│ Upload Image (Optional)       Upload Voice (Optional)         │
│ ┌─────────────────────────┐  ┌─────────────────────────┐    │
│ │  Drop images here or   │  │  ⏺️ Record voice      │    │
│ │  click to browse       │  │  [Waveform visualizer] │    │
│ │                        │  │  [Play] [Delete]       │    │
│ │  [Preview thumbnail]   │  └─────────────────────────┘    │
│ └─────────────────────────┘                                  │
└─────────────────────────────────────────────────────────────────┘

Step 3: Location
┌─────────────────────────────────────────────────────────────────┐
│ 📍 Complaint Location                                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │                    INTERACTIVE MAP                          │ │
│ │                                                             │ │
│ │                  [Search Location]                          │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ Lat: 28.7041  Long: 77.1025                                    │
└─────────────────────────────────────────────────────────────────┘

Step 4: Review & Submit
┌─────────────────────────────────────────────────────────────────┐
│ 🔍 AI Preview (Auto-generated)                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Category: Road (98% confidence)                              │ │
│ │ Summary: Citizens report road damage with potholes...       │ │
│ │ Keywords: road, potholes, damage, safety                    │ │
│ │ Priority: High                                              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [✓ Edit Complaint]  [🚀 Submit Complaint]                       │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Progress Steps**
  - Visual step indicator
  - Completed steps checkmarks
- **Multilingual Support**
  - Language dropdown
  - Right-to-left support
- **Media Upload**
  - Drag & drop zone
  - Image preview
  - Voice recorder with waveform
- **Map Integration**
  - Leaflet map with pin
  - Search functionality
  - GPS auto-detect
- **AI Preview**
  - Real-time analysis display
  - Category with confidence
  - Generated summary
  - Priority indicator

---

## 5. MP Dashboard

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  SIDEBAR            │      MAIN CONTENT AREA                   │
│  ┌──────────────┐  │  ┌──────────────────────────────────────┐│
│  │ Logo         │  │  │ Welcome, [MP Name]!                  ││
│  ├──────────────┤  │  └──────────────────────────────────────┘│
│  │ [✓] Dashboard │  │                                         ││
│  │ Analytics    │  │  OVERVIEW CARDS (4 columns)            ││
│  │ Projects     │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     ││
│  │ Constituency │  │  │ 156 │ │ 23 │ │ 12 │ │ Road│     ││
│  │ Settings     │  │  │ Cmpl│ │Revie│ │Resol│ │ Top │     ││
│  │ Logout       │  │  └─────┘ └─────┘ └─────┘ └─────┘     ││
│  └──────────────┘  │                                         ││
│                    │  AI RECOMMENDATIONS (Priority List)     ││
│                    │  ┌───────────────────────────────────┐ ││
│                    │  │ #1  Road Repair (Score: 98/100)    │ ││
│                    │  │     📍 512 complaints, High priority│ ││
│                    │  │     [View Details] [Create Project] │ ││
│                    │  ├───────────────────────────────────┤ ││
│                    │  │ #2 Water Supply (Score: 92/100)   │ ││
│                    │  └───────────────────────────────────┘ ││
│                    │                                         ││
│                    │  HEATMAP PREVIEW + RECENT COMPLAINTS   ││
│                    │  ┌───────────────────────────────────┐ ││
│                    │  │          🗺️ Heatmap           │ ││
│                    │  │  [Expand to Full Analytics]        │ ││
│                    │  └───────────────────────────────────┘ ││
│                    │                                         ││
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Stats Grid**
  - 4 key metrics
  - Color-coded status indicators
  - Trend arrows
- **AI Recommendations**
  - Priority ranked list
  - Project category + score
  - Supporting evidence
  - Quick action buttons
- **Heatmap Preview**
  - Mini Leaflet map
  - Color intensity legend
  - Click to expand to analytics page
- **Recent Complaints Table**
  - Sortable columns
  - Filters (status, category, date)
  - Bulk actions
  - Export options

---

## 6. Analytics Page

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard  [Filters ▼] [Export 📊]                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FILTER BAR                                                    │
│  [Date Range: ▼ Last 30 days] [Category: ▼ All] [Status: ▼ All]│
│  [Apply Filters] [Reset]                                       │
│                                                                 │
│  CHARTS GRID (2x2)                                             │
│  ┌──────────────────────┐ ┌──────────────────────┐          │
│  │ Category Distribution│ │ Complaints Over Time │          │
│  │    [Pie Chart]      │ │    [Line Chart]       │          │
│  └──────────────────────┘ └──────────────────────┘          │
│  ┌──────────────────────┐ ┌──────────────────────┐          │
│  │ Priority Breakdown  │ │ Status Overview      │          │
│  │    [Bar Chart]      │ │    [Donut Chart]     │          │
│  └──────────────────────┘ └──────────────────────┘          │
│                                                                 │
│  FULL-SCREEN HEATMAP                                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │                  CONSTITUENCY HEATMAP                     │ │
│  │                                                           │ │
│  │      [🟥 High]  [🟨 Medium]  [🟩 Low]                  │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  DETAILED ANALYSIS TABLE                                       │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Location  │ Category  │ Count  │ Priority  │ Trend        │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components
- **Filters Bar**
  - Date range picker
  - Category dropdown
  - Status selector
  - Apply/Reset buttons
- **Charts (Recharts Library)**
  - Pie chart: Category distribution
  - Line chart: Complaints over time
  - Bar chart: Priority breakdown
  - Donut chart: Status overview
- **Interactive Heatmap**
  - Full-screen Leaflet map
  - Zoom/pan controls
  - Layer toggles
  - Click hotspot for details
- **Data Table**
  - Sortable columns
  - Pagination
  - Export to CSV
  - Search within results

---

## Component Organization

### Frontend Folder Structure (With Files)
```
frontend/src/
│
├── components/
│   ├── atoms/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Icon.jsx
│   │   └── Avatar.jsx
│   │
│   ├── molecules/
│   │   ├── FormField.jsx
│   │   ├── StatsCard.jsx
│   │   ├── ComplaintCard.jsx
│   │   ├── MapPin.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   │
│   ├── organisms/
│   │   ├── NavigationSidebar.jsx
│   │   ├── ComplaintForm.jsx
│   │   ├── HeatmapComponent.jsx
│   │   ├── ChartsContainer.jsx
│   │   ├── AIRecommendationList.jsx
│   │   └── VoiceRecorder.jsx
│   │
│   └── templates/
│       ├── PublicLayout.jsx
│       └── DashboardLayout.jsx
│
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── CitizenDashboard.jsx
│   ├── SubmitComplaintPage.jsx
│   ├── ComplaintDetailPage.jsx
│   ├── MPDashboard.jsx
│   ├── AnalyticsPage.jsx
│   ├── ProjectManagementPage.jsx
│   └── ProfilePage.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── complaintService.js
│   ├── aiService.js
│   └── fileUploadService.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useComplaints.js
│   ├── useAI.js
│   ├── useGeolocation.js
│   └── useMediaUpload.js
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   └── hero-illustration.svg
│   └── icons/
│
├── layouts/
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

### Backend Folder Structure (With Files)
```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   ├── aiController.js
│   │   ├── hotspotController.js
│   │   ├── projectController.js
│   │   └── analyticsController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Constituency.js
│   │   ├── CitizenSuggestion.js
│   │   ├── AIAnalysis.js
│   │   ├── DemandHotspot.js
│   │   ├── PublicDataset.js
│   │   ├── DevelopmentProject.js
│   │   └── PriorityRecommendation.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── hotspotRoutes.js
│   │   ├── projectRoutes.js
│   │   └── analyticsRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── fileUpload.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── priorityEngine.js
│   │   ├── hotspotService.js
│   │   └── notificationService.js
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   ├── geospatial.js
│   │   ├── cache.js
│   │   └── logger.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   │
│   └── server.js
│
├── uploads/
├── package.json
└── .env
```

---

## Design Guidelines

### Typography
- Headings: Inter, Bold/Semibold
- Body: Inter, Regular/Medium
- Font sizing: 12px, 14px, 16px, 18px, 24px, 32px, 48px

### Spacing
- Use 4px grid system
- Card padding: 24px
- Section margins: 32-64px

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Animation Guidelines
- Smooth transitions (200-300ms)
- Micro-interactions on hover
- Loading states with skeletons
- Page transitions

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader labels
- High contrast text
- Focus indicators visible

---

## UI/UX Checklist

### All Pages
- [ ] Consistent color scheme
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Accessibility features
- [ ] Clear navigation

### Landing Page
- [ ] Hero section
- [ ] Feature cards
- [ ] Workflow visualization
- [ ] Call-to-action buttons

### Login/Register
- [ ] Form validation
- [ ] Password visibility toggle
- [ ] Social login options
- [ ] Remember me option

### Citizen Dashboard
- [ ] Statistics overview
- [ ] Complaints list
- [ ] Status indicators
- [ ] Quick actions

### Submit Complaint
- [ ] Multi-step form
- [ ] Progress indicator
- [ ] Media upload
- [ ] Map integration
- [ ] AI preview

### MP Dashboard
- [ ] Key metrics
- [ ] AI recommendations
- [ ] Heatmap preview
- [ ] Recent complaints

### Analytics Page
- [ ] Interactive charts
- [ ] Filters
- [ ] Full heatmap
- [ ] Export functionality
