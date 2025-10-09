"use client";

import { useState } from "react";

import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";

/* ---------- small UI helpers ---------- */
function SidebarItem({
  icon,
  label,
  active = false,   
}: { icon: string; label: string; active?: boolean }) {
  return (
    <button
      className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14px] ${
        active ? "bg-[#0b1227] text-white" : "text-[#0f172a] hover:bg-slate-100"
      }`}
    >
      <span className="inline-grid h-5 w-5 place-items-center">
        <Image
          src={`/assets/loginpage/dashboard/vectors/${icon}.svg`}
          alt=""
          width={18}
          height={18}
          className={active ? "invert" : ""}
        />
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function Tile({
  title,
  primary,
  delta,
}: { title: string; primary: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <div className="text-[34px] font-semibold leading-none tracking-tight">
        {primary}
      </div>
  <div className="mt-1 text-[13px] text-slate-800 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</div>
      <div className={`mt-1 flex items-center gap-1 text-[12px] ${delta === '3% vs last 7d' ? 'text-red-500' : 'text-emerald-600'}`}>
        {delta === '3% vs last 7d' ? (
          <span className="inline-block align-middle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3,17l6.79-6.79a1,1,0,0,1,1.42,0l2.58,2.58a1,1,0,0,0,1.42,0L21,7" style={{fill: 'none', stroke: '#ef4444', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></path>
              <polyline points="3 13 3 17 7 17" style={{fill: 'none', stroke: '#ef4444', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></polyline>
            </svg>
          </span>
        ) : (
          <span className="inline-block align-middle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21,7l-6.79,6.79a1,1,0,0,1-1.42,0l-2.58-2.58a1,1,0,0,0-1.42,0L3,17" style={{fill: 'none', stroke: '#10b981', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></path>
              <polyline points="21 11 21 7 17 7" style={{fill: 'none', stroke: '#10b981', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></polyline>
            </svg>
          </span>
        )}
        <span>{delta}</span>
      </div>
    </div>
  );
}

function SectionCard({
  children,
  title,
  icon,
}: { children: React.ReactNode; title: string; icon: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
        <Image src={icon} alt="" width={18} height={18} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- page ---------- */
export default function DashboardPage() {
  const channelOptions = [
    {
      label: "LinkedIn",
      logo: "/assets/dashboard/logos/Linkedin.png",
    },
    {
      label: "X (Twitter)",
      logo: "/assets/dashboard/logos/x%20logo.jpg",
    },
    {
      label: "Email",
      logo: "/assets/dashboard/logos/mail%20logo.jpg",
    },
    {
      label: "Job Boards",
      logo: "/assets/dashboard/logos/job_board_logo.png",
    },
  ];

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  function handleChannelChange(label: string) {
    setSelectedChannels((prev: string[]) => {
      if (prev.includes(label)) {
        return prev.filter((l: string) => l !== label);
      } else {
        return [...prev, label];
      }
    });
  }

  const candidateSources = [
    { name: "LinkedIn", sub: "2.3M profiles" },
    { name: "GitHub", sub: "890K profiles" },
    { name: "News", sub: "45K profiles" },
    { name: "Conferences", sub: "12K profiles" },
  ];

  const [selectedCandidateSources, setSelectedCandidateSources] = useState<string[]>([]);

  function handleCandidateSourceChange(name: string) {
    setSelectedCandidateSources((prev: string[]) => {
      if (prev.includes(name)) {
        return prev.filter((n: string) => n !== name);
      } else {
        return [...prev, name];
      }
    });
  }
  // People images (spaces are URL-encoded)
  const headshots = {
    sarah:
      "/assets/dashboard/People/1af2086220affecd5f498aeca93f64918a91bf86.jpg",
    alex:
      "/assets/dashboard/People/30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg",
    emma:
      "/assets/dashboard/People/389d48c3df5ee8b67ef377543c9b31f0e430e2a6.jpg",
    james:
      "/assets/dashboard/People/65be568fc2c1207c7799d895e6d7cb113b985966.jpg",
    maria:
      "/assets/dashboard/People/6a98e81b28b333039b432776eb354412dfc36db6.jpg",
    // extra generic (kept for activity feed variety)
    extra:
      "/assets/dashboard/People/fd3d4c48a8b689cbbfb343fe22651fcb4dc1c2e0.jpg",
  } as const;

  const stats = [
    { primary: "47", title: "Job Searches", delta: "12% vs last 7d" },
    { primary: "124", title: "Candidate Searches", delta: "12% vs last 7d" },
    { primary: "128", title: "Jobs Found", delta: "3% vs last 7d" },
    { primary: "12", title: "Candidates Found", delta: "15% vs last 7d" },
    { primary: "18", title: "Interviews", delta: "2 days vs last 30d" },
    { primary: "73%", title: "Response Rate", delta: "5% vs last 7d" },
  ];

  const activity = [
    {
      tag: "candidate",
      title: "New candidate applied — Senior React Developer",
      body: "Applied via LinkedIn with 5+ years experience.",
      by: "Sarah Chen",
      time: "2 mins ago",
      avatar: headshots.extra,
    },
    {
      tag: "interview",
      title: "Interview scheduled — Product Manager Role",
      body: "Technical interview set for tomorrow 2:00 PM",
      by: "Mike Johnson",
      time: "15 mins ago",
      avatar: headshots.extra,
    },
    {
      tag: "job",
      title: "Job posted — UX Designer Position",
      body: "Posted to LinkedIn and company careers page",
      by: "Lisa Wang",
      time: "1 hour ago",
      avatar: headshots.extra,
    },
    {
      tag: "candidate",
      title: "Candidate shortlisted — Backend Engineer",
      body: "Moved to final interview stage",
      by: "David Kim",
      time: "2 hours ago",
      avatar: headshots.extra,
    },
    {
      tag: "interview",
      title: "Interview completed — Data Scientist Role",
      body: "Technical assessment completed successfully",
      by: "Emma Thompson",
      time: "3 hours ago",
      avatar: headshots.extra,
    },
    {
      tag: "job",
      title: "Job application deadline — Frontend Developer",
      body: "Application deadline reached – 47 applications received",
      by: "System",
      time: "4 hours ago",
      avatar: headshots.extra,
    },
    {
      tag: "candidate",
      title: "Candidate profile — Marketing Manager",
      body: "Added portfolio links and references",
      by: "Tom Brown",
      time: "5 hours ago",
      avatar: headshots.extra,
    },
    {
      tag: "interview",
      title: "Interview rescheduled — DevOps Engineer Role",
      body: "Moved from today to Friday due to candidate availability",
      by: "Sarah Miller",
      time: "6 hours ago",
      avatar: headshots.extra,
    },
  ];

  return (
    <div className="flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* sidebar */}
      <Sidebar />

      {/* main */}
      <main className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-5">
        {/* top bar */}
        <SearchBar />

        {/* stats */}
        <div className="mt-6 grid grid-cols-6 gap-4 max-[1200px]:grid-cols-3 max-[760px]:grid-cols-2">
          {stats.map((s) => (
            <Tile key={s.title} {...s} />
          ))}
        </div>

        {/* left (cards + schedule) | right (activity) */}
        <div className="mt-6 grid grid-cols-[1fr_360px] gap-5 max-[1200px]:grid-cols-1">
          {/* LEFT: two cards wide; schedule full width directly under them */}
          <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1 max-[1200px]:order-1">
            {/* Job Search for Candidate */}
            <SectionCard
              title="Job Search for Candidate"
              icon="/assets/dashboard/vectors/job.svg"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-[13px] font-medium text-slate-700">
                    Describe the candidate or role
                  </div>
                  <textarea
                    rows={3}
                    placeholder="e.g., Senior React developer with 5+ years experience, looking for remote opportunities in fintech…"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-slate-700">
                    Upload CV
                  </div>
                  <div className="mt-2 grid place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    {/* Removed upload image from CV upload box */}
                    <form>
                      <label htmlFor="cv-upload" className="mt-3 block cursor-pointer text-[13px] text-slate-500">
                        Drag & drop CV here, or <span className="text-sky-600 underline">browse here</span>
                        <input
                          id="cv-upload"
                          name="cv-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              alert(`Selected file: ${e.target.files[0].name}`);
                            }
                          }}
                        />
                      </label>
                      <div className="text-[11px] text-slate-400 mt-1">
                        PDF, DOC, DOCX up to 10MB
                      </div>
                    </form>
                  </div>
                </div>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1227] px-4 py-2.5 text-[13px] text-white hover:bg-[#0f1a38]">
                  <Image
                    src="/assets/dashboard/vectors/search.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Find Matching Jobs
                </button>
              </div>
            </SectionCard>

            {/* Candidate-to-Job Matching */}
            <SectionCard
              title="Candidate-to-Job Matching"
              icon="/assets/dashboard/vectors/candidates.svg"
            >
              <div className="space-y-3">
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Write job description…"
                />
                <div className="text-[12px] text-slate-500">Recent Jobs</div>
                <div className="flex flex-wrap gap-2">
                  {["Frontend Developer", "UX Designer", "Data Scientist"].map(
                    (t) => (
                      <button
                        key={t}
                        className="rounded-lg px-2 py-1 text-[11px] bg-[#0b1227] text-white transition duration-150 ease-in-out hover:bg-[#0f1a38] hover:scale-105 focus:outline-none"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-2 grid place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  {/* Removed upload image from CV upload box */}
                  <form>
                    <label htmlFor="candidate-cv-upload" className="mt-9 block cursor-pointer text-[13px] text-slate-500">
                      Upload <span className="font-medium">Candidate</span> CV
                      <span className="text-sky-600 underline"> (browse here)</span>
                      <input
                        id="candidate-cv-upload"
                        name="candidate-cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            alert(`Selected file: ${e.target.files[0].name}`);
                          }
                        }}
                      />
                    </label>
                    <div className="text-[11px] text-slate-400 mt-1">
                      PDF, DOC, DOCX up to 10MB
                    </div>
                  </form>
                </div>

                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1227] px-4 py-2.5 text-[13px] text-white hover:bg-[#0f1a38]">
                  <Image
                    src="/assets/dashboard/vectors/play.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Run Ranking
                </button>
              </div>
            </SectionCard>

            {/* Candidate Search */}
            <SectionCard
              title="Candidate Search"
              icon="/assets/dashboard/vectors/candidates.svg"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-[13px] font-medium text-slate-700">
                    Search Query
                  </div>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Search for candidates by role, skills, or keywords…"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {candidateSources.map((s, idx) => (
                    <label
                      key={s.name}
                      htmlFor={`candidate-source-${idx}`}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-[13px] shadow-[0_1px_0_#eef2f7] cursor-pointer transition hover:bg-slate-100 hover:scale-[1.03]"
                      style={{ userSelect: 'none' }}
                    >
                      <input
                        type="checkbox"
                        id={`candidate-source-${idx}`}
                        className="accent-[#0b1227]"
                        checked={selectedCandidateSources.includes(s.name)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCandidateSourceChange(s.name);
                        }}
                      />
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500">
                  Active Sources{" "}
                  {selectedCandidateSources.length === 0 ? null : (
                    selectedCandidateSources.map((name, i) => (
                      <span key={name} className={`ml-${i > 0 ? 1 : 2} rounded-md bg-slate-100 px-2 py-[2px]`}>
                        {name}
                      </span>
                    ))
                  )}
                </div>

                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1227] px-4 py-2.5 text-[13px] text-white hover:bg-[#0f1a38]">
                  <Image
                    src="/assets/dashboard/vectors/search.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Search Candidates
                </button>
              </div>
            </SectionCard>

            {/* Job Application Post */}
            <SectionCard
              title="Job Application Post"
              icon="/assets/dashboard/vectors/paperplane.svg"
            >
              <div className="space-y-3">
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Write job description…"
                />

                <div className="text-[12px] font-medium text-slate-700">
                  Channels
                </div>
                  <div className="grid grid-cols-2 gap-3">
                    {channelOptions.map((c, idx) => (
                      <label
                        key={c.label}
                        htmlFor={`channel-checkbox-${idx}`}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 cursor-pointer shadow-[0_1px_0_#eef2f7] transition hover:bg-slate-100 hover:scale-[1.03]"
                        style={{ userSelect: 'none' }}
                      >
                        <input
                          type="checkbox"
                          id={`channel-checkbox-${idx}`}
                          className="accent-[#0b1227]"
                          checked={selectedChannels.includes(c.label)}
                          onChange={() => handleChannelChange(c.label)}
                        />
                        <Image
                          src={c.logo}
                          alt=""
                          width={18}
                          height={18}
                          className="rounded"
                        />
                        <span className="text-[12px] font-medium">{c.label}</span>
                      </label>
                    ))}
                  </div>

                <div className="text-[11px] text-slate-500">
                  Active Sources:{" "}
                  {selectedChannels.length === 0 ? null : (
                    selectedChannels.map((label, i) => (
                      <span key={label} className={`ml-${i > 0 ? 1 : 2} rounded-md bg-slate-100 px-2 py-[2px]`}>
                        {label}
                      </span>
                    ))
                  )}
                </div>

                <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1227] px-4 py-2.5 text-[13px] text-white hover:bg-[#0f1a38]">
                  <Image
                    src="/assets/dashboard/vectors/upload.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="invert"
                  />
                  Generate and Post
                </button>
              </div>
            </SectionCard>

            {/* Interview Schedule (FULL WIDTH, right under the four cards) */}
            <div className="col-span-2 max-[900px]:col-span-1 max-[1200px]:order-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[15px] font-semibold">
                    <Image
                      src="/assets/dashboard/vectors/interview.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                    Interview Schedule
                  </div>
                  <button className="rounded-lg bg-[#0b1227] text-white px-3 py-1.5 text-[12px] hover:bg-[#0f1a38]">
                    Open Calendar ↗
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "Sarah Chen",
                      role: "Senior React Developer",
                      when: "Today, 2:00 PM",
                      badge: "Confirmed",
                      avatar: headshots.sarah,
                    },
                    {
                      name: "Alex Rodriguez",
                      role: "Product Manager",
                      when: "Today, 4:00 PM",
                      badge: "Pending",
                      avatar: headshots.alex,
                    },
                    {
                      name: "Emma Thompson",
                      role: "UX Designer",
                      when: "Tomorrow, 10:00 AM",
                      badge: "Confirmed",
                      avatar: headshots.emma,
                    },
                    {
                      name: "James Wilson",
                      role: "Backend Engineer",
                      when: "Tomorrow, 3:00 PM",
                      badge: "Reschedule",
                      avatar: headshots.james,
                    },
                    {
                      name: "Maria Garcia",
                      role: "Data Scientist",
                      when: "Friday, 11:00 AM",
                      badge: "No-show Risk",
                      avatar: headshots.maria,
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={r.avatar}
                          alt=""
                          width={38}
                          height={38}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-[14px] font-medium">
                              {r.name}
                            </div>
                            <span
                              className={`rounded-md px-2 py-[2px] text-[11px] ${
                                r.badge === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : r.badge === "Reschedule"
                                  ? "bg-amber-50 text-amber-700"
                                  : r.badge === "No-show Risk"
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {r.badge}
                            </span>
                          </div>
                          <div className="text-[12px] text-slate-500">
                            {r.role}
                          </div>
                          <div className="text-[12px] text-slate-500">
                            {r.when}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0b1227] text-white px-3 py-1.5 text-[12px] hover:bg-[#0f1a38]">
                          <Image
                            src="/assets/dashboard/vectors/videocall.svg"
                            alt=""
                            width={14}
                            height={14}
                            className="invert"
                          />
                          Join
                        </button>
                        <button className="rounded-lg bg-[#0b1227] text-white px-3 py-1.5 text-[12px] hover:bg-[#0f1a38]">
                          Actions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[12px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Synced with Google Calendar
                  </div>
                  <button className="underline">Sync Settings</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recent Activity */}
          <aside className="space-y-5 max-[1200px]:order-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
                <Image
                  src="/assets/dashboard/vectors/analytics.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                Recent Activity
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
                <button className="rounded-md bg-[#0b1227] text-white px-2.5 py-1 font-medium">
                  All (8)
                </button>
                <button className="rounded-md bg-white border border-slate-200 px-2.5 py-1">
                  Jobs (3)
                </button>
                <button className="rounded-md bg-white border border-slate-200 px-2.5 py-1">
                  Interviews (3)
                </button>
                <button className="rounded-md bg-white border border-slate-200 px-2.5 py-1">
                  Candidates (2)
                </button>
              </div>

              <div className="grid gap-4">
                {activity.map((a, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-3">
                    <div className="mb-2 text-[11px]">
                      <span className={`rounded px-2 py-[3px] font-medium ${
                        a.tag === "candidate" 
                          ? "bg-blue-50 text-blue-600" 
                          : a.tag === "interview"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-green-50 text-green-600"
                      }`}>
                        {a.tag.charAt(0).toUpperCase() + a.tag.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Image
                        src={a.avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold leading-5">
                          {a.title}
                        </div>
                        <div className="mt-1 text-[13px] text-slate-600">
                          {a.body}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[12px] text-slate-500">
                          <span>by {a.by}</span>
                          <span className="text-cyan-500">{a.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-xl border border-slate-200 py-2 text-[14px] font-semibold">
                View All Activities →
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

