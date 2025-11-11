const chartData = [30000, 12000, 16000, 18000, 10000];

const RevenueChart = () => (
  <div className="bg-white rounded-3xl shadow-xl p-8 min-w-[350px]">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-semibold">Revenue</span>
      <span className="text-green-500 font-bold">+10%</span>
    </div>
    <div className="flex-grow flex gap-2 items-end py-6 h-52">
      {chartData.map((val, idx) => (
        <div
          key={idx}
          className={`bg-blue-400 w-10 rounded-t-lg ${idx === 0 ? "bg-blue-600" : ""}`}
          style={{ height: `${(val / 30000) * 100}%` }}
          title={`$${val.toLocaleString()}`}
        />
      ))}
    </div>
    <div className="flex justify-between text-xs mt-2 text-gray-500">
      <span>Jan</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Apr</span>
    </div>
  </div>
);
export default RevenueChart;
