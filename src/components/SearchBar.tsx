import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-grow gap-2 items-center">
        <div className="relative flex-grow">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Image
              src="/assets/dashboard/vectors/search.svg"
              alt="Search"
              width={22}
              height={22}
              style={{ filter: 'brightness(0) saturate(100%) invert(86%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)' }}
            />
          </span>
          <input
            type="text"
            placeholder="Search job titles or companies"
            className="w-full pl-12 pr-4 py-3 text-[16px] font-medium border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          />
        </div>
  <button type="button" className="bg-[#0a1733] hover:bg-[#0a1733] text-white px-6 py-3 text-[16px] font-medium rounded-[12px] transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Find Job</button>
      </div>
      <div className="flex gap-2 flex-shrink-0">
  <button type="button" className="bg-white text-black px-6 py-3 text-[16px] font-medium rounded-[12px] border border-gray-300 hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Find Candidate</button>
  <button type="button" className="bg-white text-black px-6 py-3 text-[16px] font-medium rounded-[12px] border border-gray-300 hover:bg-gray-200 transition" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Schedule Interview</button>
      </div>
    </div>
  );
}
