import React, { useState } from "react";

const defaultData = [
  { month: "Jan", profit: 32000, loss: 14000 },
  { month: "Feb", profit: 7000, loss: 17000 },
  { month: "Mar", profit: 8000, loss: 16356 },
  { month: "Apr", profit: 14000, loss: 4000 },
];

const RevenueChart = ({
  data = defaultData,
  totalRevenue = 86400.12,
  growth = 10,
}) => {
  const [tooltip, setTooltip] = useState(null); // { index, type: 'profit' | 'loss', x, y, value }

  const maxValue = 40000; // Scale to 40k to match reference
  const barWidth = 32;
  const barGap = 80;
  const chartBottom = 180;
  const chartTop = 20;
  const chartHeight = chartBottom - chartTop; // 160

  const startX = 60;

  // Scales the height of each bar according to max value (40k)
  const scale = (val) => (val / maxValue) * chartHeight;

  // Calculate Y position for a given value (0-40k maps to chartBottom to chartTop)
  const getYPosition = (value) => chartBottom - scale(value);

  // Format month name to date string
  const formatMonthDate = (month) => {
    const monthMap = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };
    return monthMap[month] || month;
  };

  return (
    <div
      className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-8 w-full max-w-3xl flex flex-col"
      style={{ minHeight: "300px" }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-start mb-2">
        <div>
          <div className="text-base md:text-2xl font-bold mb-1 md:mb-2">Revenue</div>
        </div>
        <button className="flex items-center gap-1 md:gap-2 bg-blue-50 text-blue-900 px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium text-xs md:text-sm hover:bg-blue-100">
          Month
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="md:w-4 md:h-4"
          >
            <rect x="3" y="5" width="10" height="8" rx="1" />
            <line x1="6" y1="2" x2="6" y2="6" />
            <line x1="10" y1="2" x2="10" y2="6" />
          </svg>
        </button>
      </div>
      {/* Legend */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-3 md:mb-4 justify-between">
        <div className="flex items-baseline gap-1 md:gap-2">
          <span className="text-sm md:text-lg font-semibold">
            ${totalRevenue.toLocaleString()}
          </span>
          <span className="text-green-600 font-semibold text-xs md:text-sm">
            ↑+{growth}%
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-2 justify-start sm:justify-end">
          <span className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium">
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#3887ee]"></span>
            Profit
          </span>
          <span className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium">
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-300"></span>
            Loss
          </span>
        </div>
      </div>
      {/* Chart Area */}
      <div
        className="flex-1 flex items-end w-full relative"
        style={{ minHeight: "180px" }}
      >
        <svg
          viewBox="0 0 420 200"
          width="100%"
          height="100%"
          className="w-full"
          style={{ minHeight: "180px" }}
        >
          {/* Baseline at 0 */}
          <line
            x1="45"
            y1={chartBottom}
            x2="400"
            y2={chartBottom}
            stroke="#d1d5db"
            strokeWidth="2"
          />

          {/* Y axis labels and grid - positioned according to actual values */}
          {[40, 30, 20, 10, 5, 0].map((yValue) => {
            // Position grid lines based on actual numeric values (not uniform spacing)
            const valueInThousands = yValue * 1000; // Convert to actual value (e.g., 40k = 40000)
            const yPos = getYPosition(valueInThousands);
            return (
              <React.Fragment key={yValue}>
                <text
                  x="10"
                  y={yPos+4}
                  className="fill-gray-400 text-xs font-medium"
                  textAnchor="start"
                >
                  {yValue}k
                </text>
                <line
                  x1="45"
                  y1={yPos}
                  x2="400"
                  y2={yPos}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </React.Fragment>
            );
          })}

          {/* Dynamic Bars */}
          {data.map((m, i) => {
            const xPos = startX + i * barGap;
            const lossBarX = xPos + barWidth / 2 + 4;
            const lossBarCenterX = lossBarX + barWidth / 4;
            const profitBarCenterX = xPos + barWidth / 4;
            const profitBarHeight = scale(m.profit);
            const lossBarHeight = scale(m.loss);
            const profitBarTopY = chartBottom - profitBarHeight;
            const lossBarTopY = chartBottom - lossBarHeight;
            const monthLabelX = xPos + barWidth / 2 + 2;
            const barWidthHalf = barWidth / 2;
            const cornerRadius = 6;

            // Create path for rounded top corners only (sharp bottom)
            const createBarPath = (x, topY, width, height) => {
              const bottomY = topY + height;
              // Path: start bottom-left (sharp), line to top-left, arc top-left corner, 
              // line to top-right, arc top-right corner, line to bottom-right (sharp), close
              return `M ${x} ${bottomY} L ${x} ${topY + cornerRadius} Q ${x} ${topY} ${x + cornerRadius} ${topY} L ${x + width - cornerRadius} ${topY} Q ${x + width} ${topY} ${x + width} ${topY + cornerRadius} L ${x + width} ${bottomY} Z`;
            };

            const handleBarInteraction = (type, centerX, topY, value) => {
              setTooltip({
                index: i,
                type,
                x: centerX,
                y: topY,
                value,
                month: m.month,
              });
            };

            const handleBarLeave = () => {
              setTooltip(null);
            };

            return (
              <g key={m.month}>
                {/* Profit Bar - sharp bottom, rounded top */}
                <path
                  d={createBarPath(xPos, profitBarTopY, barWidthHalf, profitBarHeight)}
                  className="fill-[#3887ee] cursor-pointer"
                  onMouseEnter={() => handleBarInteraction('profit', profitBarCenterX, profitBarTopY, m.profit)}
                  onMouseLeave={handleBarLeave}
                  onClick={() => handleBarInteraction('profit', profitBarCenterX, profitBarTopY, m.profit)}
                />
                {/* Loss Bar - sharp bottom, rounded top */}
                <path
                  d={createBarPath(lossBarX, lossBarTopY, barWidthHalf, lossBarHeight)}
                  className="fill-blue-300 cursor-pointer"
                  onMouseEnter={() => handleBarInteraction('loss', lossBarCenterX, lossBarTopY, m.loss)}
                  onMouseLeave={handleBarLeave}
                  onClick={() => handleBarInteraction('loss', lossBarCenterX, lossBarTopY, m.loss)}
                />
                {/* Month Labels */}
                <text
                  x={monthLabelX}
                  y="195"
                  textAnchor="middle"
                  className="fill-gray-600 text-[12px] font-medium"
                >
                  {m.month}
                </text>
              </g>
            );
          })}

          {/* Dynamic Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={tooltip.x - 50}
                y={tooltip.y - 40}
                rx="4"
                ry="4"
                width="100"
                height="32"
                fill="white"
                stroke="#bbb"
                strokeWidth="1"
              />
              <text
                x={tooltip.x}
                y={tooltip.y - 24}
                textAnchor="middle"
                className="fill-gray-600 text-xs"
              >
                {formatMonthDate(tooltip.month)} 2025
              </text>
              <text
                x={tooltip.x}
                y={tooltip.y - 10}
                textAnchor="middle"
                className="fill-gray-900 text-xs font-semibold"
              >
                ${tooltip.value.toLocaleString()}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
