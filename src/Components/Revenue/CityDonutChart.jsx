"use client";
import React from "react";
import background from "../../Images/bground2.png";

// ---- MOVE THESE OUTSIDE THE COMPONENT ----
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createArcPath = (centerX, centerY, startAngle, endAngle, innerRadius, outerRadius) => {
  const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
  const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

  return [
    "M", start.x, start.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
    "L", innerEnd.x, innerEnd.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    "Z"
  ].join(" ");
};

// ---- COMPONENT ----
const CityDonutChart = () => {
  const cityData = [
    { name: "Pune", value: 40, color: "#10b981" },
    { name: "Mumbai", value: 30, color: "#ec4899" },
    { name: "Kolhapur", value: 20, color: "#fbbf24" },
    { name: "Nagpur", value: 10, color: "#3b82f6" },
  ];

  const total = cityData.reduce((sum, c) => sum + c.value, 0);

  const radius = 160;
  const centerX = 180;
  const centerY = 180;

  let currentAngle = -90;

  const segments = cityData.map((city) => {
    const percentage = (city.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return { ...city, startAngle, endAngle };
  });

  return (
    <div
      className="w-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">City</h2>

      <div className="flex items-start justify-between w-full">
        
        <div className="relative flex-shrink-0">
          <svg
            width="360"
            height="360"
            viewBox="0 0 360 360"
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
          >
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createArcPath(
                  centerX,
                  centerY,
                  segment.startAngle,
                  segment.endAngle,
                  100,
                  radius
                )}
                fill={segment.color}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500 mb-1 leading-none">28%</p>
              <p className="text-sm text-gray-900 font-medium">Increase Income</p>
              <p className="text-sm text-gray-900 font-medium mt-1">In This Month</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-shrink-0 mr-10">
          {[
            { name: "Kolhapur", color: "#fbbf24" },
            { name: "Mumbai", color: "#ec4899" },
            { name: "Pune", color: "#10b981" },
            { name: "Nagpur", color: "#3b82f6" },
          ].map((city, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: city.color }} />
              <span className="text-base text-gray-600 font-medium">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityDonutChart;
