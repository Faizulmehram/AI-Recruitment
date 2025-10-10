# AI Recruitment Platform

A modern, full-stack AI-powered recruitment platform built with Next.js, React, and Tailwind CSS. This project streamlines job posting, candidate search, interview scheduling, and analytics for hiring teams.

## Features

- **Dashboard**: Central hub for job searches, candidate matching, interview schedules, and recent activity.
- **Sidebar Navigation**: Quick access to Jobs, Candidates, Interviews, Analytics, Settings, and Logout.
- **Top Bar (SearchBar)**: Search jobs, find candidates, and schedule interviews with one click.
- **Job Application Posting**: Generate and post job applications to multiple channels.
- **Candidate Search**: Filter and find candidates by skills, roles, and sources.
- **Interview Scheduling**: Manage and view upcoming interviews, sync with Google Calendar.
- **Recent Activity**: Track all platform actions and analytics in a dedicated view.
- **Authentication**: Login and signup pages with show/hide password and redirect logic.
- **Responsive UI**: Pixel-perfect, mobile-friendly layouts using Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router, SSR/CSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **Routing**: Next.js App Router
- **Image Optimization**: Next.js Image component
- **Icons**: Custom SVG assets

## Project Structure

```
project/
├── public/
│   └── assets/         # SVGs, images, logos
├── src/
│   └── app/
│       ├── components/ # Sidebar, SearchBar, SectionCard, etc.
│       ├── dashboard/  # Main dashboard page
│       ├── jobsearch/  # Job search page
│       ├── candidatesearch/ # Candidate search page
│       ├── interviewschedule/ # Interview schedule page
│       ├── jobapplicationpost/ # Job application post page
│       ├── recentactivity/ # Recent activity/analytics page
│       └── (auth)/     # Login, Signup, Home
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Key Components

- **Sidebar**: Fixed navigation, responsive, icon-based menu items.
- **SearchBar**: Top bar for job/candidate search and interview scheduling.
- **SectionCard**: Reusable card for dashboard features.
- **Tile**: Metric display with trend indicators.
- **Authentication**: Secure login/signup with redirects.

## Customization

- **Styling**: Modify Tailwind classes in component files for custom look.
- **Routing**: Add new pages in `src/app/` and update Sidebar/SearchBar for navigation.
- **Assets**: Place SVGs and images in `public/assets/`.

## Contributing

Pull requests and issues are welcome! Please follow conventional commit messages and ensure all code is linted and tested.

## License

MIT

---

For more details, see the code comments and individual component documentation.
