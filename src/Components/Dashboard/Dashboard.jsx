import StatsCardsGrid from "../Shared/StatsCardsGrid";
import RevenueChart from "./RevenueChart";
import RecentActivityTable from "../Shared/RecentActivityTable";
import SealsNavigator from "./SealsNavigator";

const Dashboard = ({ setActivePage }) => (
  <div className="p-0 md:px-4 w-full max-w-full md:max-w-7xl mx-auto overflow-x-hidden">
    <div className="flex-shrink-0 bg-white rounded-t-xl md:rounded-t-xl pb-3 md:pb-4 z-30 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 mx-auto pb-2 md:pb-3 px-2 md:px-3 md:ml-10 md:w-11/12 w-full max-w-full">
        <h1 className="text-base md:text-xl lg:text-2xl font-semibold text-black w-full md:w-auto text-center md:text-left">Dashboard</h1>
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end flex-wrap">
          <button 
            onClick={() => setActivePage("Subscription Plans")}
            className="text-[#3887ee] hover:text-blue-700 font-medium text-xs md:text-base"
          >
            Subscription
          </button>
          <button className="flex items-center gap-1.5 md:gap-2 bg-[#3887ee] text-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-base">
            <span>Export</span>
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 md:gap-2 bg-gray-100 text-gray-700 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs md:text-base">
            <span>Date</span>
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div className="w-full max-w-full md:max-w-7xl mx-auto pt-3 pb-3 md:pt-6 md:pb-6 px-2 md:px-0 overflow-x-hidden">
      {/* stats card section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 mb-3 md:mb-8">
        <StatsCardsGrid
          stats={[
            { title: "Total Leads", value: 12832, percent: 20.1, delta: 2123 },
            { title: "Active Leads", value: 12832, percent: 20.1, delta: 2123 },
            {
              title: "Subscriptions",
              value: 12832,
              percent: 20.1,
              delta: 2123,
            },
            { title: "leads", value: 12832, percent: 20.1, delta: 2123 },
          ]}
        />
        <RevenueChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
        <div className="bg-white rounded-xl shadow-lg p-2 md:p-4 w-full lg:col-span-2">
          <RecentActivityTable title="Recent Activity" />
        </div>
        <SealsNavigator />
      </div>
    </div>
  </div>
);

export default Dashboard;
