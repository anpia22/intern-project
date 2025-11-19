import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubscriptionPlans from "./Components/Subscription Plans/SubscriptionPlans";
import DashboardHeader from "./Components/Header/DashboardHeader";
import Leads from "./Components/Leads/Leads";
import ClientPage from "./Components/Client/Client";
import PaymentDetailsForm from "./Components/BillingPayment/BillingPayment";

const App = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-[radial-gradient(68.02%_68.02%_at_51.42%_0%,_#FFFFFF_0%,_#B3E1FF_50%,_#3887EE_100%)] relative">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        className="fixed w-1/6 top-0 left-0 h-fit z-40"
      />
      <div className="absolute right-0 w-5/6 h-full my-5 bg-white overflow-y-auto rounded-xl">
        {/* <div className=" flex-1 p-2 sm:p-4 md:p-8 "> */}
        <div className="fixed top-4 z-30 w-full">
          <DashboardHeader />
        </div >
        <div className="pt-[110px] p-4 sm:p-6 md:p-4 mt-10 ">
          {activePage === "Dashboard" && <Dashboard />}
          {activePage === 'Clients' && <ClientPage/>}
          {activePage === "Leads" && <Leads />}
          {activePage === "Subscription Plans" && <SubscriptionPlans />}
          {activePage === "Billing & Payments" && <PaymentDetailsForm/>}
        </div>
      </div>
    </div>
  );
};

export default App;
