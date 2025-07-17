# AI-Powered Recruitment ATS System

## Overview
A comprehensive applicant tracking system with AI-powered candidate screening, automated sourcing capabilities, and all essential ATS features for modern recruitment workflows.

## How It Works

### 🔐 Authentication
- **Blink Auth Integration**: Secure login/signup with automatic user management
- **Role-based Access**: Different permissions for recruiters, hiring managers, and admins
- **Session Management**: Automatic token refresh and secure logout

### 📊 Core Features

#### 1. Dashboard
- Real-time metrics and KPIs
- Recent activity feed
- Quick actions and shortcuts
- Performance analytics overview

#### 2. Job Management
- Create and publish job postings
- Job template library
- Application tracking
- Job performance metrics

#### 3. Candidate Database
- Centralized candidate profiles
- Resume parsing and storage
- Contact history tracking
- Candidate scoring and notes

#### 4. AI-Powered Screening
- **Resume Analysis**: Automatic skill extraction and matching
- **Candidate Scoring**: AI-driven compatibility scoring (0-100)
- **Screening Questions**: Automated questionnaire generation
- **Bias Reduction**: Fair and consistent evaluation criteria

#### 5. LinkedIn-Style Sourcing
- **Advanced Search**: Filter by skills, experience, location, industry
- **Boolean Search**: Complex search queries for precise targeting
- **Bulk Actions**: Save, contact, or add multiple candidates
- **Source Tracking**: Track where candidates come from
- **Chrome Extension**: (Future) Browser extension for LinkedIn sourcing

#### 6. Pipeline Management
- **Kanban Board**: Drag-and-drop candidate movement
- **Stage Customization**: Define custom hiring stages
- **Automated Workflows**: Move candidates based on actions
- **Bulk Operations**: Process multiple candidates simultaneously

#### 7. Communication Center
- **Email Templates**: Pre-built and custom email templates
- **Automated Sequences**: Drip campaigns for candidate nurturing
- **Interview Scheduling**: Calendar integration for interviews
- **SMS Integration**: Text messaging for urgent communications

#### 8. Analytics & Reporting
- **Hiring Metrics**: Time-to-hire, cost-per-hire, source effectiveness
- **Pipeline Analytics**: Conversion rates by stage
- **Team Performance**: Individual recruiter statistics
- **Custom Reports**: Build reports for specific needs

## 🗄️ Database Schema

### Core Tables

```sql
-- Users (Blink Auth handles this automatically)
-- user_id, email, name, role, created_at, updated_at

-- Companies
companies: id, name, industry, size, location, created_at, updated_at

-- Jobs
jobs: id, title, description, requirements, location, salary_range, status, company_id, user_id, created_at, updated_at

-- Candidates
candidates: id, first_name, last_name, email, phone, resume_url, linkedin_url, current_title, current_company, location, source, ai_score, user_id, created_at, updated_at

-- Applications
applications: id, job_id, candidate_id, status, stage, applied_at, notes, user_id, created_at, updated_at

-- Pipeline Stages
pipeline_stages: id, job_id, name, order_index, color, created_at, updated_at

-- Communications
communications: id, candidate_id, type, subject, content, sent_at, user_id, created_at, updated_at

-- AI Screening Results
ai_screenings: id, candidate_id, job_id, score, skills_match, experience_match, analysis, user_id, created_at, updated_at

-- Interview Schedules
interviews: id, candidate_id, job_id, interviewer_id, scheduled_at, type, status, notes, user_id, created_at, updated_at
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Blink account (free tier available)
- Modern web browser

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access at `http://localhost:3000`

### Configuration
- **Authentication**: Handled automatically by Blink SDK
- **Database**: Uses Blink's built-in SQLite database
- **AI Features**: Powered by OpenAI integration through Blink
- **Email**: Blink's notification system for automated emails

## 💰 Cost Structure (Free Tier)

### Blink Free Plan Includes:
- ✅ Authentication system
- ✅ SQLite database (unlimited records)
- ✅ File storage for resumes
- ✅ AI integration (25 requests/month)
- ✅ Email notifications
- ✅ Hosting and deployment

### Upgrade Considerations:
- **Starter ($20/month)**: Private projects, custom domains, 100 AI requests
- **Pro ($50/month)**: Advanced AI models, 250 AI requests, priority support
- **Enterprise**: Custom pricing for high-volume usage

## 🔧 Technical Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Blink SDK** for all backend operations
- **SQLite** database with automatic backups
- **OpenAI** integration for AI features
- **Email** service for notifications

### Security
- **JWT Authentication** with automatic refresh
- **Role-based Access Control** (RBAC)
- **Data Encryption** at rest and in transit
- **GDPR Compliance** ready

## 📱 Mobile Support
- Fully responsive design
- Touch-optimized interface
- Offline capability for basic operations
- Progressive Web App (PWA) ready

## 🔮 Future Enhancements
- Chrome extension for LinkedIn sourcing
- Video interview integration
- Advanced AI matching algorithms
- Multi-language support
- API for third-party integrations
- Advanced reporting and analytics

## 📞 Support
- Documentation: Built-in help system
- Community: Discord support channel
- Email: support@blink.new for technical issues

---

**Built with ❤️ using Blink - The AI Full-Stack Engineer**