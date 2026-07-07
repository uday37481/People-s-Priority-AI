# UI/UX Documentation

## Part 1 – Design System & Project Structure

### Document Overview

This document outlines the complete UI/UX design for the PeoplePriority AI platform, including the design system, page layouts, user flows, and component organization.

### Design Philosophy

The design focuses on accessibility, simplicity, and trust. Citizens should be able to submit complaints effortlessly, while MPs should have clear, actionable insights to make data-driven decisions.

### Design Principles

- **Simplicity First**: Clean, intuitive interfaces that reduce cognitive load
- **Accessibility**: WCAG 2.1 AA compliant design for all users
- **Trustworthiness**: Transparent AI decisions with clear explanations
- **Consistency**: Uniform design patterns across all pages
- **Responsiveness**: Works seamlessly on mobile, tablet, and desktop

### User Experience Goals

- Citizens can submit complaints in under 2 minutes
- MPs can understand constituency priorities at a glance
- AI recommendations are explainable and trustworthy
- Multilingual support for diverse user base
- Offline-first capabilities for rural areas

### Visual Identity

Professional, government-friendly aesthetic with modern design elements. Balances trustworthiness with approachability.

### Color Palette

- **Primary Blue**: #2563eb (Trust, Professionalism)
- **Secondary Green**: #10b981 (Progress, Success)
- **Accent Orange**: #f97316 (Urgency, Attention)
- **Neutral Gray**: #64748b (Text, Secondary)
- **Background Light**: #f8fafc
- **Background Dark**: #0f172a
- **Success**: #22c55e
- **Warning**: #f59e0b
- **Error**: #ef4444
- **Info**: #3b82f6

### Typography

- **Headings**: Inter (Bold, Semibold)
- **Body**: Inter (Regular, Medium)
- **Scale**: 6px grid system
- **Line Height**: 1.5 (body), 1.2 (headings)
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 32px, 48px

### Icons

- **Library**: Lucide React
- **Style**: Outline, 24px default
- **Consistent iconography for actions**: Submit, View, Filter, Download

### Spacing System

4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px

### Shadows

- **Subtle**: 0 1px 2px rgba(0,0,0,0.05)
- **Medium**: 0 4px 6px rgba(0,0,0,0.1)
- **Large**: 0 10px 15px rgba(0,0,0,0.1)

### Border Radius

- **Small**: 6px
- **Medium**: 12px
- **Large**: 24px
- **Full**: 9999px

### Buttons

- **Primary**: Solid blue, white text
- **Secondary**: Outline, blue border
- **Ghost**: No border, blue text
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Active, Disabled

### Form Controls

- **Inputs**: Full width, clear labels, helper text
- **Validation**: Real-time with clear error messages
- **Multilingual**: Support for Hindi, English, and regional languages
- **File Uploads**: Drag & drop, preview functionality

### Cards

- **Consistent padding**: 24px
- **Subtle borders**: 1px #e2e8f0
- **Hover effects**: Subtle elevation
- **Content hierarchy**: Clear title, body, actions

### Layout System

- **Max width**: 1280px
- **Grid**: 12-column responsive grid
- **Gutters**: 24px
- **Breakpoints**: 360px, 640px, 768px, 1024px, 1280px

### Navigation Style

- **Desktop**: Sidebar navigation
- **Mobile**: Bottom navigation or hamburger menu
- **Active state**: Highlighted primary color
- **Icons + Text**: Clear visual + textual labels

### Responsive Strategy

- **Mobile-first approach**
- **Touch targets**: 48px minimum
- **Grid adapts** to screen size
- **Content reflows** for readability

### Frontend Folder Structure

```
frontend/src/
│
├── components/      # Reusable UI components
├── pages/           # Landing, Login, Dashboard, Analytics, etc.
├── services/        # Axios API services
├── hooks/           # Custom React hooks
├── context/         # Authentication & global state
├── assets/          # Images, icons, fonts
├── layouts/         # Common layouts (Public & Dashboard)
└── App.jsx          # Route configuration
```

### Component Organization

- **Atoms**: Buttons, Inputs, Icons, Typography
- **Molecules**: Form Fields, Cards, Navigation Items
- **Organisms**: Header, Footer, Complaint Form, Dashboard Grid
- **Templates**: Page layouts with placeholders
- **Pages**: Complete page implementations

