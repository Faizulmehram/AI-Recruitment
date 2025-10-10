"use client";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Search,
  MapPin,
  DollarSign,
  ChevronDown,
  Filter,
  Save,
  Share2,
  ArrowRight,
  Sparkles,
  Briefcase,
  Check,
} from "lucide-react";

/**
 * Job Search for Candidate – Pixel-accurate Next.js/Tailwind implementation
 * Layout order matches the screenshot exactly:
 * 1) Header bar: title on the left, centered search, dark Upload CV on right
 * 2) Left sidebar: Filters
 * 3) Main: Candidate Profile card on top
 * 4) Main: AI‑Recommended Jobs card below
 * 5) Sticky bottom bar: Find Matching Jobs
 */

// --- Small UI atoms kept local for portability ---
const Chip: React.FC<{ label: string; active?: boolean; onClick?: () => void }>
= ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs border transition whitespace-nowrap ${
      active
        ? "bg-[#0B1320] text-white border-[#0B1320] shadow"
        : "bg-gray-900/5 text-gray-800 border-gray-200 hover:bg-gray-900/10"
    }`}
  >
    {label}
  </button>
);

const Badge: React.FC<{ text: string }>=({ text }) => (
  <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
    {text}
  </span>
);

// --- Mock data ---
const AI_SUGGESTIONS = [
  "Frontend Developer roles",
  "React specialist positions",
  "Remote-first companies",
  "Startup environments",
];

const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 – $160,000",
    type: "Full-Time",
    remote: true,
    match: 95,
  },
  {
    id: 2,
    title: "React Developer",
    company: "InnovateLab",
    location: "New York, NY",
    salary: "$90,000 – $130,000",
    type: "Full-Time",
    remote: false,
    match: 84,
  },
  {
    id: 3,
    title: "Frontend Architect",
    company: "BigTech Solutions",
    location: "Seattle, WA",
    salary: "$140,000 – $180,000",
    type: "Full-Time",
    remote: true,
    match: 72,
  },
];

export default function JobSearchForCandidatePage() {
  const router = useRouter();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sidebar state
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([60000, 165000]);
  const [contractType, setContractType] = useState("");
  const [seniority, setSeniority] = useState("");
  const [remote, setRemote] = useState(true);
  const [visa, setVisa] = useState(false);
  const [language, setLanguage] = useState("");
  const [university, setUniversity] = useState("");

  // Profile state
  const [industry, setIndustry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [salaryEstimate, setSalaryEstimate] = useState("");
  const [comments, setComments] = useState("");
  const [selectedAISuggestion, setSelectedAISuggestion] = useState<string[]>([]);

  // Upload
  const [cvName, setCvName] = useState<string | null>(null);
  const onFile = (file?: File) => file && setCvName(file.name);
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); };

  // Faux filtering to demo interactions
  const filteredJobs = useMemo(() => {
    let result = [...JOBS];
    if (remote) result = result.filter((j) => j.remote);
    if (location) result = result.filter((j) => j.location.toLowerCase().includes(location.toLowerCase()));
    return result.sort((a, b) => b.match - a.match);
  }, [remote, location]);

  return (
  <div className="min-h-screen bg-gray-50 font-inter">
      {/* ===== HEADER ===== */}
  <header className="sticky top-0 z-40 border border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          {/* Back button + Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronDown className="h-5 w-5 rotate-90" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Job Search for Candidate</h1>
          </div>

          {/* Upload CV + Search bar/button (right aligned) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto md:ml-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // Handle search action
                      console.log('Searching for:', searchQuery);
                    }
                  }}
                  className="w-full sm:w-64 lg:w-96 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:border-black focus:ring-0"
                  placeholder="Search job titles or companies"
                />
              </div>
              <button
                onClick={() => {
                  // Handle search action
                  console.log('Searching for:', searchQuery);
                }}
                className="px-4 py-2 bg-[#0B1320] text-white rounded-lg text-sm font-medium hover:bg-[#1a2332] transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0B1320] text-white px-4 py-2 text-sm font-medium hover:bg-[#1a2332] transition">
                <Upload className="h-4 w-4" /> Upload CV
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN LAYOUT: Sidebar + Content ===== */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* --- LEFT SIDEBAR: Filters --- */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Filters header */}
            <div className="flex items-center gap-2 text-gray-900 font-semibold text-base">
              <Filter className="h-4 w-4" /> Filters
            </div>

            {/* Filter card */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4 shadow-sm">
              {/* Location */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-1.5 block">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Select Location</option>
                  <option>San Francisco, CA</option>
                  <option>New York, NY</option>
                  <option>Seattle, WA</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Salary Range</label>
                <div className="space-y-3">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min={50000}
                      max={165000}
                      value={salaryRange[0]}
                      onChange={(e) => setSalaryRange([+e.target.value, salaryRange[1]])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-gray-800 transition-all"
                      style={{
                        background: `linear-gradient(to right, #000000 0%, #000000 ${((salaryRange[0] - 50000) / (165000 - 50000)) * 100}%, #E5E7EB ${((salaryRange[0] - 50000) / (165000 - 50000)) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-200">
                      ${salaryRange[0].toLocaleString()}
                    </span>
                    <span className="text-gray-400 font-medium">to</span>
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-200">
                      ${salaryRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contract Type */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-1.5 block">Contract Type</label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Select Type</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                </select>
              </div>

              {/* Seniority Level */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-1.5 block">Seniority Level</label>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Select Level</option>
                  <option>Junior</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <CheckboxRow label="Remote Work Available" checked={remote} onChange={setRemote} />
                <CheckboxRow label="Visa Sponsorship" checked={visa} onChange={setVisa} />
              </div>

              {/* Language Requirement */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-1.5 block">Language Requirement</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Select Language</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              {/* University Preference */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-1.5 block">University Preference</label>
                <input
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Enter University Name"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Refine Filters button */}
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1320] text-white hover:bg-[#1a2332] py-2.5 text-sm font-medium transition">
                <img src="/assets/dashboard/vectors/filter.svg" alt="Filter" className="h-4 w-4 invert" /> Refine Filters
              </button>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* Candidate Profile Section */}
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center gap-2">
              <img src="/assets/dashboard/vectors/candidates.svg" alt="Candidates" className="h-5 w-5 md:h-6 md:w-6 mr-2" />
              <h2 className="font-bold text-gray-900 text-base md:text-lg">Candidate Profile</h2>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Upload CV */}
              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">Upload CV</label>
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center hover:border-gray-400 transition"
                >
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <div className="text-sm text-gray-600">
                    Drag & drop CV here, or{" "}
                    <span
                      className="text-gray-900 font-medium cursor-pointer hover:underline"
                      onClick={() => document.getElementById('cv-upload-input')?.click()}
                    >
                      browse here
                    </span>
                  <input
                    id="cv-upload-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</div>
                  {cvName && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700">
                      <Upload className="h-4 w-4" /> {cvName}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <LabeledSelect label="Industry" value={industry} onChange={setIndustry} placeholder="Select industry" />
                <LabeledInput label="Company Name" value={companyName} onChange={setCompanyName} placeholder="Enter current or previous company name" />
                <LabeledSelect label="Country" value={country} onChange={setCountry} placeholder="Select country" />

                <LabeledInput label="Role Title" value={roleTitle} onChange={setRoleTitle} placeholder="Enter candidate's role title" />
                <LabeledSelect label="Company Size" value={companySize} onChange={setCompanySize} placeholder="Select company size" />
                <LabeledInput label="Salary Estimation" value={salaryEstimate} onChange={setSalaryEstimate} placeholder="Enter estimated salary" />
              </div>

              {/* Comments */}
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Comments</label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add any notes or specific requirements..."
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* AI Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900 text-sm md:text-base">AI Suggestions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AI_SUGGESTIONS.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      active={selectedAISuggestion.includes(s)}
                      onClick={() =>
                        setSelectedAISuggestion((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI-Recommended Jobs Section */}
          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <img src="/assets/dashboard/vectors/job.svg" alt="Jobs" className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                <h3 className="font-bold text-gray-900 text-base md:text-lg">AI-Recommended Jobs ({filteredJobs.length} Matches)</h3>
              </div>
              <button className="inline-flex items-center gap-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition font-semibold">
                <img src="/assets/dashboard/vectors/filter.svg" alt="Filter" className="h-4 w-4" /> Sort by Match
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ===== STICKY FOOTER ===== */}
      <div className="sticky bottom-0 z-40 border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-3 md:py-4 flex items-center justify-center md:justify-end">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1320] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#1a2332] transition">
            <Search className="h-4 w-4" /> Find Matching Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Reusable form components =====
function LabeledSelect({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
  <label className="text-xs font-extrabold text-gray-700 mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        <option value="">{placeholder ?? "Select"}</option>
        <option>Option A</option>
        <option>Option B</option>
        <option>Option C</option>
      </select>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
  <label className="text-xs font-extrabold text-gray-700 mb-1.5 block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm cursor-pointer">
      <span className="text-gray-900 font-bold">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-gray-600 cursor-pointer rounded"
      />
    </label>
  );
}

function JobCard({
  job,
}: {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    remote: boolean;
    match: number;
  };
}) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="rounded-lg border border-gray-200 p-4 md:p-5 flex flex-col md:flex-row items-start justify-between gap-4 hover:shadow-md transition">
      <div className="flex-1 space-y-2 w-full md:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <h4 className="font-bold text-gray-900 text-base">{job.title}</h4>
          <Badge text={`${job.match}% Match`} />
        </div>
        <div className="text-sm text-gray-600">{job.company}</div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DollarSign className="h-4 w-4" />
            {job.salary}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            {job.type}
          </span>
          {job.remote && (
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" />
              Remote
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
        <button
          onClick={() => setSaved((s) => !s)}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            saved
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Save className="h-4 w-4" /> {saved ? "Saved" : "Save"}
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition">
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1320] text-white px-4 py-2 text-sm font-medium hover:bg-[#1a2332] transition">
          Go to Role <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}