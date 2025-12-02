"use client";
import React, { useState } from "react";

const OverallLeadsChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  // Data matching the reference image exactly
  const currentWeekData = [
    { date: "Dec 4", value: 25 },
    { date: "Dec 5", value: 55 },
    { date: "Dec 6", value: 85 },
    { date: "Dec 7", value: 85 },
    { date: "Dec 8", value: 100 },
    { date: "Dec 9", value: 95 },
    { date: "Dec 10", value: 140 },
  ];

  const lastWeekData = [
    { date: "Dec 4", value: 50 },
    { date: "Dec 5", value: 60 },
    { date: "Dec 6", value: 50 },
    { date: "Dec 7", value: 30 },
    { date: "Dec 8", value: 45 },
    { date: "Dec 9", value: 40 },
    { date: "Dec 10", value: 65 },
  ];

  const activeIndex = clickedIndex !== null ? clickedIndex : hoveredIndex;

  const maxValue = 150;
  const chartWidth = 600;
  const chartHeight = 250;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const chartAreaWidth = chartWidth - padding.left - padding.right;
  const chartAreaHeight = chartHeight - padding.top - padding.bottom;

  const scaleY = (value) => {
    return chartAreaHeight - (value / maxValue) * chartAreaHeight;
  };

  const scaleX = (index) => {
    return (index / (currentWeekData.length - 1)) * chartAreaWidth;
  };

  // Generate path for line
  const generatePath = (data) => {
    return data
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${padding.left + scaleX(index)} ${
            padding.top + scaleY(point.value)
          }`
      )
      .join(" ");
  };

  const currentWeekPath = generatePath(currentWeekData);
  const lastWeekPath = generatePath(lastWeekData);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Overall Leads</h2>
        <div className="flex items-center gap-4">
          {/* Legend - Top Right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-600">Current Week</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
              <span className="text-sm text-gray-600">Last Week</span>
            </div>
          </div>
          {/* Growth Badge */}
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg">
            <span className="text-sm font-semibold">28%↑</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid Lines */}
          {[25, 50, 75, 100, 125, 150].map((yValue) => {
            const y = padding.top + scaleY(yValue);
            return (
              <line
                key={yValue}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Y-axis Labels */}
          {[25, 50, 75, 100, 125, 150].map((yValue) => {
            const y = padding.top + scaleY(yValue);
            return (
              <text
                key={yValue}
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-gray-400 text-xs font-medium"
              >
                {yValue}k
              </text>
            );
          })}

          {/* X-axis Labels */}
          {currentWeekData.map((point, index) => {
            const x = padding.left + scaleX(index);
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="fill-gray-600 text-xs font-medium"
              >
                {point.date}
              </text>
            );
          })}

          {/* Last Week Line (Dashed) */}
          <path
            d={lastWeekPath}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* Current Week Line (Solid) */}
          <path
            d={currentWeekPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
          />

          {/* Data Points - Current Week */}
          {currentWeekData.map((point, index) => {
            const x = padding.left + scaleX(index);
            const y = padding.top + scaleY(point.value);
            const isActive = activeIndex === index;
            return (
              <circle
                key={`current-${index}`}
                cx={x}
                cy={y}
                r={isActive ? "7" : "5"}
                fill="#2563eb"
                stroke="white"
                strokeWidth={isActive ? "3" : "2"}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
              />
            );
          })}

          {/* Data Points - Last Week */}
          {lastWeekData.map((point, index) => {
            const x = padding.left + scaleX(index);
            const y = padding.top + scaleY(point.value);
            const isActive = activeIndex === index;
            return (
              <circle
                key={`last-${index}`}
                cx={x}
                cy={y}
                r={isActive ? "7" : "5"}
                fill="#93c5fd"
                stroke="white"
                strokeWidth={isActive ? "3" : "2"}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
              />
            );
          })}

          {/* Dynamic Tooltip - Shows on hover or click */}
          {activeIndex !== null && (
            <g className="cursor-pointer z-30">
              {/* Vertical dashed line at active point */}
              <line
                x1={padding.left + scaleX(activeIndex)}
                y1={padding.top}
                x2={padding.left + scaleX(activeIndex)}
                y2={chartHeight - padding.bottom}
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Tooltip box - positioned above the current week line */}
              <rect
                x={padding.left + scaleX(activeIndex) - 60}
                y={padding.top + scaleY(currentWeekData[activeIndex].value) - 40}
                width="120"
                height="32"
                fill="#60a5fa"
                rx="6"
                opacity="0.95"
              />
              {/* Tooltip text - Date */}
              <text
                x={padding.left + scaleX(activeIndex)}
                y={padding.top + scaleY(currentWeekData[activeIndex].value) - 27}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
              >
                {currentWeekData[activeIndex].date}
              </text>
              {/* Tooltip text - Value */}
              <text
                x={padding.left + scaleX(activeIndex)}
                y={padding.top + scaleY(currentWeekData[activeIndex].value) - 13}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
              >
                {currentWeekData[activeIndex].value} Leads
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default OverallLeadsChart;