---

## Part 2 – Landing Page + Login/Register

### Landing Page

#### Purpose

Introduce the platform to citizens and MPs, explain the value proposition, and guide them to login or register.

#### Hero Section

- **Headline**: "Your Voice, Your Priority"
- **Subheadline**: "AI-powered constituency development platform"
- **CTA Buttons**: "Submit Complaint", "MP Login"
- **Visual**: Illustration showing citizen-MP connection
- **Background**: Subtle gradient

#### Features Section

- 3-column grid on desktop, stacked on mobile
- Each feature: Icon + Title + Description
- Features:
  - Easy Complaint Submission (text, voice, image)
  - AI-Powered Analysis
  - Smart Priority Ranking
  - Transparent Decision Making
  - Real-time Updates
  - Multilingual Support

#### AI Workflow Section

- Visual step-by-step diagram
- Shows: Citizen Submits → AI Analyzes → Hotspots Detected → Priorities Ranked → MP Takes Action
- Interactive scroll reveal animation

#### Footer

- Logo + Tagline
- Quick Links
- Contact Info
- Privacy Policy
- Terms of Service
- Copyright

#### Components Used

- Hero Component
- FeatureCard Component
- WorkflowDiagram Component
- Footer Component

#### Responsive Behaviour

- **Mobile**: Full width, stacked content, touch-optimized
- **Tablet**: 2-column grid, adjusted spacing
- **Desktop**: 3-column grid, max-width container

#### User Flow

```
Landing Page
    │
    ├─→ Click "Submit Complaint" → Login Page (if not logged in)
    │
    └─→ Click "MP Login" → Login Page
```

### Login/Register

#### Layout

- Centered card layout
- Left: Branding, right: Form
- Mobile: Stacked, full width

#### Validation

- Real-time validation as user types
- Clear error messages below fields
- Password strength indicator
- Email format validation
- Required field indicators (*)

#### Authentication Flow

1. User enters credentials
2. Frontend validates inputs
3. API call to backend
4. JWT token received and stored
5. Redirect to appropriate dashboard
6. Show success toast notification

#### Error States

- Invalid credentials: Clear error message
- Network error: Retry button
- Server error: Friendly message, support contact
- Form validation: Field-level errors

#### Success States

- Toast notification: "Login successful!"
- Smooth transition to dashboard
- Welcome back message

#### Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader announcements
- High contrast for errors
- Focus indicators visible

---

## Part 3 – Citizen Dashboard + Submit Complaint

### Citizen Dashboard

#### Layout

- Sidebar navigation (left)
- Main content area (right)
- Mobile: Hamburger menu + bottom nav

#### Cards

- **Welcome Card**: Personalized greeting, quick stats
- **My Complaints**: List view with status badges
- **Recent Activity**: Timeline of updates
- **Quick Actions**: Fast access to submit, view status

#### Sidebar/Navbar

- Dashboard
- My Complaints
- Submit New
- Profile
- Logout
- Active state indicator

#### Complaint Summary

- Status badges (Pending, In Review, Resolved)
- Timeline with dates and updates
- AI analysis summary for each complaint
- View details button

#### Recent Complaints

- Table or card view
- Filter by status/date
- Search functionality
- Pagination if needed

#### Quick Actions

- Floating action button (mobile)
- "Submit New Complaint" button
- Quick links to frequently used sections

### Submit Complaint

#### Multi-step Form

1. **Basic Info**: Title, Description, Language
2. **Media**: Image/Voice upload
3. **Location**: Map selection
4. **Review**: AI preview + confirm

#### Voice Upload

- Record button with visual feedback
- Waveform visualization while recording
- Playback option
- Size limit indicator
- Format validation

#### Image Upload

- Drag & drop zone
- Preview thumbnail
- Multiple uploads support
- File type validation
- Size limit warning

#### Map Selection

- Interactive Leaflet map
- Search for location
- Pin drop for precise location
- Auto-detect GPS (with permission)
- Show constituency boundaries

#### AI Preview

- Real-time AI analysis preview
- Detected category
- Generated summary
- Keywords extracted
- Confidence score display

#### Validation

- Required fields checked
- Media size limits
- Location selection mandatory
- Description minimum length
- Language selection

#### Success Flow

