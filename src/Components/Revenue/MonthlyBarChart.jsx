"use client";
import React from "react";

const MonthlyBarChart = () => {
  // Monthly data matching the image (approximate values based on bar heights)
  const monthlyData = [
    { month: "Jan", value: 85 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 40 },
    { month: "May", value: 55 },
    { month: "Jun", value: 60 },
    { month: "Jul", value: 75 },
    { month: "Aug", value: 80 },
    { month: "Sep", value: 70 },
    { month: "Oct", value: 85 },
    { month: "Nov", value: 100 },
    { month: "Dec", value: 95 },
  ];

  const maxValue = 130; // Max value on Y-axis
  const chartBottom = 140;
  const chartTop = 15;
  const chartHeight = chartBottom - chartTop;
  const barWidth = 10;
  const barGap = 26;
  const startX = 60;

  // Scale function
  const scale = (val) => (val / maxValue) * chartHeight;
  const getYPosition = (value) => chartBottom - scale(value);

  // Y-axis labels
  const yAxisLabels = [130, 110, 90, 70, 50, 30, 10];

  return (
    <div className="w-full">
      <div
        className="flex items-end w-full relative"
        style={{ minHeight: "200px" }}
      >
        <svg
          viewBox="0 0 500 160"
          width="100%"
          height="100%"
          className="w-full"
          style={{ minHeight: "200px" }}
        >
          {/* Baseline */}
          <line
            x1="50"
            y1={chartBottom}
            x2="480"
            y2={chartBottom}
            stroke="#d1d5db"
            strokeWidth="2"
          />

          {/* Y-axis labels and grid lines */}
          {yAxisLabels.map((yValue, i) => {
            const yPos = chartTop + (i * chartHeight) / 6;
            return (
              <React.Fragment key={yValue}>
                <text
                  x="10"
                  y={yPos + 4}
                  className="fill-gray-400 text-xs font-medium"
                  textAnchor="start"
                >
                  {yValue}k
                </text>
                <line
                  x1="50"
                  y1={yPos}
                  x2="480"
                  y2={yPos}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </React.Fragment>
            );
          })}

          {/* Bars */}
          {monthlyData.map((data, i) => {
            const xPos = startX + i * (barWidth + barGap);
            const barY = getYPosition(data.value);
            const barHeight = scale(data.value);
            const monthLabelX = xPos + barWidth / 2;

            return (
              <g key={data.month}>
                {/* Bar */}
                <rect
                  x={xPos}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  className="fill-blue-600"
                />
                {/* Month Label */}
                <text
                  x={monthLabelX}
                  y="155"
                  textAnchor="middle"
                  className="fill-gray-600 text-xs font-normal"
                >
                  {data.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default MonthlyBarChart;

