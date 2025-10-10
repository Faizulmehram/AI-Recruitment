"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  MoreHorizontal,
  User2,
  FileText,
  MessageSquareText,
  BriefcaseBusiness,
  ClipboardCheck,
} from "lucide-react";

/**
 * Recent Activity — Pixel-accurate page built with TailwindCSS.
 * Drop this component into app/(routes)/recent-activity/page.tsx in a Next.js app.
 *
 * Requirements:
 * - TailwindCSS configured in your project
 * - lucide-react installed (npm i lucide-react)
 */
export default function RecentActivityPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [query, setQuery] = useState("");

  const tabs = [
    { key: "All", label: "All", count: 497, color: "bg-slate-900 text-white" },
    { key: "Jobs", label: "Jobs", count: 72, color: "bg-sky-100 text-sky-700" },
    { key: "Candidates", label: "Candidates", count: 138, color: "bg-emerald-100 text-emerald-700" },
    { key: "Offers", label: "Offers", count: 5, color: "bg-amber-100 text-amber-700" },
    { key: "Interviews", label: "Interviews", count: 68, color: "bg-violet-100 text-violet-700" },
    { key: "Notes", label: "Notes/Comments", count: 4, color: "bg-fuchsia-100 text-fuchsia-700" },
  ];

  type Activity = {
  id: number;
  type: "job" | "candidate" | "interview" | "offer" | "note";
  title: string;
  subtitle: string;
  by: string;
  time: string;
  accent: string; // tailwind color
  icon: React.ReactNode;
  image: string;
  };

  const activities: Activity[] = [
    {
      id: 1,
      type: "job",
      title: "Job posted — Senior UX Designer",
      subtitle: "",
      by: "Sarah Johnson",
      time: "Today, 2:03 PM",
      accent: "bg-sky-100 text-sky-700",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
      image: "/assets/dashboard/people/1af2086220affecd5f498aeca93f64918a91bf86.jpg"
    },
    {
      id: 2,
      type: "candidate",
      title: "Candidate added — Alex Wilson",
      subtitle: "",
      by: "Mika Chen",
      time: "Monday, 5:32 PM",
      accent: "bg-emerald-100 text-emerald-700",
      icon: <User2 className="h-4 w-4" />,
      image: "/assets/dashboard/people/30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg"
    },
    {
      id: 3,
      type: "interview",
      title: "Interview scheduled — Frontend Developer position",
      subtitle: "",
      by: "Lisa Brown",
      time: "Wednesday, 9:20 AM",
      accent: "bg-violet-100 text-violet-700",
      icon: <Calendar className="h-4 w-4" />,
      image: "/assets/dashboard/people/389d48c3df5ee8b67ef377543c9b31f0e430e2a6.jpg"
    },
    {
      id: 4,
      type: "offer",
      title: "Offer sent — Product Manager",
      subtitle: "",
      by: "Justin Smith",
      time: "Tuesday, 2:07 PM",
      accent: "bg-amber-100 text-amber-700",
      icon: <ClipboardCheck className="h-4 w-4" />,
      image: "/assets/dashboard/people/65be568fc2c1207c7799d895e6d7cb113b985966.jpg"
    },
    {
      id: 5,
      type: "note",
      title: "Note added — Interview feedback for David Kim",
      subtitle: "",
      by: "Sarah Johnson",
      time: "Monday, 10:29 PM",
      accent: "bg-fuchsia-100 text-fuchsia-700",
      icon: <MessageSquareText className="h-4 w-4" />,
      image: "/assets/dashboard/people/6a98e81b28b333039b432776eb354412dfc36db6.jpg"
    },
  ];

  const filtered = useMemo(() => {
    const narrowed = activeTab === "All" ? activities : activities.filter(a =>
      (activeTab === "Jobs" && a.type === "job") ||
      (activeTab === "Candidates" && a.type === "candidate") ||
      (activeTab === "Offers" && a.type === "offer") ||
      (activeTab === "Interviews" && a.type === "interview") ||
      (activeTab.startsWith("Notes") && a.type === "note")
    );
    if (!query.trim()) return narrowed;
    return narrowed.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.by.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeTab, query]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-3">
            <button className="inline-flex items-center rounded-full p-1.5 hover:bg-neutral-100" aria-label="Back" onClick={() => window.history.back()}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Recent Activity</h1>

            {/* Search */}
            <div className="relative ml-auto hidden w-full max-w-md items-center md:flex">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activities by candidates, jobs, or users…"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-300 focus:bg-white"
              />
            </div>

            {/* Actions */}
            <div className="ml-auto md:ml-3 flex items-center gap-2">
              <button className="hidden sm:inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                <Calendar className="h-4 w-4" />
                <span className="hidden lg:inline">Date Range</span>
              </button>
              <button className="hidden sm:inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50">
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Export</span>
              </button>
              <button className="inline-flex sm:hidden items-center gap-2 rounded-md border border-neutral-200 bg-white p-2 text-sm font-medium hover:bg-neutral-50">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-5 lg:px-8">
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'All' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700 border border-gray-200'}`} onClick={() => setActiveTab('All')}>All (47)</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'Jobs' ? 'bg-blue-100 text-blue-700' : 'bg-white text-blue-700 border border-gray-200'}`} onClick={() => setActiveTab('Jobs')}>Jobs (12)</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'Candidates' ? 'bg-green-100 text-green-700' : 'bg-white text-green-700 border border-gray-200'}`} onClick={() => setActiveTab('Candidates')}>Candidates (18)</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'Offers' ? 'bg-yellow-100 text-yellow-700' : 'bg-white text-yellow-700 border border-gray-200'}`} onClick={() => setActiveTab('Offers')}>Offers (5)</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'Interviews' ? 'bg-purple-100 text-purple-700' : 'bg-white text-purple-700 border border-gray-200'}`} onClick={() => setActiveTab('Interviews')}>Interviews (8)</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm whitespace-nowrap ${activeTab === 'Notes' ? 'bg-white text-gray-700 border border-gray-200' : 'bg-white text-gray-700 border border-gray-200'}`} onClick={() => setActiveTab('Notes')}>Notes/Comments (4)</button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="rounded-xl border border-neutral-200 bg-white p-2 sm:p-3">
              <ul className="flex flex-col divide-y divide-gray-200">
                {filtered.map((a) => (
                  <li key={a.id} className="flex items-start gap-2 sm:gap-4 px-2 py-4 sm:px-5 sm:py-5">
                    {/* Person image */}
                    <img src={a.image} alt={a.by} className="mt-1 h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-neutral-200" />
                    {/* Leading badge */}
                    <div className={`mt-1 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${a.accent}`}>
                      {a.icon}
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <p className="truncate text-sm sm:text-base font-semibold text-neutral-900">{a.title}</p>
                        <button className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-neutral-50 self-start sm:self-auto whitespace-nowrap">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" /> View
                        </button>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-500">
                        <span>by {a.by}</span>
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />
                        <span>{a.time}</span>
                      </div>
                    </div>
                    <button className="hidden sm:block ml-2 rounded-md p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 p-2 sm:p-3">
                <button className="mx-auto block rounded-md border border-neutral-200 bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-neutral-50">
                  Load More Activities
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-4">
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-3 sm:mb-4">Activity Details</h2>
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-blue-700">
                    <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5" /> Job Posted
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900">Senior UX Designer</h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600">
                  Full-time position in San Francisco with competitive salary and benefits package.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-500">
                  <img src="/assets/dashboard/people/1af2086220affecd5f498aeca93f64918a91bf86.jpg" alt="Sarah Johnson" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover border border-neutral-200" />
                  <span>by Sarah Johnson</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span className="flex items-center gap-1"><Calendar className="inline h-3 w-3 sm:h-4 sm:w-4" /> Today, 2:00 PM</span>
                </div>
                <hr className="my-3 sm:my-4 border-neutral-200" />
                <h4 className="text-sm sm:text-base font-semibold text-neutral-900 mb-2 sm:mb-3">Quick Actions</h4>
                <div className="space-y-2 sm:space-y-3">
                  <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold text-neutral-900 hover:bg-neutral-50">
                    <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5" /> View Job Details
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold text-neutral-900 hover:bg-neutral-50">
                    <MessageSquareText className="h-4 w-4 sm:h-5 sm:w-5" /> Add Notes
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
