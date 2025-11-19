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
  <aside className=" min-h-screen text-gray-800 pl-7 py-6 rounded-e-[40px] flex flex-col items-start fixed">
    {/* Logo Section */}
    <div className="font-bold text-3xl mb-3 flex items-center gap-2 mx-auto">
      {/* Placeholder for logo icon */}
      <span className="w-32 h-32 flex items-center justify-center ">
        {/* You can replace below SVG with your actual logo */}
        <img src={img} alt="logo" className="items-center"/>
      </span>
    </div>
    <ul className="flex-1 w-full flex flex-col gap-1.5">
      {menu.map((item) => (
        <li
          key={item}
          onClick={() => setActivePage(item)}
          className={`cursor-pointer px-5 py-2 rounded-l-2xl transition font-medium ${
            activePage === item
              ? "bg-white text-black font-semibold shadow text-l"
              : "text-gray-700 hover:bg-blue-300/80"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
