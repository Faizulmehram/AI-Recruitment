"use client";
import { useState } from "react";
import { Search, Upload, MapPin, Check, Bookmark, Plus, Mail, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const SOURCES = [
  { name: "LinkedIn", count: "2.5M profiles", checked: true },
  { name: "GitHub", count: "830K profiles", checked: false },
  { name: "News", count: "45K profiles", checked: false },
  { name: "Conferences", count: "12K profiles", checked: false },
];

const CANDIDATES = [
  { name: "Alex Rodriguez", title: "Full Stack Engineer", location: "Austin, TX", years: 4, tags: ["TypeScript", "GraphQL", "AWS"], status: ["Open to offers"], badges: ["New", "LinkedIn"], avatar: "AR" },
  { name: "Maria Garcia", title: "Frontend Specialist", location: "Austin, TX", years: 4, tags: ["Vue.js", "CSS", "Figma", "UI/UX"], status: ["Open to offers"], badges: ["New", "Email"], avatar: "MG" },
  { name: "Aaron James", title: "SRE", location: "Austin, TX", years: 4, tags: ["JavaScript", "Python", "AWS", "Docker"], status: ["Actively looking"], badges: ["New", "LinkedIn"], avatar: "AJ" },
  { name: "Aaron James", title: "SRE", location: "Austin, TX", years: 4, tags: ["JavaScript", "Python", "AWS", "Docker"], status: ["Actively looking"], badges: ["New", "LinkedIn"], avatar: "AJ" },
  { name: "Aaron James", title: "SRE", location: "Austin, TX", years: 4, tags: ["JavaScript", "Python", "AWS", "Docker"], status: ["Actively looking"], badges: ["New", "LinkedIn"], avatar: "AJ" },
];

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 ${className}`}>{children}</span>;
}

function Button({ children, variant = "ghost", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  const base = "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition";
  const styles = { primary: "bg-blue-600 text-white hover:bg-blue-700", ghost: "hover:bg-gray-100", outline: "border border-gray-300 hover:bg-gray-50" }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>
  );
}

function CheckboxRow({ label, sub, checked, onChange }: any) {
  return (
    <label className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" checked={checked} onChange={onChange} />
        <span className="text-sm text-gray-800">{label}</span>
      </div>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </label>
  );
}

function Select({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-1">
      <label className="text-base font-bold text-gray-800">{label}</label>
      <div className="relative">
        <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none">
          <option value="">{placeholder}</option>
        </select>
        <SlidersHorizontal className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}

function Range({ label, min, max }: { label: string; min: number; max: number }) {
  const [value, setValue] = useState(min);
  return (
    <div className="space-y-1">
      <label className="text-base font-semibold text-gray-800">{label}</label>
      <div className="rounded-md border border-gray-200 bg-white p-3">
        <div className="mb-2 text-center text-sm font-semibold text-black">${value.toLocaleString()}</div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="mt-1 flex justify-between text-[11px] text-gray-500">
          <span>${min.toLocaleString()}</span>
          <span>${max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ c, idx }: { c: (typeof CANDIDATES)[number], idx: number }) {
  const profileImages = [
    '/assets/dashboard/People/1af2086220affecd5f498aeca93f64918a91bf86.jpg',
    '/assets/dashboard/People/30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg',
    '/assets/dashboard/People/389d48c3df5ee8b67ef377543c9b31f0e430e2a6.jpg',
    '/assets/dashboard/People/65be568fc2c1207c7799d895e6d7cb113b985966.jpg',
    '/assets/dashboard/People/6a98e81b28b333039b432776eb354412dfc36db6.jpg',
  ];
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <img 
          src={profileImages[idx % profileImages.length]} 
          alt={c.name} 
          className="h-12 w-12 rounded-full object-cover" 
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-base">{c.name}</h3>
            {c.badges.map((b, i) => (
              <span key={i} className={`px-2 py-0.5 text-xs font-semibold rounded ${b === 'Top Match' ? 'bg-green-100 text-green-700' : b.includes('Match') ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                {b === 'New' ? '95% Match' : b}
              </span>
            ))}
            {c.badges.includes('LinkedIn') && <span className="text-xs text-gray-500">LinkedIn</span>}
            {c.badges.includes('GitHub') && <span className="text-xs text-gray-500">GitHub</span>}
            {c.badges.includes('Email') && <span className="text-xs text-gray-500">GitHub</span>}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 whitespace-nowrap">
            <span className="truncate max-w-[160px]">{c.title}</span>
            <span className="inline-flex items-center gap-1 truncate max-w-[140px]"><MapPin className="h-4 w-4" />{c.location}</span>
            <span className="truncate max-w-[80px]">{c.years}+ years</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {c.tags.map((t, i) => (
              <span key={i} className="inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-300">
                {t}
              </span>
            ))}
          </div>
          {c.status.includes("Available") && (
            <div className="mt-2">
              <span className="inline-block rounded-full bg-black text-white px-3 py-1 text-xs font-medium">Available</span>
            </div>
          )}
          {c.status.includes("Open to offers") && (
            <div className="mt-2">
              <span className="text-xs text-gray-600">Open to offers</span>
            </div>
          )}
          {c.status.includes("Actively looking") && (
            <div className="mt-2">
              <span className="text-xs text-gray-600">Actively looking</span>
            </div>
          )}
        </div>
        <div className="flex gap-1 justify-end flex-shrink-0">
          <button className="inline-flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 text-xs font-medium gap-1 whitespace-nowrap">
            <img src="/assets/dashboard/vectors/save.svg" alt="Save" className="h-3.5 w-3.5" />
            Save
          </button>
          <button className="inline-flex items-center justify-center px-2.5 py-1.5 rounded bg-black hover:bg-gray-900 text-white text-xs font-medium gap-1 whitespace-nowrap">
            Add to Job
          </button>
          <button className="inline-flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 text-xs font-medium gap-1 whitespace-nowrap">
            <img src="/assets/dashboard/vectors/mail.svg" alt="Contact" className="h-3.5 w-3.5" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CandidateSearchPage() {
  const [sources, setSources] = useState(SOURCES);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement your search logic here, e.g., filter candidates or call API
    // For now, just log the query
    console.log("Searching for:", searchQuery);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-2">
            <button
              className="rounded-md p-1 hover:bg-gray-100 text-xl font-bold"
              onClick={() => router.back()}
              aria-label="Go back"
            >&lt;</button>
            <span className="text-xl font-bold ml-2">Candidate Search</span>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                className="w-full sm:w-72 rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Type skill, role, or keywords"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              />
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="upload-cv"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    // You can add upload logic here
                    console.log("CV uploaded:", e.target.files[0].name);
                  }
                }}
              />
              <label htmlFor="upload-cv" className="block w-full">
                <Button
                  variant="primary"
                  className="bg-gray-900 hover:bg-gray-800 flex items-center justify-center gap-2 w-full sm:w-auto"
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                  Upload CV
                </Button>
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 px-4 py-6 pb-24">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/assets/dashboard/vectors/filter.svg" alt="Filter" className="w-4 h-4" />
              <h3 className="text-l font-bold text-gray-900">Sources</h3>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-2">
              {sources.map((s, idx) => (
                <label key={s.name} className="flex items-center gap-3 py-1">
                  <input type="checkbox" className="h-4 w-4 rounded border-black accent-black focus:ring-black" checked={s.checked} onChange={() => {
                    const copy = [...sources];
                    copy[idx].checked = !copy[idx].checked;
                    setSources(copy);
                  }} />
                  <span className="text-sm text-gray-800">{s.name}</span>
                  <span className="ml-auto text-xs text-gray-500">{s.count}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Advanced Filters</h3>
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-3">
              <Select label="Location" placeholder="Select Location" />
              <Range label="Salary Range" min={60000} max={165000} />
              <Select label="Contract Type" placeholder="Select Type" />
              <Select label="Seniority Level" placeholder="Select Level" />
              <Select label="Language" placeholder="Select Language" />
              <Select label="University" placeholder="Select University" />
              <Select label="Industry" placeholder="Select Industry" />
              <Select label="Company Name" placeholder="Company name" />
              <Select label="Company Size" placeholder="Company size" />
            </div>
          </div>
        </aside>

        {/* Center Section */}
        <section className="lg:col-span-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Search Results</h2>
              <p className="text-sm text-gray-600 mt-0.5">Found 1,247 candidates matching your criteria</p>
            </div>
            <div>
              <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm">
                <option>Sort by Relevance</option>
                <option>Newest</option>
                <option>Experience</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">{CANDIDATES.map((c, idx) => (<CandidateCard key={`${c.name}-${idx}`} c={c} idx={idx} />))}</div>
          <button className="w-full text-center py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More Candidates
          </button>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Shortlisted (0)</h3>
              <span className="text-xs text-gray-500">No candidates shortlisted yet</span>
            </div>
            <div className="grid place-items-center rounded-md border border-dashed border-gray-200 py-10 text-center text-sm text-gray-500">Drop profiles here to shortlist</div>
          </div>
          {/* Quick Filters */}
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Filters</h3>
            <div className="space-y-1">
              {[
                'By Source',
                'By Seniority',
                'By Location',
                'Available Now',
              ].map((label) => {
                const active = activeQuickFilters.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveQuickFilters((prev) => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
                    }}
                    className={`w-full py-1.5 px-3 text-left text-sm rounded flex items-center ${active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="flex-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </main>
      
      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <button className="flex items-center justify-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">
            <Search className="h-4 w-4" />
            Search Candidates
          </button>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 w-full sm:w-auto">
              <Bookmark className="h-4 w-4" />
              Save Search
            </button>
            <button className="flex items-center justify-center gap-1.5 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50 w-full sm:w-auto">
              <Upload className="h-4 w-4 rotate-90" />
              Export Results
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
