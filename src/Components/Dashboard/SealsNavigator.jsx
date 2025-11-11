const SealsNavigator = () => (
  <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md mx-auto flex flex-col items-center min-h-[300px]">
    <div className="text-xl font-bold w-full mb-4">Seals Navigator</div>
    <div className="relative flex flex-col items-center mb-1">
      <svg width="170" height="90" viewBox="0 0 170 90">
        <defs>
          <linearGradient id="gauge-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="90%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path
          d="M20,80 A65,65 0 0,1 150,80"
          stroke="url(#gauge-gradient)"
          strokeWidth="14"
          fill="none"
        />
        <line
          x1="85"
          y1="80"
          x2="113"
          y2="44"
          stroke="black"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="85" cy="80" r="13" fill="black" />
      </svg>
    </div>
    <div className="text-3xl font-bold mt-2">63%</div>
    <div className="text-gray-400 text-base mb-2">Sales percentage</div>
    <div className="flex justify-between w-full mt-4 text-gray-700 text-base">
      <span>Online Store <span className="font-bold">60%</span></span>
      <span>Offline Store <span className="font-bold">40%</span></span>
    </div>
  </div>
);

export default SealsNavigator;
