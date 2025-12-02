"use client";
import React from "react";

const LeadsPerWeek = () => {
  const hours = ["7PM", "8PM", "9PM", "10PM", "11PM", "12PM"];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Sample heatmap data (random values for demonstration)
  const generateHeatmapData = () => {
    const data = [];
    hours.forEach((hour, hourIndex) => {
      days.forEach((day, dayIndex) => {
        // Generate random values between 10-200
        const value = Math.floor(Math.random() * 190) + 10;
        data.push({
          hour: hourIndex,
          day: dayIndex,
          value: value,
        });
      });
    });
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getColor = (value) => {
    if (value >= 110 && value <= 200) return "bg-blue-700"; // Darkest
    if (value >= 60 && value <= 100) return "bg-blue-400"; // Medium dark
    if (value >= 40 && value <= 50) return "bg-gray-400"; // Medium light
    return "bg-gray-200"; // Lightest (10-30)
  };

  const getRange = (value) => {
    if (value >= 110 && value <= 200) return "110-200";
    if (value >= 60 && value <= 100) return "60-100";
    if (value >= 40 && value <= 50) return "40-50";
    return "10-30";
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Leads Per Week</h2>
      </div>

      {/* Heatmap Grid */}
      <div className="mb-6">
        <div className="flex flex-col gap-3">
          {/* Days Header */}
          <div className="flex gap-2 pl-12">
            {days.map((day) => (
              <div
                key={day}
                className="flex-1 text-center text-xs font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Hours and Grid */}
          {hours.map((hour, hourIndex) => (
            <div key={hour} className="flex items-center gap-2">
              <div className="w-12 text-xs font-medium text-gray-600 text-right">
                {hour}
              </div>
              <div className="flex gap-2 flex-1">
                {days.map((day, dayIndex) => {
                  const cellData = heatmapData.find(
                    (d) => d.hour === hourIndex && d.day === dayIndex
                  );
                  const value = cellData?.value || 10;
                  return (
                    <div
                      key={`${hour}-${day}`}
                      className={`flex-1 rounded ${getColor(value)} hover:opacity-80 transition-opacity cursor-pointer`}
                      style={{ height: '25px' }}
                      title={`${day} ${hour}: ${value} leads`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4">
        <span className="text-xs text-gray-600">Less</span>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded bg-gray-200" title="10-30"></div>
          <div className="w-6 h-6 rounded bg-gray-400" title="40-50"></div>
          <div className="w-6 h-6 rounded bg-blue-400" title="60-100"></div>
          <div className="w-6 h-6 rounded bg-blue-700" title="110-200"></div>
        </div>
        <span className="text-xs text-gray-600">More</span>
      </div>

      {/* Legend Labels */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-300"></div>
          <span className="text-xs text-gray-600">10-30</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-xs text-gray-600">40-50</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-700"></div>
          <span className="text-xs text-gray-600">60-100</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-900"></div>
          <span className="text-xs text-gray-600">110-200</span>
        </div>
      </div>
    </div>
  );
};

export default LeadsPerWeek;

