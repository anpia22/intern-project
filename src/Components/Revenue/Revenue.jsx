"use client";
import React from "react";
import {
  faFilter,
  faDownload,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatsCardsGrid from "../Shared/StatsCardsGrid";
import CityDonutChart from "./CityDonutChart";
import MonthlyBarChart from "./MonthlyBarChart";
import background from "../../Images/bground2.png";

const Revenue = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>

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

            {/* Date Button */}
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-gray-200 transition-colors">
              <span>Date</span>
              <FontAwesomeIcon icon={faCalendar} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Section - Donut Chart and Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* City Donut Chart - Full width on left */}
        <div className="rounded-2xl shadow-lg px-8 py-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
        >
          <CityDonutChart />
        </div>

        {/* Stats Cards Grid */}
        <div className="w-full">
          <StatsCardsGrid
            stats={[
              { title: "Total Revenue", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Total Leads", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Total Visitors", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Net Profit", value: 12832, percent: 20.1, delta: 2123 },
            ]}
          />
        </div>
      </div>

      {/* Bottom Section - Monthly Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Revenue;

