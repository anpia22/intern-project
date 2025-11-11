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
  <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white px-6 py-8 rounded-r-3xl shadow-lg hidden md:block">
    <div className="font-bold text-2xl mb-10 flex items-center gap-2">
      <span className="text-4xl"></span> Zoho <span className="font-light">CRM</span>
    
    </div>
    <ul className="flex-1 flex flex-col gap-2">
      {menu.map((item) => (
        <li
          key={item}
          onClick={() => setActivePage(item)}
          className={`cursor-pointer px-4 py-2 transition rounded-full ${
            activePage === item ? "bg-white text-blue-600 font-bold shadow" : "hover:bg-blue-500/60"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
