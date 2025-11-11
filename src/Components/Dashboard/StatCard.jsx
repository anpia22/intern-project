const StatCard = ({ title, value, percent, delta }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col space-y-2 min-w-0">
    <span className="text-lg font-semibold">{title}</span>
    <span className="text-2xl font-bold">{value.toLocaleString()}</span>
    <span className="text-green-500 font-semibold text-sm flex items-center">↑ {percent}%</span>
    <span className="text-gray-500 text-xs">+{delta} today</span>
    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl mt-2 flex justify-between items-center">
      View Report <span className="ml-2">&rarr;</span>
    </button>
  </div>
);

export default StatCard;
