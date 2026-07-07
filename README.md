# 🏛️ People's Priorities

> **AI-Powered Constituency Development Planning Platform**

An intelligent multilingual platform that enables citizens to submit development requests while helping Members of Parliament (MPs) make data-driven constituency planning decisions using Artificial Intelligence.

---

# 📌 Overview

Members of Parliament receive thousands of development requests through multiple channels such as:

* 📄 Letters
* 💬 WhatsApp
* 📱 Social Media
* 🎙️ Voice Messages
* 🏢 Public Meetings
* 🌐 Grievance Portals

These requests are often scattered, duplicated, and difficult to analyze manually.

**People's Priorities** transforms these unstructured requests into actionable insights using AI. The platform collects citizen feedback, analyzes complaints, detects recurring issues, identifies geographic hotspots, and recommends high-priority development projects.

---

# 🎯 Problem Statement

There is currently no unified platform that can:

* Collect citizen feedback from multiple sources
* Understand complaints written in multiple languages
* Convert voice complaints into text
* Detect duplicate issues
* Identify complaint hotspots
* Generate AI-powered summaries
* Recommend development priorities for MPs

As a result, constituency development planning is often time-consuming, fragmented, and lacks data-driven decision support.

---

# 💡 Solution

People's Priorities provides a centralized AI-powered web application where citizens can submit complaints through:

* 📝 Text
* 🎤 Voice
* 🖼️ Images
* 📍 Location on Map

The platform uses Google Gemini AI to:

* Convert speech to text
* Understand multilingual complaints
* Categorize issues
* Generate concise summaries
* Detect recurring themes
* Estimate priority
* Identify duplicate complaints
* Recommend development projects

---

# ✨ Key Features

## 👥 Citizen Portal

* Secure Registration & Login
* Submit Complaints
* Voice Complaint Support
* Image Upload
* Interactive Map Location Selection
* Complaint History
* Complaint Status Tracking

---

## 🤖 AI Engine

* Speech-to-Text
* Complaint Categorization
* Multilingual Understanding
* AI Summarization
* Priority Detection
* Theme Extraction
* Duplicate Detection
* Development Recommendation Generation

---

## 🏛️ MP Dashboard

* Constituency Overview
* Complaint Analytics
* Interactive Charts
* Geographic Heatmap
* AI Insights
* Development Priority Recommendations
* Complaint Search & Filters

---

## ⚙️ Admin Dashboard

* User Management
* Complaint Moderation
* Category Management
* Platform Analytics
* AI Monitoring
* System Health Dashboard

---

# 🛠️ Technology Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | React.js, Tailwind CSS, React Router |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB Atlas, Mongoose              |
| Authentication | JWT (JSON Web Tokens)                |
| AI             | Google Gemini API                    |
| Maps           | Leaflet                              |
| Charts         | Recharts                             |
| Deployment     | Vercel, Render, MongoDB Atlas        |

---

# 🏗️ System Architecture

```text
                    Citizens
                        │
                        ▼
             React Frontend (Vercel)
                        │
                REST API (Express)
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
 MongoDB Atlas     Gemini API      Leaflet Maps
        │
        ▼
 AI Processed Complaint Database
        │
        ▼
 Analytics & Recommendation Engine
        │
        ▼
 MP Dashboard & Admin Dashboard
```

---

# 📂 Project Structure

```text
People's-Priorities/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── assets/
│       ├── layouts/
│       └── App.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
├── docs/
│   ├── PRD.md
│   ├── Features.md
│   ├── UIUX.md
│   ├── TechStack.md
│   └── AI_Instructions.md
│
└── README.md
```

---

# 🔄 Application Workflow

```text
Citizen
   │
   ▼
Register / Login
   │
   ▼
Submit Complaint
(Text / Voice / Image)
   │
   ▼
Location Selection
   │
   ▼
Backend Validation
   │
   ▼
Gemini AI Processing
   │
   ├── Speech-to-Text
   ├── Categorization
   ├── Summarization
   ├── Theme Extraction
   ├── Priority Detection
   └── Duplicate Detection
   │
   ▼
MongoDB Storage
   │
   ▼
Analytics Engine
   │
   ▼
MP Dashboard
   │
   ▼
Development Recommendations
```

---

# 🤖 AI Workflow

The AI engine performs the following operations:

1. Convert voice to text.
2. Detect the complaint language.
3. Translate if necessary.
4. Classify the complaint.
5. Generate an AI summary.
6. Detect recurring themes.
7. Estimate complaint priority.
8. Identify duplicate complaints.
9. Recommend suitable development initiatives.

---

# 🗺️ Core Modules

* Landing Page
* Login / Register
* Citizen Dashboard
* Submit Complaint
* MP Dashboard
* Analytics Dashboard

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Access Control (RBAC)
* Secure File Upload Validation
* HTTPS Deployment
* Input Validation & Sanitization
* Rate Limiting
* Environment Variable Management

---

# 📊 MVP Deliverables

* Citizen Complaint Portal
* AI Complaint Processing
* MP Analytics Dashboard
* Geographic Heatmap
* AI-Based Development Recommendations
* Admin Management Panel
* Cloud Deployment

---

# 🚀 Deployment

| Service  | Platform          |
| -------- | ----------------- |
| Frontend | Vercel            |
| Backend  | Render            |
| Database | MongoDB Atlas     |
| AI       | Google Gemini API |

---

# 📈 Future Enhancements

* WhatsApp Business Integration
* Mobile Applications (Android & iOS)
* Government API Integration
* Predictive Development Analytics
* AI Chat Assistant
* SMS Notifications
* Public Transparency Portal
* Multi-Constituency Support
* Offline Complaint Submission
* Advanced GIS Integration

---

# 👨‍💻 Team Roles

| Role               | Responsibilities                          |
| ------------------ | ----------------------------------------- |
| Product Manager    | Product planning and requirements         |
| Frontend Developer | UI/UX implementation                      |
| Backend Developer  | API development and business logic        |
| AI Engineer        | Gemini integration and prompt engineering |
| Database Engineer  | MongoDB schema design                     |
| QA Tester          | Functional and usability testing          |

---

# 📄 Documentation

Detailed project documentation is available in the `docs/` directory:

* **PRD.md** – Product Requirements Document
* **Features.md** – Functional Feature Specification
* **UIUX.md** – UI/UX Design Specification
* **TechStack.md** – Technical Architecture
* **AI_Instructions.md** – AI Implementation Guide

---

# 🎯 Vision

> **"Every citizen's voice should contribute to smarter, transparent, and data-driven constituency development."**

People's Priorities empowers elected representatives with AI-assisted insights while ensuring every citizen can participate in shaping the future of their constituency.

---

# 📜 License

This project is developed as part of a **National-Level Hackathon** for educational and demonstration purposes. The architecture is designed to be scalable for future government and public-sector adoption.

---

## ⭐ If you find this project useful, consider giving the repository a star!
