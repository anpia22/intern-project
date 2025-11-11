const DashboardHeader = () => (
  <div className="mb-8">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="w-full md:w-1/3">
        <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path d="M12 22s6-1 6-7V8a6 6 0 10-12 0v7c0 6 6 7 6 7z" strokeWidth="2" />
          </svg>
        </button>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7G9_2HR-d-v0QIWysYdcMw2mL1P9UErcyiPyjx0m2YCQEasw45_5dlbaBmMcRxwy-lk&usqp=CAU" alt="user" className="w-10 h-10 rounded-full" />
        <span className="font-medium text-black">Annie</span>
        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    {/* Divider */}
    <hr className="my-4 border-gray-200" />
    {/* Bottom Row: Title and Actions */}
    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button className="text-blue-700 font-medium px-4 py-2 rounded-xl bg-white hover:bg-blue-100 transition">Subscription</button>
        <button className="text-white bg-blue-600 px-6 py-2 rounded-xl flex items-center font-medium hover:bg-blue-700 transition">
          Export
          <svg width="18" height="18" className="ml-2" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" strokeWidth="2" />
            <path d="M12 15V3" strokeWidth="2" />
          </svg>
        </button>
        <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl flex items-center gap-2 font-medium">
          Date
          <svg width="18" height="18" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="12" height="10" rx="2" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="12" y1="2" x2="12" y2="6" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);
export default DashboardHeader;
