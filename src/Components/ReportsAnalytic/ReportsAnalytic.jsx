"use client";
import React from "react";
import {
  faFilter,
  faDownload,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverallLeadsChart from "./OverallLeadsChart";
import NewLeadsChart from "./NewLeadsChart";
import RecentActivityTable from "../Shared/RecentActivityTable";
import LeadsPerWeek from "./LeadsPerWeek";

const ReportsAnalytic = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytic
          </h1>

          <div className="flex items-center gap-3">
            {/* Filter Icon */}
            <button className="bg-blue-300 rounded-lg px-4 py-3 text-slate-900 hover:bg-blue-400 transition-colors">
              <FontAwesomeIcon icon={faFilter} />
            </button>

            {/* Export Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <span>Export</span>
              <FontAwesomeIcon icon={faDownload} />
            </button>

            {/* Date Input */}
            <div className="relative">
              <input
                type="date"
                className="bg-gray-100 rounded-lg px-4 py-2 pr-10 text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{/* Overall Leads Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">
          <OverallLeadsChart />
        </div>

        {/* New Leads Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
          <NewLeadsChart />
        </div></div>
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Leads History Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">
            <RecentActivityTable title="Recent Leads History" />
          </div>

          {/* Leads Per Week Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
            <LeadsPerWeek />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytic;
