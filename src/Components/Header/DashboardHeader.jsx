import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHeader = () => (
  <div className="mb-8 bg-white rounded-l-2xl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-3/4 pt-3 ml-10  ">
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
          <FontAwesomeIcon icon={faBell} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"/>
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
    
  </div>
);
export default DashboardHeader;