1. Submit → Loading state
2. AI processing indicator
3. Success message
4. Option to view complaint or submit another
5. Redirect to dashboard

---

## Part 4 – MP Dashboard + Analytics Page

### MP Dashboard

#### Overview Cards

- **Total Complaints**: Number + trend indicator
- **Pending Review**: Action required count
- **Resolved This Month**: Success metric
- **Top Category**: Most frequent issue type
- Each card with icon + value + change percentage

#### Recent Complaints

- Data table with sorting
- Columns: ID, Citizen, Category, Date, Status, Priority
- Filter dropdowns
- Quick view modal option
- Bulk actions (if applicable)

#### AI Recommendations

- Priority-ranked list
- Each with rank, category, score, reason
- "View Details" button
- "Mark as Addressed" action
- AI explanation clearly visible

#### Priority Issues

- Heatmap preview thumbnail
- Top 3 hotspots listed
- Complaint count + severity
- Link to full analytics page

#### Heatmap Preview

- Mini interactive map
- Color-coded severity
- Hover tooltips
- Click to expand

### Analytics Page

#### Charts

- **Category Distribution**: Pie chart
- **Trend Over Time**: Line chart (weekly)
- **Priority Breakdown**: Bar chart
- **Status Overview**: Donut chart
- Built with Recharts
- Responsive, interactive tooltips

#### Filters

- Date range picker
- Category filter
- Constituency filter (if multiple)
- Apply button + reset button
- Saved filter presets

#### Heatmap

- Full-screen Leaflet map
- Layer controls
- Legend for severity colors
- Zoom/pan functionality
- Click hotspots for details

#### Category Analysis

- Detailed breakdown per category
- Complaint count + trend
- Corresponding infrastructure data
- AI-generated insights
- Actionable recommendations

#### Priority Analysis

- Complete ranked list
- Each with: Rank, Category, Score, Citizen Demand, Infrastructure Gap, Population Impact
- Sortable columns
- Export to CSV option
- AI reasoning displayed

#### Trend Analysis

- Historical data visualization
- Comparison periods
- Anomaly detection highlights
- Seasonal pattern notes
- Predictive insights (future)

### Empty States

- No complaints yet: Friendly illustration + "Submit first complaint" CTA
- No data selected: "Select filters to see data"
- Processing: Skeleton loaders matching content shape

### Error States

- Network error: "Could not load data" + Retry button
- Server error: "Something went wrong" + Contact support
- Permissions: "You don't have access" + Login prompt

### Loading States

- Skeleton loaders for all components
- Progress indicators for AI processing
- Spinner for data fetching
- Avoid layout shifts with skeleton matches

### Accessibility

- All charts have screen reader descriptions
- Keyboard navigable tables
- Focus management for modals
- High contrast text on charts
- Semantic HTML structure

### UI Flow Diagram

```
MP Login
    ↓
Dashboard Overview
    │
    ├─→ View Recent Complaints
    │       ↓
    │   Complaint Detail
    │       ↓
    │   Update Status / Add Note
    │
    ├─→ View AI Recommendations
    │       ↓
    │   Priority Details
    │       ↓
    │   Create Development Project
    │
    └─→ Analytics Page
            ↓
        Explore Data / Export
```

### Design Notes

- **Data density**: Balanced - not too cramped, not too spread out
- **Action visibility**: Important actions are prominent but not overwhelming
- **Information hierarchy**: Most important data most visible
- **Consistency**: Same patterns across dashboard sections
- **Performance**: Virtualized lists for large datasets, lazy loading

### Frontend Structure (as requested)

```
frontend/src/
│
├── components/      # Reusable UI components
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/           # Landing, Login, Dashboard, Analytics, etc.
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CitizenDashboard.jsx
│   ├── MpDashboard.jsx
│   ├── SubmitComplaint.jsx
│   ├── Analytics.jsx
│   └── Profile.jsx
├── services/        # Axios API services
│   ├── api.js
│   ├── auth.js
│   └── complaints.js
├── hooks/           # Custom React hooks
│   ├── useAuth.js
│   ├── useComplaints.js
│   └── useAI.js
├── context/         # Authentication & global state
│   └── AuthContext.jsx
├── assets/          # Images, icons, fonts
│   ├── images/
│   └── icons/
├── layouts/         # Common layouts (Public & Dashboard)
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
└── App.jsx          # Route configuration
```

