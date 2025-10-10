# AI Recruiting Platform

A modern recruiting platform powered by AI to find the right jobs, candidates, and matches in seconds.

This is a [Next.js](https://nextjs.org) project built with TypeScript, Tailwind CSS, and modern authentication features.

## Features

- 🤖 AI-powered job matching and candidate search
- 🔐 Secure authentication system with login/signup
- 📊 Interactive dashboard with real-time analytics
- 🎨 Modern, responsive design with custom components
- 📱 Mobile-friendly interface with adaptive layouts
- 🚀 Fast performance with Next.js 15 and Turbopack
- 🎯 Smart candidate-to-job matching algorithms
- 📅 Interview scheduling and management
- 📈 Activity tracking and reporting
- 🔍 Multi-source candidate search (LinkedIn, GitHub, News, Conferences)
- 📮 Multi-channel job posting (LinkedIn, X/Twitter, Email, Job Boards)

## Dashboard Features

The dashboard includes comprehensive recruitment tools:

### Job Search & Matching
- **Job Search for Candidate**: Search jobs based on candidate profiles or CV uploads
- **Candidate-to-Job Matching**: AI-powered ranking of candidates for specific job descriptions
- **Candidate Search**: Multi-source search with customizable filters
- **Job Application Post**: Multi-channel job posting automation

### Interview Management
- **Interview Schedule**: Visual calendar with interview status tracking
- **Real-time Updates**: Confirmed, Pending, Reschedule, and No-show Risk indicators
- **Quick Actions**: One-click join for video interviews

### Analytics & Activity
- **Real-time Metrics**: Track job searches, candidate searches, interviews, and response rates
- **Recent Activity Feed**: Categorized activity stream (Jobs, Interviews, Candidates)
- **Visual Trends**: Up/down indicators for performance metrics

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/           # Login page with form
│   │   ├── signup/          # Signup page
│   │   └── home/            # Authenticated home
│   ├── dashboard/           # Main dashboard
│   │   └── page.tsx         # Dashboard with analytics & tools
│   └── page.tsx             # Landing page
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar component
│   └── SearchBar.tsx        # Global search component
├── public/
│   └── assets/
│       ├── dashboard/
│       │   ├── vectors/     # SVG icons
│       │   ├── logos/       # Platform logos
│       │   └── People/      # Profile images
│       └── loginpage/       # Auth page assets
```

## Tech Stack

- **Framework:** Next.js 15 with App Router and Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom components
- **Font:** Inter (Google Fonts)
- **State Management:** React Hooks (useState)
- **Image Optimization:** Next.js Image component
- **Icons:** Custom SVG assets

## Key Components

### Sidebar
- Fixed navigation with hover effects
- Responsive design (collapsible on mobile)
- Icon-based menu items
- User profile section

### SearchBar
- Global search functionality
- SVG icon integration
- Responsive input styling

### Dashboard Cards
- **SectionCard**: Reusable card component for different features
- **Tile**: Metric display with trend indicators
- Interactive checkboxes with state management
- File upload functionality (CV/Resume)

## Pages

- **Landing Page** (`/`) - Welcome page with platform overview
- **Login** (`/login`) - User authentication with email/password
- **Signup** (`/signup`) - User registration
- **Home** (`/home`) - Authenticated user home
- **Dashboard** (`/dashboard`) - Main recruitment dashboard with:
  - Job search tools
  - Candidate matching
  - Interview scheduling
  - Activity tracking
  - Real-time analytics

## Responsive Design

The platform is fully responsive with breakpoints:
- **Desktop**: Full layout with sidebar and two-column grid
- **Tablet (< 1200px)**: Single column with reordered sections
- **Mobile (< 900px)**: Stacked cards for optimal mobile viewing

On smaller screens, the layout order is:
1. Four main feature cards
2. Interview schedule
3. Recent activity feed

## Development

You can start editing the pages by modifying files in the `src/app/` directory. The page auto-updates as you edit the file.

The project uses modern Next.js features:
- App Router for file-based routing
- Server and Client Components
- TypeScript for type safety
- Tailwind CSS for utility-first styling
- Image optimization with next/image
- Component-based architecture

## Current Branch: Dashboard

The `dashboard` branch contains the latest implementation of the recruitment dashboard with:
- Modular component architecture
- State-managed interactive features
- Multi-source candidate search
- Interview management system
- Real-time activity tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
