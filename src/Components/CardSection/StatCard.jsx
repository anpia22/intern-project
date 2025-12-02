const StatCard = ({ title, value, percent, delta }) => (
  <div className="bg-white rounded-2xl shadow-xl min-w-0 flex flex-col h-full max-w-[280px]">
    <div className="p-4 pb-2 flex-1">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-600 font-medium">{title}</span>
        <span className="text-gray-400 text-lg cursor-pointer">•••</span>
      </div>
      <span className="text-3xl font-medium tracking-tight text-gray-900 block">{value.toLocaleString()}</span>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-green-600 font-semibold text-sm flex items-center">
          ↑ {percent}%
        </span>
        <span className="text-gray-500 text-sm">+{delta} today</span>
      </div>
    </div>
    <button className="bg-[#3887ee] hover:bg-[#3887ee]/80 text-white w-full py-3 rounded-b-2xl flex justify-between items-center px-4 text-sm font-semibold transition-colors mt-auto">
      View Report
      <span className="ml-2 text-base">&rarr;</span>
    </button>
  </div>
);

export default StatCard;

