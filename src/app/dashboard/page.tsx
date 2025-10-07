
"use client";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";

export default function DashboardPage() {
  return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
  <div className="p-4 md:p-8">
          <SearchBar />
          {/* Stats Boxes Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mt-6 w-full">
            {/* Box 1 */}
            <div className="h-[179px] bg-white rounded-[12px] border border-gray-200 flex flex-col items-start justify-center px-6 py-4 shadow">
              <span className="text-[40px] font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>47</span>
              <span className="text-[16px] text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Job Searches</span>
              <span className="text-green-600 text-[16px] font-normal mt-2 w-full text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '100%' }}>
                <img src="/assets/dashboard/up.svg" alt="Up" className="inline-block w-4 h-4 mr-1" style={{ filter: 'invert(41%) sepia(98%) saturate(749%) hue-rotate(90deg) brightness(90%) contrast(90%)' }} /> 12% vs last 7d
              </span>
            </div>
            {/* Box 2 */}
            <div className="h-[179px] bg-white rounded-[12px] border border-gray-200 flex flex-col items-start justify-center px-6 py-4 shadow">
              <span className="text-[40px] font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>124</span>
              <span className="text-[16px] text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Candidate Searches</span>
              <span className="text-green-600 text-[16px] font-normal mt-2 w-full text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '100%' }}>
                <img src="/assets/dashboard/up.svg" alt="Up" className="inline-block w-4 h-4 mr-1" style={{ filter: 'invert(41%) sepia(98%) saturate(749%) hue-rotate(90deg) brightness(90%) contrast(90%)' }} /> 12% vs last 7d
              </span>
            </div>
            {/* Box 3 */}
            <div className="h-[179px] bg-white rounded-[12px] border border-gray-200 flex flex-col items-start justify-center px-6 py-4 shadow">
              <span className="text-[40px] font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>128</span>
              <span className="text-[16px] text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Jobs Found</span>
              <span className="text-red-500 text-[16px] font-normal mt-2 w-full text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '100%' }}>
                <img src="/assets/dashboard/down.svg" alt="Down" className="inline-block w-4 h-4 mr-1" style={{ filter: 'invert(32%) sepia(98%) saturate(749%) hue-rotate(-20deg) brightness(90%) contrast(90%)' }} /> 3% vs last 7d
              </span>
            </div>
            {/* Box 4 */}
            <div className="h-[179px] bg-white rounded-[12px] border border-gray-200 flex flex-col items-start justify-center px-6 py-4 shadow">
              <span className="text-[40px] font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>12</span>
              <span className="text-[16px] text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Candidates Found</span>
              <span className="text-green-600 text-[16px] font-normal mt-2 w-full text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '100%' }}>
                <img src="/assets/dashboard/up.svg" alt="Up" className="inline-block w-4 h-4 mr-1" style={{ filter: 'invert(41%) sepia(98%) saturate(749%) hue-rotate(90deg) brightness(90%) contrast(90%)' }} /> 15% vs last 7d
              </span>
            </div>
            {/* Box 5 */}
            <div className="h-[179px] bg-white rounded-[12px] border border-gray-200 flex flex-col items-start justify-center px-6 py-4 shadow">
              <span className="text-[40px] font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>18</span>
              <span className="text-[16px] text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Interviews</span>
              <span className="text-green-600 text-[16px] font-normal mt-2 w-full text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '100%' }}>
                <img src="/assets/dashboard/up.svg" alt="Up" className="inline-block w-4 h-4 mr-1" style={{ filter: 'invert(41%) sepia(98%) saturate(749%) hue-rotate(90deg) brightness(90%) contrast(90%)' }} /> 2 days vs last 30d
              </span>
            </div>
          </div>
          {/* Main Content Grid - 2 boxes side by side beside activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-8">
            {/* Left: 2 boxes side by side, stack on mobile */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
              {/* Job Search for Candidate */}
              <div className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/assets/dashboard/vectors/search.svg"
                      alt="Search"
                      width={24}
                      height={24}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">Job Search for Candidate</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontWeight: 550, fontFamily: 'Inter, sans-serif' }}>
                      Describe the candidate or role
                    </label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      placeholder="e.g. React front-end developer with 5+ years of experience and knowledge in TypeScript"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Upload CV
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-15 text-center">
                      <div
                        className="flex flex-col items-center justify-center text-gray-900"
                        onDragOver={e => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.add('bg-gray-100'); }}
                        onDragLeave={e => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('bg-gray-100'); }}
                        onDrop={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.currentTarget.classList.remove('bg-gray-100');
                          const files = e.dataTransfer.files;
                          if (files && files[0]) {
                            alert(`Selected CV: ${files[0].name}`);
                          }
                        }}
                        onDragEnter={e => { e.preventDefault(); e.stopPropagation(); }}
                      >
                        <img src="/assets/dashboard/vectors/upload.svg" alt="Upload" className="w-8 h-8 mb-2" />
                        <span className="text-sm">Drag & drop CV here, or <label htmlFor="cv-upload" className="font-semibold text-gray-900 cursor-pointer underline">browse here</label></span>
                        <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</span>
                        <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            alert(`Selected CV: ${e.target.files[0].name}`);
                          }
                        }} />
                      </div>
                    </div>
                  </div>
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 w-full">
                    <span className="flex items-center justify-center gap-2">
                      <img src="/assets/dashboard/vectors/search.svg" alt="Search" className="w-5 h-5 filter invert" />
                      Find Matching Jobs
                    </span>
                  </button>
                </div>
              </div>
              {/* Candidate-to-Job Matching */}
              <div className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/assets/dashboard/vectors/job.svg"
                      alt="Candidate-to-Job Matching"
                      width={24}
                      height={24}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">Candidate-to-Job Matching</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                      Select Job
                    </label>
                    <input 
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Write job description...."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recent Jobs
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium">Frontend Developer</span>
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium">UX Designer</span>
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium">Data Scientist</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Upload Candidate CV
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-900">
                        <img src="/assets/dashboard/vectors/upload.svg" alt="Upload" className="w-8 h-8 mb-2" />
                        <span className="text-sm">Upload <span className="font-semibold">Candidate</span> CV</span>
                        <label htmlFor="candidate-cv-upload" className="font-semibold text-gray-900 cursor-pointer underline mt-2">Browse</label>
                        <input id="candidate-cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            alert(`Selected Candidate CV: ${e.target.files[0].name}`);
                          }
                        }} />
                      </div>
                    </div>
                  </div>
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 w-full">
                    <span className="flex items-center justify-center gap-2">
                      <img src="/assets/dashboard/vectors/play.svg" alt="Run Ranking" className="w-5 h-5 filter invert" />
                      Run Ranking
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Right: Activity Panel */}
            <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/assets/dashboard/vectors/analytics.svg"
                      alt="Analytics"
                      width={24}
                      height={24}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All Activities →
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Activity Items */}
                  {/* ...existing activity items code... */}
                  <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">MC</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">New candidate applied</span>
                        <span className="text-xs text-gray-500">5m ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Maria Chen — React Developer</p>
                    </div>
                  </div>
                  {/* ...other activity items... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
