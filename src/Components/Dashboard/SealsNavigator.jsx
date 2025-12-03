import React from "react";

const SealsNavigator = ({ percentage = 63, online = 60, offline = 40 }) => {
  // Calculate the needle rotation: 0% = -90deg (left), 100% = 90deg (right)
  const angle = -90 + (percentage / 100) * 180;
  
  // Calculate arc length for semicircle: π * radius ≈ 219.9
  const arcLength = Math.PI * 70;
  const visibleLength = (percentage / 100) * arcLength;
  
  return (
    <div className="bg-white rounded-xl md:rounded-3xl shadow-lg p-4 md:p-8 w-full max-w-lg mx-auto">
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-8">Seals Navigator</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Gauge Section */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <div className="relative w-full max-w-[200px] md:max-w-none" style={{ height: '90px' }}>
            <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3887EE" />
                  <stop offset={`${percentage}%`} stopColor="#B3E1FF" />
                </linearGradient>
              </defs>
              
              {/* Background arc - unfilled portion */}
              <path
                d="M 30 100 A 70 70 0 0 1 170 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
                strokeLinecap="butt"
              />
              
              {/* Colored arc - only shows up to needle position */}
              <path
                d="M 30 100 A 70 70 0 0 1 170 100"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth="20"
                strokeLinecap="butt"
                strokeDasharray={`${visibleLength} ${arcLength}`}
              />
              
             {/* Needle - Triangle shape */}
             <g transform={`translate(100, 100) rotate(${angle})`}>
                <path
                  d="M -4 0 L 4 0 L 0 -60 Z"
                  fill="#000"
                />
                <circle cx="0" cy="0" r="10" fill="#000" />
              </g>
            </svg>
          </div>
          
          <div className="mt-2 text-center">
            <div className="text-2xl md:text-4xl font-bold">{percentage}%</div>
            <div className="text-gray-500 text-xs md:text-sm mt-1">Sales percentage</div>
          </div>
        </div>
        
        {/* Legend Section */}
        <div className="flex flex-row md:flex-col gap-4 md:gap-4 md:ml-8 w-full md:w-auto justify-center md:justify-start">
          <div className="text-sm md:text-base">
            Online Store <span className="font-semibold">{online}%</span>
          </div>
          <div className="text-sm md:text-base">
            Offline Store <span className="font-semibold">{offline}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SealsNavigator;
