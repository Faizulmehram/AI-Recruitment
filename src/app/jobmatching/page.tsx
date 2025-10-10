'use client';
import { useState } from 'react';
import { Upload, Save, Share2, FileText, FileDown, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CandidateJobMatching() {
  const [weights, setWeights] = useState({ skills: 25, experience: 25, personality: 25, disc: 25 });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const router = useRouter();

  const handleWeightChange = (key: string, newValue: number) => {
    const otherKeys = Object.keys(weights).filter(k => k !== key);
    const remainingWeight = 100 - newValue;
    
    if (remainingWeight < 0) return; // Prevent negative weights
    
    // Calculate current total of other weights
    const currentOtherTotal = otherKeys.reduce((sum, k) => sum + weights[k as keyof typeof weights], 0);
    
    // If other weights sum to 0, distribute equally
    if (currentOtherTotal === 0) {
      const equalWeight = Math.floor(remainingWeight / otherKeys.length);
      const remainder = remainingWeight % otherKeys.length;
      
      const newWeights = { ...weights, [key]: newValue };
      otherKeys.forEach((k, index) => {
        newWeights[k as keyof typeof weights] = equalWeight + (index < remainder ? 1 : 0);
      });
      setWeights(newWeights);
    } else {
      // Distribute remaining weight proportionally
      const newWeights = { ...weights, [key]: newValue };
      otherKeys.forEach(k => {
        const proportion = weights[k as keyof typeof weights] / currentOtherTotal;
        newWeights[k as keyof typeof weights] = Math.round(remainingWeight * proportion);
      });
      
      // Ensure total is exactly 100 by adjusting the last weight if needed
      const actualTotal = Object.values(newWeights).reduce((sum, val) => sum + val, 0);
      if (actualTotal !== 100) {
        const lastKey = otherKeys[otherKeys.length - 1];
        newWeights[lastKey as keyof typeof weights] += (100 - actualTotal);
      }
      
      setWeights(newWeights);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-2 md:mb-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold">Candidate-to-Job Matching</h1>
        </div>

        {/* Select Job */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-3 p-3 md:p-4">
              <h2 className="font-semibold text-base md:text-lg">Select Job</h2>
              <textarea 
                className="w-full h-28 md:h-32 min-h-28 md:min-h-32 max-h-28 md:max-h-32 resize-none border border-gray-300 rounded-md p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black" 
                placeholder="Enter job description or title..." 
              />
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-semibold text-gray-900">Recent Jobs</h3>
                <div className="flex flex-wrap gap-2">
                  {['Frontend Developer', 'UX Designer', 'Data Scientist', 'DevOps Engineer', 'Senior React Developer'].map(job => (
                    <button key={job} className="px-2.5 md:px-3 py-1.5 text-xs md:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      {job}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ranking Weights */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-3 p-3 md:p-4">
              <h2 className="font-semibold text-base md:text-lg">Ranking Weights</h2>
              {Object.entries(weights).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium capitalize">
                    <span>{key}</span>
                    <span>{value}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={value} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-black"
                    onChange={(e) => handleWeightChange(key, parseInt(e.target.value))}
                  />
                </div>
              ))}
              <div className="text-right font-semibold text-sm">Total: {Object.values(weights).reduce((a, b) => a + b, 0)}%</div>
            </div>
          </div>
        </div>

        {/* Upload and Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* CV Upload */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-3 md:p-4">
              <h3 className="font-semibold mb-3 text-base md:text-lg">CV Upload</h3>
              <div 
                className="flex flex-col items-center justify-center text-center border-dashed border-2 border-gray-300 rounded-lg p-4 md:p-6 hover:border-gray-400 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload className="w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-500" />
                <p className="text-xs md:text-sm text-gray-500 mb-3">Drag & Drop CVs here</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-block">
                    Upload CVs
                  </span>
                </label>
              </div>
              
              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                  {uploadedFiles.map((fileName, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <span className="text-sm text-gray-700 truncate">{fileName}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ideal Profile */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-3 md:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="font-semibold text-base md:text-lg">Ideal Profile</h2>
                <button className="px-3 py-1 text-xs md:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'].map(skill => (
                    <button key={skill} className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm mt-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Experience Level</h4>
                  <p className="text-gray-700">Senior</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Personality Traits</h4>
                  <p className="text-gray-700">Collaborative, Detail-oriented, Problem-solver</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">DISC Profile</h4>
                  <p className="text-gray-700">D-I</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ranked Candidates */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-3 md:p-4 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="font-semibold text-base md:text-lg">Ranked Candidates</h2>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center px-2.5 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm">
                  <FileText className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Export CSV
                </button>
                <button className="flex items-center px-2.5 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm">
                  <FileDown className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Export PDF
                </button>
              </div>
            </div>

            {[{
              name: 'Sarah Taylor', match: '98%', badge: '98% Match', badgeColor: 'CV', location: 'San Francisco, CA', years: 5, skills: ['React', 'TypeScript', 'Node.js'],
              summary: 'Senior Frontend Developer with extensive React experience',
              image: '/assets/dashboard/People/1af2086220affecd5f498aeca93f64918a91bf86.jpg'
            }, {
              name: 'Alex Rodriguez', match: '82%', badge: '82% Match', badgeColor: 'LinkedIn', location: 'Austin, TX', years: 4, skills: ['TypeScript', 'GraphQL', 'AWS'],
              summary: 'Full-stack developer with strong frontend focus',
              image: '/assets/dashboard/People/30a03b20d0d79bd9c491d22b6f3398fcaedf2780.jpg'
            }].map((c, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                {/* Profile Image */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 overflow-hidden">
                  <img 
                    src={c.image} 
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Candidate Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">{c.name}</h3>
                    <span className="text-green-600 font-semibold text-xs md:text-sm">{c.badge}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {c.badgeColor}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">{c.summary}</p>
                  <p className="text-xs md:text-sm text-gray-500 mb-2">{c.location} • {c.years}+ years</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {c.skills.map(skill => (
                      <button key={skill} className="px-2 md:px-3 py-0.5 md:py-1 text-xs bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto flex-shrink-0">
                  <button className="flex items-center justify-center px-2.5 md:px-3 py-1.5 text-xs md:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
                    <Save className="w-3 h-3 md:w-4 md:h-4 mr-1" />Save
                  </button>
                  <button className="flex items-center justify-center px-2.5 md:px-3 py-1.5 text-xs md:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
                    <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />Share
                  </button>
                  <button className="px-2.5 md:px-3 py-1.5 text-xs md:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto">Go to Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Clear Uploads</button>
            <button className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Refine Job Profile</button>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2 text-sm md:text-base rounded-lg hover:bg-gray-800 transition-colors">Run Ranking</button>
        </div>
      </div>
    </div>
  );
}
