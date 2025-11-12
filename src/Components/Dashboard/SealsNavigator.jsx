const SealsNavigator = () => (
  <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg min-h-[340px] flex flex-col justify-center">
    <div className="text-xl font-bold mb-6">Seals Navigator</div>
    <div className="flex flex-row items-center justify-between gap-12">
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
              x1="90"
              y1="80"
              x2="120"
              y2="40"
              stroke="black"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="90" cy="80" r="15" fill="black" />
          </svg>
        </div>
        <span className="text-3xl font-bold text-center">63%</span>
        <span className="text-sm text-gray-400 leading-4 mt-2 text-center">Sales percentage</span>
      </div>
      {/* Store breakdown spaced to right */}
      <div className="flex flex-col items-start gap-6 ml-10 text-base text-gray-700">
        <span>Online Store <span className="font-bold">60%</span></span>
        <span>Offline Store <span className="font-bold">40%</span></span>
      </div>
    </div>
  </div>
);

export default SealsNavigator;
