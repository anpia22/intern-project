import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubscriptionPlans from "./Components/Subscription Plans/SubscriptionPlans";
import Leads from "./Components/Leads/Leads";
import ClientPage from "./Components/Client/Client";
import ClientsList from "./Components/Client/ClientsList";
import PaymentDetailsForm from "./Components/BillingPayment/BillingPayment";
import ReportsAnalytic from "./Components/ReportsAnalytic/ReportsAnalytic";
import Revenue from "./Components/Revenue/Revenue";
import MaintenanceTickets from "./Components/MaintenanceTickets/MaintenanceTickets";
import UserRoleManagement from "./Components/userAndRoles/userAndRoles";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Setting/Settings";
import DashboardHeader from "./Components/Header/DashboardHeader";

const App = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when page changes
    // Reset selected client when navigating away from Clients page
    if (page !== "Clients") {
      setSelectedClient(null);
    }
  };

  const handleClientClick = (client) => {
    // Transform client data from list format to detail format
    const clientDetail = {
      name: client.name,
      phone: client.phone || "N/A",
      email: client.email,
      avatar: client.avatar,
      project: {
        address: client.address || "N/A",
        plan: `${client.subscriptionPlan} - ${client.price}`,
        companyAddress: client.companyAddress || "N/A",
        city: client.city || "N/A",
        companyName: client.companyName || "N/A",
        totalLeads: client.totalLeads || "0",
      },
      status: client.status,
      subscriptionPlan: client.subscriptionPlan,
      systemDetails: client.systemDetails,
      nextBilling: client.nextBilling,
      started: client.started,
    };
    setSelectedClient(clientDetail);
  };

  const handleBackToClients = () => {
    setSelectedClient(null);
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(68.02%_68.02%_at_51.42%_0%,_#FFFFFF_0%,_#B3E1FF_50%,_#3887EE_100%)] overflow-x-hidden">
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="flex-1 ml-0 md:ml-[16.666667%] my-0 md:my-5 mr-0 md:mr-5 bg-white rounded-none md:rounded-xl h-screen md:h-[calc(100vh-2.5rem)] flex flex-col overflow-x-hidden max-w-full">
        <DashboardHeader 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        {/* container for the pages - scrollable area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 md:px-6 pt-2 sm:pt-4 md:pt-4 pb-2 sm:pb-4 md:pb-6">
          {activePage === "Dashboard" && <Dashboard setActivePage={setActivePage} />}
          {activePage === 'Clients' && (
            selectedClient ? (
              <ClientPage clientData={selectedClient} onBack={handleBackToClients} />
            ) : (
              <ClientsList onClientClick={handleClientClick} />
            )
          )}
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
