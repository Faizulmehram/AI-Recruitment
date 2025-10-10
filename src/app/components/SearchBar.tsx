export default function SearchBar() {
  return (
  <div className="flex flex-col md:flex-row items-center gap-3 text-[15px]">
  <div className="flex flex-grow gap-2 items-center">
  <div className="relative flex-grow min-w-0">
          {/* Removed search image from search bar */}
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search job titles or companies"
              className="w-full pl-10 pr-3 py-2.5 text-[15px] font-medium border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            />
        </div>
  <button type="button" className="bg-[#0a1733] hover:bg-[#0a1733] text-white px-5 py-2.5 text-[15px] font-medium rounded-[10px] transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Find Job</button>
      </div>
    <div className="flex gap-2 flex-shrink-0">
  <button type="button" className="bg-white text-black px-5 py-2.5 text-[15px] font-medium rounded-[10px] border border-gray-300 hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} onClick={() => window.location.href = '/candidatesearch'}>Find Candidate</button>
  <button type="button" className="bg-white text-black px-5 py-2.5 text-[15px] font-medium rounded-[10px] border border-gray-300 hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }} onClick={() => window.location.href = '/interviewschedule'}>Schedule Interview</button>
      </div>
    </div>
  );
}
