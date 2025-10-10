"use client";
import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Search,
  Upload,
  Users2,
  Download,
  Bell,
  CheckCircle2,
  AlertCircle,
  PencilLine,
  ChevronDown,
} from "lucide-react";

/**
 * Interview Schedule – single-file Next.js page
 * TailwindCSS + lucide-react icons. No external UI lib required.
 * Layout: left Filters sidebar, center list of scheduled interviews,
 * right sidebar with Upcoming Interviews + AI Suggestions.
 */

const TABS = ["All", "Today", "This Week", "Reschedule Requests", "No-show Risk"] as const;

type Tab = typeof TABS[number];

type Interview = {
  id: string;
  candidate: string;
  title: string;
  status: "Confirmed" | "Pending" | "Reschedule" | "No-show Risk";
  date: string; // e.g., "Today, 2:00 PM"
  stage: string; // e.g., "Technical Interview"
  owner: string; // e.g., "Miko Johnson"
  location?: string;
};

const INTERVIEWS: Interview[] = [
  {
    id: "1",
    candidate: "Sarah Chen",
    title: "Senior React Developer",
    status: "Confirmed",
    date: "Today, 2:00 PM",
    stage: "Technical Interview",
    owner: "Miko Johnson",
    location: "Remote",
  },
  {
    id: "2",
    candidate: "Alex Rodriguez",
    title: "Product Manager",
    status: "Pending",
    date: "Today, 4:00 PM",
    stage: "Final Interview",
    owner: "Lisa Wang",
    location: "NY Office",
  },
  {
    id: "3",
    candidate: "James Wilson",
    title: "Backend Engineer",
    status: "Reschedule",
    date: "Tomorrow, 9:00 AM",
    stage: "System Design",
    owner: "Sarah Miller",
    location: "Toronto, 500 King St",
  },
  {
    id: "4",
    candidate: "Maria Garcia",
    title: "Data Scientist",
    status: "No-show Risk",
    date: "Friday, 11:00 AM",
    stage: "Technical Assessment",
    owner: "Tom Brown",
    location: "Remote",
  },
];

const UPCOMING = [
  { name: "Sarah Chen", time: "Today, 2:00 PM", badge: "Confirmed" },
  { name: "James Wilson", time: "Tomorrow, 9:00 AM", badge: "Pending" },
  { name: "Alex Rodriguez", time: "Today, 4:00 PM", badge: "Pending" },
];

export default function InterviewSchedulePage() {
  const [active, setActive] = useState<Tab>("All");
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <span className="mx-2 select-none">/</span>
            <h1 className="text-base font-semibold text-gray-900">Interview Schedule</h1>
          </div>

          {/* Search + Open Calendar */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search candidates, roles or interviewers..."
                className="w-full rounded-xl border bg-white px-9 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black">
              <Calendar className="h-4 w-4" /> Open Calendar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  active === t
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[280px,1fr,320px]">
        {/* Left Sidebar – Filters */}
        <aside className="sticky top-[84px] h-max space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Filters</h2>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Date Range</label>
              <button className="flex w-full items-center justify-between rounded-lg border px-3 py-2 hover:bg-gray-50">
                <span>Select Date Range</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">Role/Job</label>
              <select className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Role</option>
                <option>Frontend Developer</option>
                <option>Backend Engineer</option>
                <option>Product Manager</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">Candidate Name</label>
              <input placeholder="Search Candidate..." className="w-full rounded-lg border px-3 py-2" />
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">Status</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
                  { label: "Pending", color: "bg-amber-100 text-amber-700" },
                  { label: "Reschedule", color: "bg-blue-100 text-blue-700" },
                  { label: "No-show Risk", color: "bg-rose-100 text-rose-700" },
                ].map((s) => (
                  <label key={s.label} className="inline-flex items-center gap-2 rounded-lg border px-2 py-1 text-xs">
                    <input type="checkbox" defaultChecked className="rounded" /> {s.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">Interview Owner</label>
              <select className="w-full rounded-lg border px-3 py-2">
                <option>Select Owner</option>
                <option>Miko Johnson</option>
                <option>Lisa Wang</option>
                <option>Sarah Miller</option>
                <option>Tom Brown</option>
              </select>
            </div>
          </div>

          <div className="mt-2 border-t pt-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Google/Outlook calendar integration
            </div>
          </div>
        </aside>

        {/* Center – Scheduled Interviews */}
        <section className="space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-700">{INTERVIEWS.length} Interviews scheduled</p>

            <div className="mt-3 space-y-3">
              {INTERVIEWS.filter((i) =>
                query
                  ? `${i.candidate} ${i.title} ${i.owner}`
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  : true
              ).map((item) => (
                <article
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border px-3 py-3 hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    {/* Avatar */}
                    <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-gray-200" />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-gray-900">{item.candidate}</h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            item.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : item.status === "Reschedule"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-gray-500">{item.title}</p>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1">
                          <Clock3 className="h-3.5 w-3.5" /> {item.date}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1">
                          <Users2 className="h-3.5 w-3.5" /> {item.stage}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1">
                          <PencilLine className="h-3.5 w-3.5" /> Owner: {item.owner}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1">
                          <MapPin className="h-3.5 w-3.5" /> {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50">Join</button>
                    <button className="inline-flex items-center justify-center rounded-lg border px-2 py-1.5 text-xs hover:bg-gray-50">
                      Actions <ChevronDown className="ml-1 h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Sync Settings
              </div>
              <span className="text-gray-300">•</span>
              <span>Google/Outlook calendar integration</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50">
                <Download className="h-4 w-4" /> Export CSV
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 font-medium text-white hover:bg-black">
                <Bell className="h-4 w-4" /> Send Reminder
              </button>
            </div>
          </div>
        </section>

        {/* Right Sidebar – Upcoming & AI Suggestions */}
        <aside className="sticky top-[84px] h-max space-y-4">
          {/* Upcoming Interviews */}
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Interviews</h3>
            <div className="mt-3 space-y-3">
              {UPCOMING.map((u, idx) => (
                <div key={idx} className="flex items-start justify-between rounded-lg border px-3 py-2">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{u.time}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      u.badge === "Confirmed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {u.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="space-y-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold">AI Suggestions</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
                  <p className="font-medium">Best Times to Schedule</p>
                  <p className="text-xs text-blue-900/80">Thursdays 2–4 PM show increased attendance.</p>
                </div>
                <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-3">
                  <p className="font-medium">No-show Risk Alert</p>
                  <p className="text-xs text-rose-900/80">New candidates with 2 prior no-shows. Consider pre-confirmation reminders.</p>
                </div>
                <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-3">
                  <p className="font-medium">Feedback Templates</p>
                  <p className="text-xs text-emerald-900/80">Use structured templates for consistent interview feedback.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
