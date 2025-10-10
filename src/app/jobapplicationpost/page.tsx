// src/app/job-application-post/page.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

/* --------------------------------- helpers -------------------------------- */
function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "sky" | "emerald" | "amber" | "indigo";
}) {
  const map: Record<string, string> = {
    slate:
      "bg-slate-100 text-slate-700 border border-slate-200",
    sky: "bg-sky-50 text-sky-700 border border-sky-200",
    emerald:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
    amber:
      "bg-amber-50 text-amber-700 border border-amber-200",
    indigo:
      "bg-indigo-50 text-indigo-700 border border-indigo-200",
  };
  return (
    <span className={`px-2 py-[3px] rounded-md text-[12px] ${map[tone]}`}>
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#0b1227] text-white text-[11px] px-2.5 py-1">
      {children}
    </span>
  );
}

function Section({
  title,
  right,
  children,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? (
            <div className="text-[15px] font-semibold text-slate-900">
              {title}
            </div>
          ) : (
            <div />
          )}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/* ----------------------------------- page ---------------------------------- */
export default function JobApplicationPostPage() {
  const [tone, setTone] = useState("Professional");

  const [channels, setChannels] = useState({
    LinkedIn: true,
    Twitter: false,
    Email: false,
    "Job Boards": true,
  });

  const selected = useMemo(
    () => Object.entries(channels).filter(([_, v]) => v).map(([k]) => k),
    [channels]
  );

  const toggle = (key: keyof typeof channels) =>
    setChannels((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="min-h-screen bg-white">
      {/* Top header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-slate-200">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-3 flex items-center gap-3">
          <button className="inline-grid h-8 w-8 place-items-center rounded-full border border-slate-200 hover:bg-slate-50">
            <Image
              src="/assets/loginpage/dashboard/vectors/leftarrow.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
          <h1 className="text-[20px] md:text-[22px] font-semibold">
            Job Application Post
          </h1>

          <div className="ml-auto hidden md:block">
            <div className="relative w-[420px]">
              <Image
                src="/assets/loginpage/dashboard/vectors/search.svg"
                alt=""
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                placeholder="Search for jobs..."
                className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <button className="ml-3 inline-flex items-center gap-2 rounded-lg bg-[#0b1227] text-white px-3.5 py-2 text-[13px] hover:bg-black">
            <Image
              src="/assets/loginpage/dashboard/vectors/upload.svg"
              alt=""
              width={16}
              height={16}
              className="invert"
            />
            Upload Job Description
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 md:px-6 py-5">
        <div className="space-y-5">
          {/* Select Job - Full Width */}
          <Section
            title="Select Job"
            right={
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] hover:bg-slate-50">
                <Image
                  src="/assets/loginpage/dashboard/vectors/view.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                View Job Details
              </button>
            }
          >
            <div className="flex gap-3">
              <input
                defaultValue="Frontend Developer"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="mt-3">
              <div className="text-[12px] font-medium text-slate-600 mb-2">
                Recent Jobs
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Frontend Developer",
                  "UX Designer",
                  "Data Scientist",
                  "DevOps Engineer",
                  "Senior React Developer",
                  "Product Manager",
                ].map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </Section>

          {/* Two Column Layout: Left (Form) + Right (Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
            {/* LEFT SIDE */}
            <div className="space-y-5">
              {/* Tone Presets */}
              <Section title="Tone Presets">
              <div className="w-56">
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    {[
                      "Professional",
                      "Friendly",
                      "Concise",
                      "Enthusiastic",
                      "Formal",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    ▾
                  </span>
                </div>
              </div>
            </Section>

            {/* Comments to AI */}
            <Section title="Comments to AI">
              <textarea
                rows={4}
                placeholder="Add notes or instructions for AI — e.g., highlight remote flexibility, mention company culture, adjust tone, or include specific benefits…"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-[13px] outline-none focus:ring-2 focus:ring-slate-200 placeholder:text-slate-500"
              />
            </Section>

            {/* Channels */}
            <Section title="Channels">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => toggle("LinkedIn")}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                  ${
                    channels.LinkedIn
                      ? "border-[#0b1227] ring-2 ring-[#0b1227]/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-grid h-5 w-5 place-items-center rounded overflow-hidden">
                      <Image
                        src="/assets/dashboard/logos/Linkedin.png"
                        alt="LinkedIn"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="text-[14px] font-medium">LinkedIn</span>
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={channels.LinkedIn}
                    className="h-4 w-4 accent-[#0b1227]"
                  />
                </button>

                {/* Twitter/X */}
                <button
                  type="button"
                  onClick={() => toggle("Twitter")}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                  ${
                    channels.Twitter
                      ? "border-[#0b1227] ring-2 ring-[#0b1227]/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-grid h-5 w-5 place-items-center rounded overflow-hidden">
                      <Image
                        src="/assets/dashboard/logos/x logo.jpg"
                        alt="X (Twitter)"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="text-[14px] font-medium">X (Twitter)</span>
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={channels.Twitter}
                    className="h-4 w-4 accent-[#0b1227]"
                  />
                </button>

                {/* Email */}
                <button
                  type="button"
                  onClick={() => toggle("Email")}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                  ${
                    channels.Email
                      ? "border-[#0b1227] ring-2 ring-[#0b1227]/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-grid h-5 w-5 place-items-center rounded overflow-hidden">
                      <Image
                        src="/assets/dashboard/logos/mail logo.jpg"
                        alt="Email"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="text-[14px] font-medium">Email</span>
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={channels.Email}
                    className="h-4 w-4 accent-[#0b1227]"
                  />
                </button>

                {/* Job Boards */}
                <button
                  type="button"
                  onClick={() => toggle("Job Boards")}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                  ${
                    channels["Job Boards"]
                      ? "border-[#0b1227] ring-2 ring-[#0b1227]/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-grid h-5 w-5 place-items-center rounded overflow-hidden">
                      <Image
                        src="/assets/dashboard/logos/job_board_logo.png"
                        alt="Job Boards"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="text-[14px] font-medium">Job Boards</span>
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={channels["Job Boards"]}
                    className="h-4 w-4 accent-[#0b1227]"
                  />
                </button>
              </div>

              {/* Selected channels */}
              <div className="mt-4">
                <div className="text-[12px] font-medium text-slate-600 mb-1">
                  Selected Channels
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </Section>

            {/* Footer status */}
            <div className="w-full flex items-center justify-between mt-8 px-2 py-4 border-t border-slate-200 bg-white">
              <span className="text-[15px] text-slate-900 font-medium">
                Ready to post to <span className="font-bold">{selected.length} channel{selected.length > 1 ? 's' : ''}</span>
              </span>
              <div className="flex-1 flex justify-end gap-3">
                <button className="px-5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium shadow-sm hover:bg-slate-100 transition">
                  Save as Draft
                </button>
                <button className="px-5 py-2 rounded-lg bg-[#0b1227] text-white font-semibold flex items-center gap-2 shadow hover:bg-black transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Generate Job Post
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Job Preview */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-[15px] font-semibold mb-3">Job Preview</div>

              <div className="text-[14px] font-semibold">Frontend Developer</div>
              <p className="mt-1 text-[13px] leading-5 text-slate-600">
                We&apos;re looking for a talented frontend developer to join our growing
                team…
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="slate">Remote</Badge>
                <Badge tone="slate">Full-Time</Badge>
                <Badge tone="slate">$80k–$120k</Badge>
              </div>

              <div className="mt-5 text-[12px] font-medium text-slate-600">
                Preview for:
              </div>
              <div className="mt-2 space-y-2">
                <div className="rounded-lg border border-slate-200 bg-sky-50/40 p-2 text-[12px]">
                  <span className="font-medium">LinkedIn:</span> Exciting Frontend Developer opportunity…
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-[12px]">
                  <span className="font-medium">Job Boards:</span> Exciting Frontend Developer……
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold">
                  <Image
                    src="/assets/loginpage/dashboard/vectors/generate.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  AI Suggestions
                </div>
                <ul className="space-y-2 text-[13px] text-slate-700">
                  <li>• Highlight remote work flexibility</li>
                  <li>• Mention competitive salary range</li>
                  <li>• Include company culture benefits</li>
                  <li>• Add call-to-action for quick apply</li>
                </ul>
              </div>
            </div>

            {/* Bottom actions (on the right as in screenshot) */}
              <div className="flex items-center justify-end gap-3">
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-[13px] hover:bg-slate-50">
                  Save as Draft
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#0b1227] text-white px-4 py-2 text-[13px] hover:bg-black">
                  <Image
                    src="/assets/loginpage/dashboard/vectors/generate.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  Generate Job Post
                </button>
              </div>

              {/* Channel selector (kept here for quick controls) */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(channels).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key as keyof typeof channels)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                      ${value ? "border-black ring-2 ring-black/20 bg-black text-white" : "border-slate-200 bg-white hover:bg-slate-50 text-black"}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-grid h-5 w-5 place-items-center rounded overflow-hidden">
                        <Image
                          src={
                            key === "LinkedIn"
                              ? "/assets/dashboard/logos/Linkedin.png"
                              : key === "Twitter"
                              ? "/assets/dashboard/logos/x logo.jpg"
                              : key === "Email"
                              ? "/assets/dashboard/logos/mail logo.jpg"
                              : "/assets/dashboard/logos/job_board_logo.png"
                          }
                          alt={key}
                          width={20}
                          height={20}
                        />
                      </span>
                      <span className="text-[14px] font-medium">{key}</span>
                    </span>
                    <input
                      type="checkbox"
                      readOnly
                      checked={value}
                      className="h-4 w-4 accent-black"
                    />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
