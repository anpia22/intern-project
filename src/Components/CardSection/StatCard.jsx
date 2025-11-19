const StatCard = ({ title, value, percent, delta }) => (
  <div className="bg-white rounded-2xl shadow-xl min-w-0 flex flex-col space-y-2">
    <div className="p-4 pb-2">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="text-gray-400 text-lg">•••</span>
      </div>
      <span className="text-3xl tracking-tight">{value.toLocaleString()}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-green-600 font-semibold text-sm flex items-center">
          ↑ {percent}%
        </span>
        <span className="text-gray-500 text-sm">+{delta} today</span>
      </div>
    </div>
    <button className="bg-blue-600 text-white w-full py-3 rounded-b-2xl flex justify-between items-center px-4 text-sm font-semibold">
      View Report
      <span className="ml-2 text-base">&rarr;</span>
    </button>
  </div>
);

export default StatCard;

