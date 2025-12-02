import React from "react";

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

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl flex flex-col"
      style={{ minHeight: "420px" }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-start mb-2">
        <div>
          <div className="text-2xl font-bold mb-2">Revenue</div>
        </div>
        <button className="flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-100">
          Month
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="10" height="8" rx="1" />
            <line x1="6" y1="2" x2="6" y2="6" />
            <line x1="10" y1="2" x2="10" y2="6" />
          </svg>
        </button>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mb-4 justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold">
            ${totalRevenue.toLocaleString()}
          </span>
          <span className="text-green-600 font-semibold text-sm">
            ↑+{growth}%
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
            Profit
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-300"></span>
            Loss
          </span>
        </div>
      </div>
      {/* Chart Area */}
      <div
        className="flex-1 flex items-end w-full relative"
        style={{ minHeight: "240px" }}
      >
        <svg
          viewBox="0 0 420 200"
          width="100%"
          height="100%"
          className="w-full"
          style={{ minHeight: "240px" }}
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
            const showTooltip = i === 2; // Show tooltip for March
            const lossBarX = xPos + barWidth / 2 + 4;
            const lossBarCenterX = lossBarX + barWidth / 4;
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

            return (
              <g key={m.month}>
                {/* Profit Bar - sharp bottom, rounded top */}
                <path
                  d={createBarPath(xPos, profitBarTopY, barWidthHalf, profitBarHeight)}
                  className="fill-blue-600"
                />
                {/* Loss Bar - sharp bottom, rounded top */}
                <path
                  d={createBarPath(lossBarX, lossBarTopY, barWidthHalf, lossBarHeight)}
                  className="fill-blue-300"
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

                {/* Tooltip for March - centered above Loss bar */}
                {showTooltip && (
                  <g>
                    <rect
                      x={lossBarCenterX - 45}
                      y={lossBarTopY - 40}
                      rx="4"
                      ry="4"
                      width="90"
                      height="32"
                      fill="white"
                      stroke="#bbb"
                      strokeWidth="1"
                    />
                    <text
                      x={lossBarCenterX}
                      y={lossBarTopY - 24}
                      textAnchor="middle"
                      className="fill-gray-600 text-xs"
                    >
                      3 March 2025
                    </text>
                    <text
                      x={lossBarCenterX}
                      y={lossBarTopY - 10}
                      textAnchor="middle"
                      className="fill-gray-900 text-xs font-semibold"
                    >
                      $16,356
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
