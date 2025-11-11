import React from "react";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import RecentActivity from "./RecentActivity";
import SealsNavigator from "./SealsNavigator";

const Dashboard = () => (
  <div className="w-full max-w-[1480px] mx-auto">
    <DashboardHeader />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard title="Total Leads" value={12832} percent={20.1} delta={2123} />
      <StatCard title="Active Leads" value={12832} percent={20.1} delta={2123} />
      <StatCard title="Subscriptions" value={12832} percent={20.1} delta={2123} />
      <StatCard title="Clients" value={12832} percent={20.1} delta={2123} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-6">
      <RevenueChart />
      <RecentActivity />
      <SealsNavigator />
    </div>
  </div>
);

export default Dashboard;
