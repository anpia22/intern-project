import { useState, useEffect } from "react";
import { faBell, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  return (
    <div className="mb-0 bg-white rounded-none md:rounded-l-2xl w-full overflow-x-hidden ">
      <div className="flex flex-row items-center justify-between gap-2 md:gap-6 w-full md:w-5/6 mx-auto pt-3 pb-3 md:pb-0 px-2 md:px-0 max-w-full">
        {/* Mobile menu button and search */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Mobile: Search button that opens input on click */}
          <div className="md:hidden">
            {isSearchOpen ? (
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 w-full transition-opacity duration-300">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  className="bg-transparent outline-none w-full text-xs font-normal"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSearchOpen(false);
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
                  aria-label="Close search"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Open search"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-sm"
                />
              </button>
            )}
          </div>

          {/* Desktop: Always visible search input */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-1/3 min-w-0">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0"
            />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm font-normal"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <FontAwesomeIcon
            icon={faBell}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer text-md md:text-base"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7G9_2HR-d-v0QIWysYdcMw2mL1P9UErcyiPyjx0m2YCQEasw45_5dlbaBmMcRxwy-lk&usqp=CAU"
            alt="user"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full"
          />
          <span className="font-medium text-black text-sm md:text-base hidden sm:inline">
            Annie
          </span>
          <svg
            className="w-3 h-3 md:w-4 md:h-4 text-black hidden sm:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-0 border-gray-200 w-full md:w-5/6 mx-auto mt-0 md:mt-4" />
      {/* Bottom Row: Title and Actions */}
    </div>
  );
};
export default DashboardHeader;
