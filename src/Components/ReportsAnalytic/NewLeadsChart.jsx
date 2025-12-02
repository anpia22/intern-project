"use client";
import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewLeadsChart = () => {
  const newLeads = 255;
  const oldLeads = 145;
  const total = newLeads + oldLeads;
  const newLeadsPercent = Math.round((newLeads / total) * 100);
  const oldLeadsPercent = Math.round((oldLeads / total) * 100);

  // Donut chart calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const newLeadsArc = (newLeadsPercent / 100) * circumference;
  const oldLeadsArc = (oldLeadsPercent / 100) * circumference;
  const newLeadsOffset = circumference - newLeadsArc;
  const oldLeadsOffset = circumference - oldLeadsArc;

  const leadSources = [
    { name: "Social Media", percent: 48, color: "#fbbf24" }, // Yellow
    { name: "Direct Search", percent: 33, color: "#a855f7" }, // Purple
    { name: "Other", percent: 19, color: "#92400e" }, // Brown
  ];

  return (
    <div className="w-full">
      {/* Header with Legend */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">New Leads</h2>
        {/* Legend - Top Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">New Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Old Leads</span>
          </div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg 
            width="240" 
            height="240" 
            viewBox="0 0 200 200"
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
            }}
          >
            {/* Background circle (Gray) - Full circle, always visible */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            {/* Old Leads (Blue) - Top portion */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={oldLeadsOffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* New Leads (Green) - Bottom right portion */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={newLeadsOffset}
              strokeLinecap="round"
              transform={`rotate(${-90 + (oldLeadsPercent / 100) * 360} 100 100)`}
              style={{ transition: "all 0.3s ease" }}
            />
          </svg>
          {/* Center Icon - Green outline */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full p-4 border-2 border-green-500 bg-white shadow-sm">
              <FontAwesomeIcon icon={faUser} className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Lead Sources (Left) and Summary Box (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Lead Sources Breakdown - Left */}
        <div className="space-y-3">
          {leadSources.map((source, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: source.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {source.name} {source.percent}%
              </span>
            </div>
          ))}
        </div>

        {/* Summary Box - Right */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex flex-col items-start justify-center">
          <div className="text-2xl font-bold text-green-700 ">{newLeads}</div>
          <p className="text-sm text-gray-700 text-left">
            New Leads in This Week
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewLeadsChart;

