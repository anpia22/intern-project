import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Clients from "./Components/Client/Clients";

const App = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white-400 via-white-100 to--300 overflow-x-auto">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-2 sm:p-4 md:p-8 overflow-auto">
        {activePage === "Dashboard" && <Dashboard />}
        {activePage === "Clients" && <Clients />}
      </div>
    </div>
  );
};

export default App;