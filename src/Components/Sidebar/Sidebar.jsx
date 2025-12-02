// Load logo from public folder — don't import assets outside `src`
const img = process.env.PUBLIC_URL + '/images/sAMBHAVPROLOGOpng-01.png';
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

const Sidebar = ({ activePage, setActivePage }) => (
  <aside className="fixed left-0 top-0 w-1/6 min-h-screen text-gray-800 pl-7 pt-6 rounded-e-[40px] flex flex-col items-start z-40">
    {/* Logo Section */}
    <div className="font-bold text-3xl mb-3 flex items-center gap-2 mx-auto">
      {/* Placeholder for logo icon */}
      <span className="w-32 h-32 flex items-center justify-center ">
        {/* You can replace below SVG with your actual logo */}
        <img src={img} alt="logo" className="items-center"/>
      </span>
    </div>
    <ul className="flex-1 w-full flex flex-col gap-1.5 pr-2">
      {menu.map((item) => (
        <li
          key={item}
          onClick={() => setActivePage(item)}
          className={`cursor-pointer px-5 py-2.5 rounded-l-2xl transition font-normal relative text-base ${
            activePage === item
              ? "bg-white text-black shadow-lg text-base -mr-2"
              : "text-gray-900 hover:bg-blue-300/80 -mr-2"
          }`}
        >
          {activePage === item && (
            <span className="absolute -right-2 top-0 bottom-0 w-2 bg-white rounded-r"></span>
          )}
          {item}
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
