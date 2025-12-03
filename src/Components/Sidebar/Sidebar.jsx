// Load logo from public folder — don't import assets outside `src`
const img = process.env.PUBLIC_URL + '/images/SAMBHAVPROLOGOpng.png';
const menu = [
  "Dashboard",
  "Clients",
  "Subscription Plans",
  "Leads",
  "Reports & Analytic",
  "Billing & Payments",
  "Revenue",
  "Maintenance & Tickets",
  "User & Role Management",
  "Setting",
  "Profile",
];

const Sidebar = ({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <aside className={`fixed left-0 top-0 w-[280px] sm:w-64 md:w-1/6 min-h-screen text-gray-800 pl-3 sm:pl-4 md:pl-7 pt-3 sm:pt-4 md:pt-6 rounded-e-[20px] sm:rounded-e-[30px] md:rounded-e-none flex flex-col items-start z-40  transform transition-transform duration-300 ease-in-out md:shadow-none ${
    isMobileMenuOpen ? 'translate-x-0 bg-[radial-gradient(68.02%_68.02%_at_51.42%_0%,_#FFFFFF_0%,_#B3E1FF_50%,_#3887EE_100%)] p-0' : '-translate-x-full md:translate-x-0 '
  }`}>
    {/* Close button for mobile */}
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="md:hidden absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-full transition-colors"
      aria-label="Close menu"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    {/* Logo Section */}
    <div className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 flex items-center gap-2 mx-auto mt-2 sm:mt-0">
      <span className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
        <img src={img} alt="logo" className="w-full h-full object-contain"/>
      </span>
    </div>
    <ul className="flex-1 w-full flex flex-col gap-1 sm:gap-1.5 pr-2 overflow-y-auto overflow-x-hidden pb-4">
      {menu.map((item) => (
        <li
          key={item}
          onClick={() => setActivePage(item)}
          className={`cursor-pointer px-3 sm:px-4 md:px-5 py-3 sm:py-2.5 md:py-2.5 rounded-l-2xl transition font-normal relative text-sm sm:text-sm md:text-base min-h-[44px] flex items-center w-full ${
            activePage === item
              ? "bg-white text-black shadow-lg md:-mr-2"
              : "text-gray-900 hover:bg-blue-300/80 active:bg-blue-300/60 md:-mr-2"
          }`}
        >
          {activePage === item && (
            <span className="absolute -right-2 top-0 bottom-0 w-2 bg-white hidden md:block"></span>
          )}
          <span className="break-words leading-tight w-full">{item}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
