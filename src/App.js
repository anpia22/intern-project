import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubscriptionPlans from "./Components/Subscription Plans/SubscriptionPlans";
import Leads from "./Components/Leads/Leads";
import ClientPage from "./Components/Client/Client";
import PaymentDetailsForm from "./Components/BillingPayment/BillingPayment";
import ReportsAnalytic from "./Components/ReportsAnalytic/ReportsAnalytic";
import Revenue from "./Components/Revenue/Revenue";
import MaintenanceTickets from "./Components/MaintenanceTickets/MaintenanceTickets";
import UserRoleManagement from "./Components/userAndRoles/userAndRoles";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Setting/Settings";

const App = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-[radial-gradient(68.02%_68.02%_at_51.42%_0%,_#FFFFFF_0%,_#B3E1FF_50%,_#3887EE_100%)]">
  <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 ml-[16.666667%] my-5 mr-5 bg-white rounded-xl h-[calc(100vh-2.5rem)] flex flex-col">
       
        {/* container for the pages - scrollable area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-4">
          {activePage === "Dashboard" && <Dashboard />}
          {activePage === 'Clients' && <ClientPage/>}
          {activePage === "Leads" && <Leads />}
          {activePage === "Subscription Plans" && <SubscriptionPlans />}
          {activePage === "Billing & Payments" && <PaymentDetailsForm/>}
          {activePage === "Reports & Analytic" && <ReportsAnalytic/>}
          {activePage === "Revenue" && <Revenue/>}
          {activePage === "Maintenance & Tickets" && <MaintenanceTickets/>}
          {activePage === "Setting" && <Settings setActivePage={setActivePage} />}
          {activePage === "Profile" && <Profile/>}
          {activePage === "User & Role Management" && <UserRoleManagement/>}
        </div>
      </div>
    </div>
  );
};

export default App;
