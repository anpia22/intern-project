const StatCard = ({ title, value, percent, delta }) => (
  <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col space-y-2 min-w-0">
    <span className="text-sm font-semibold">{title}</span>
    <span className="text-xl font-bold">{value.toLocaleString()}</span>
    <span className="text-green-500 font-semibold text-xs flex items-center">↑ {percent}%</span>
    <span className="text-gray-500 text-xs">+{delta} today</span>
    <button className="bg-blue-600 text-white px-4 py-1 rounded-xl mt-2 flex justify-between items-center text-xs">
      View Report <span className="ml-2 text-base">&rarr;</span>
    </button>
  </div>
);

export default StatCard;
