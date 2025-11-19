import React from "react";

const defaultData = [
  { month: "Jan", profit: 32000, loss: 20000 },
  { month: "Feb", profit: 10000, loss: 20000 },
  { month: "Mar", profit: 15000, loss: 30000 },
  { month: "Apr", profit: 10000, loss: 7000 },
  { month: "May", profit: 25000, loss: 15000 },
  { month: "Jun", profit: 30000, loss: 10000 },
  { month: "Jul", profit: 20000, loss: 12000 },
  { month: "Aug", profit: 27000, loss: 8000 },
];

// Helper to get max value for scaling
const getMaxValue = (arr) =>
  Math.max(...arr.map((d) => Math.max(d.profit, d.loss)));

const RevenueChart = ({
  data = defaultData,
  totalRevenue = 86400.12,
  growth = 10,
}) => {
  const maxValue = getMaxValue(data);
  const barWidth = 24;
  const barGap = 34;
  const svgHeight = 170;
  const chartBottom = 150;
  const chartTop = 45;
  const svgWidth = 370;
  const firstBarOffset = 34;

  const totalWidth = barGap * (data.length - 1);
  const startX = (svgWidth - totalWidth) / 2;

  // Scales the height of each bar according to max value
  const scale = (val) => (val / maxValue) * (chartBottom - chartTop);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full min-h-[350px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-row justify-between items-start mb-1">
        <div>
          <div className="text-base font-bold mb-1">Revenue</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-semibold">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-green-600 font-semibold text-xs">
              +{growth}%
            </span>
          </div>
        </div>
        <button className="flex items-center gap-1 bg-blue-100 text-blue-900 px-3 py-1 rounded-lg font-semibold text-xs shadow-none">
          Month
          {/* calendar icon */}
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            className="ml-1"
          >
            <rect x="3" y="5" width="8" height="6" rx="2" strokeWidth="1.5" />
            <line x1="6" y1="2" x2="6" y2="6" strokeWidth="1.5" />
            <line x1="10" y1="2" x2="10" y2="6" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      {/* Legend */}
      <div className="flex gap-3 mt-1 mb-2 justify-end">
        <span className="flex items-center gap-1 text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-700"></span>{" "}
          Profit
        </span>
        <span className="flex items-center gap-1 text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-300"></span>{" "}
          Loss
        </span>
      </div>
      {/* Chart Area */}
      <div className="flex-1 flex items-end w-full h-full">
        <svg
          viewBox="0 0 370 170"
          width="100%"
          height="100%"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Y axis labels and grid */}
          {[40, 30, 20, 10, 0].map((y, i) => (
            <text
              key={y}
              x="0"
              y={34 + i * 28}
              className="fill-gray-400 text-[10px]"
            >
              {y}k
            </text>
          ))}
          {[40, 30, 20, 10, 0].map((line, i) => (
            <line
              key={line}
              x1="26"
              y1={34 + i * 28}
              x2="360"
              y2={34 + i * 28}
              stroke="#e5e7eb"
              strokeDasharray="6 2"
            />
          ))}

          {/* Dynamic Bars */}
          {data.map((m, i) => (
            <g key={m.month}>
              {/* Profit */}
              <rect
                x={startX + i * barGap - barWidth / 4}
                y={chartBottom - scale(m.profit)}
                width={barWidth / 2 - 2}
                height={scale(m.profit)}
                rx="5"
                className="fill-blue-700"
              />
              {/* Loss */}
              <rect
                x={startX + 6 + i * barGap}
                y={chartBottom - scale(m.loss)}
                width={barWidth / 2 - 2}
                height={scale(m.loss)}
                rx="5"
                className="fill-blue-300"
              />
              {/* Month Labels */}
              <text
                x={startX + 4 + i * barGap}
                y="164"
                textAnchor="middle"
                className="fill-gray-600 text-[10px]"
              >
                {m.month}
              </text>
            </g>
          ))}
          <div className="absolute ">
            <rect
              x="145"
              y="80"
              rx="4"
              ry="4"
              width="53"
              height="24"
              fill="#fff"
              stroke="#bbb"
            ></rect>
            <text x="150" y="93" className="fill-black text-[7px]">
              ${}
            </text>
            <text x="150" y="100" className="fill-black font-bold text-[7px]">
              ${data[2]?.profit.toLocaleString()}
            </text>
          </div>
          {/* Optionally, add a tooltip for a selected month */}
          {/* e.g., hardcoded tooltip for March */}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
