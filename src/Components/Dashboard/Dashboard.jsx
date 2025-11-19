import StatCard from "../CardSection/StatCard";
import RevenueChart from "./RevenueChart";
import RecentActivity from "./RecentActivity";
import SealsNavigator from "./SealsNavigator";

const Dashboard = () => (
  <div className="mt-10">
    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button className="text-blue-700 font-medium px-4 py-2 rounded-xl bg-white hover:bg-blue-100 transition">Subscription</button>
        <button className="text-white bg-blue-600 px-6 py-2 rounded-xl flex items-center font-medium hover:bg-blue-700 transition">
          Export
          <svg width="18" height="18" className="ml-2" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" strokeWidth="2" />
            <path d="M12 15V3" strokeWidth="2" />
          </svg>
        </button>
        <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl flex items-center gap-2 font-medium">
          Date
          <svg width="18" height="18" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="12" height="10" rx="2" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="12" y1="2" x2="12" y2="6" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  <div className="w-full max-w-[1400px] mx-auto py-6">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <StatCard
          title="Total Leads"
          value={12832}
          percent={20.1}
          delta={2123}
        />
        <StatCard
          title="Active Leads"
          value={12832}
          percent={20.1}
          delta={2123}
        />
        <StatCard
          title="Subscriptions"
          value={12832}
          percent={20.1}
          delta={2123}
        />
        <StatCard title="leads" value={12832} percent={20.1} delta={2123} />
      </div>
      <RevenueChart />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <RecentActivity />
      <SealsNavigator />
    </div>
  </div>
  </div>
);

export default Dashboard;
