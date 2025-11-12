const RevenueChart = () => (
  <div className="bg-white rounded-2xl shadow-xl p-6 w-full h-full min-h-[350px] flex flex-col justify-between">
    {/* Header */}
    <div className="flex flex-row justify-between items-start mb-1">
      <div>
        <div className="text-base font-bold mb-1">Revenue</div>
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold">$86,400.12</span>
          <span className="text-green-600 font-semibold text-xs">+10%</span>
        </div>
      </div>
      <button className="flex items-center gap-1 bg-blue-100 text-blue-900 px-3 py-1 rounded-lg font-semibold text-xs shadow-none">
        Month
        <svg width="14" height="14" fill="none" stroke="currentColor" className="ml-1">
          <rect x="3" y="5" width="8" height="6" rx="2" strokeWidth="1.5" />
          <line x1="6" y1="2" x2="6" y2="6" strokeWidth="1.5" />
          <line x1="10" y1="2" x2="10" y2="6" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
    {/* Legend */}
    <div className="flex gap-3 mt-1 mb-2 justify-end">
      <span className="flex items-center gap-1 text-xs">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-700"></span> Profit
      </span>
      <span className="flex items-center gap-1 text-xs">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-300"></span> Loss
      </span>
    </div>
    {/* Chart Area (SVG) */}
    <div className="flex-1 flex items-end w-full h-full">
      <svg
        viewBox="0 0 370 170"
        width="100%"
        height="100%"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Y labels and grid */}
        {[40, 30, 20, 10, 0].map((y, i) => (
          <text key={y} x="0" y={34 + i * 28} className="fill-gray-400 text-[10px]">{y}k</text>
        ))}
        {[40, 30, 20, 10, 0].map((line, i) => (
          <line
            key={line}
            x1="26" y1={34 + i * 28}
            x2="360" y2={34 + i * 28}
            stroke="#e5e7eb"
            strokeDasharray="6 2"
          />
        ))}
        {/* Bars */}
        <rect x="56" y="45" width="12" height="105" rx="5" className="fill-blue-700" />
        <rect x="72" y="88" width="12" height="62" rx="5" className="fill-blue-300" />
        <rect x="110" y="120" width="12" height="30" rx="5" className="fill-blue-700" />
        <rect x="126" y="88" width="12" height="62" rx="5" className="fill-blue-300" />
        <rect x="164" y="100" width="12" height="48" rx="5" className="fill-blue-700" />
        <rect x="180" y="62" width="12" height="86" rx="5" className="fill-blue-300" />
        <rect x="218" y="109" width="12" height="39" rx="5" className="fill-blue-700" />
        <rect x="234" y="122" width="12" height="26" rx="5" className="fill-blue-300" />
        {/* Month Labels */}
        <text x="62" y="164" className="fill-gray-600 text-[10px]">Jan</text>
        <text x="118" y="164" className="fill-gray-600 text-[10px]">Feb</text>
        <text x="170" y="164" className="fill-gray-600 text-[10px]">Mar</text>
        <text x="226" y="164" className="fill-gray-600 text-[10px]">Apr</text>
        {/* Tooltip */}
        <rect x="210" y="80" rx="4" ry="4" width="53" height="24" fill="#fff" stroke="#bbb"></rect>
        <text x="215" y="93" class="fill-black text-[7px]">3 March 2025</text>
        <text x="215" y="100" className="fill-black font-bold text-[7px]">$16,356</text>
      </svg>
    </div>
  </div>
);

export default RevenueChart;
