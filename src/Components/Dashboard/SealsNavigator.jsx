import React from "react";

const SealsNavigator = ({ percentage = 0, online = 60, offline = 40 }) => {
  // Calculate the needle rotation: 0% = 180deg (left), 100% = 0deg (right)
  const angle = 180 - (percentage / 100) * 180;
  // Needle endpoint calculation
  const centerX = 90, centerY = 80, needleLen = 45;
  const theta = (angle + 0) * (Math.PI / 180); // SVG: up is -90deg
  const x2 = centerX + needleLen * Math.cos(theta);
  const y2 = centerY + needleLen * Math.sin(theta);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full flex flex-col justify-center">
      <div className="text-xl font-bold mb-6">Seals Navigator</div>
      <div className="flex flex-row items-center justify-between gap-3">
        {/* Gauge and percent in center */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <svg width="180" height="90" viewBox="0 0 180 90">
              <defs>
                <linearGradient id="gauge-gradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="90%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              {/* Arc */}
              <path
                d="M20,80 A70,70 0 0,1 160,80"
                stroke="url(#gauge-gradient)"
                strokeWidth="14"
                fill="none"
              />
              {/* Needle */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx={centerX} cy={centerY} r="15" fill="blackck" />
            </svg>
          </div>
          <span className="text-3xl font-bold text-center">{percentage}%</span>
          <span className="text-sm text-gray-400 leading-4 mt-2 text-center">Sales percentage</span>
        </div>
        {/* Store breakdown spaced to right */}
        <div className="flex flex-col items-start gap-6 ml-3 text-base text-gray-700">
          <span>Online Store <span className="font-bold">{online}%</span></span>
          <span>Offline Store <span className="font-bold">{offline}%</span></span>
        </div>
      </div>
    </div>
  );
};

export default SealsNavigator;
