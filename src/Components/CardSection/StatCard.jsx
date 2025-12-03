const StatCard = ({ title, value, percent, delta }) => (
  <div className="bg-white rounded-xl md:rounded-2xl shadow-xl min-w-0 flex flex-col h-full w-full md:max-w-[280px]">
    <div className="p-3 md:p-4 pb-2 flex-1">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs md:text-sm text-gray-600 font-medium">{title}</span>
        <span className="text-gray-400 text-base md:text-lg cursor-pointer">•••</span>
      </div>
      <span className="text-xl md:text-3xl font-medium tracking-tight text-gray-900 block">{value.toLocaleString()}</span>
      <div className="flex items-center gap-2 mt-3 md:mt-4">
        <span className="text-green-600 font-semibold text-xs md:text-sm flex items-center">
          ↑ {percent}%
        </span>
        <span className="text-gray-500 text-xs md:text-sm">+{delta} today</span>
      </div>
    </div>
    <button className="bg-[#3887ee] hover:bg-[#3887ee]/80 text-white w-full py-2 md:py-3 rounded-b-xl md:rounded-b-2xl flex justify-between items-center px-3 md:px-4 text-xs md:text-sm font-semibold transition-colors mt-auto">
      View Report
      <span className="ml-2 text-sm md:text-base">&rarr;</span>
    </button>
  </div>
);

export default StatCard;

