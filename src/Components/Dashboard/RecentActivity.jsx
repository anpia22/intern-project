const activityData = [
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVh_a2DacQBzMLqCbFDZlztPMItzefHeWXNTOK0AJYonA1TSPydH6kYRHNDWB00JAauw&usqp=CAU",
    name: "Joseph Arimathea",
    email: "joseph.arimathea@gmail.com",
    status: "Member",
    id: "#74568320",
    time: "5 min ago",
    amount: "$10,000"
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7EOjUsjbqO2FZBUqfyJvKaIVMpgQNYHtPQ&s",
    name: "Joseph Arimathea",
    email: "joseph.arimathea@gmail.com",
    status: "Signed Up",
    id: "#7858510",
    time: "10 min ago",
    amount: "$5000"
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqMOmqF3CHR7lPy8KqD9cjzZsm6Ell1hOOCQ&s",
    name: "Joseph Arimathea",
    email: "joseph.arimathea@gmail.com",
    status: "Signed Up",
    id: "#7858510",
    time: "10 min ago",
    amount: "$5000"
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGo3NzEGe8brVPWQldRx19s0F7MH7m-d2g5Q&s",
    name: "Joseph Arimathea",
    email: "Joseph.arimathea@gmail.com",
    status: "Signed Up",
    id: "#7858510",
    time: "10 min ago",
    amount: "$5000",
  },
];

const statusStyles = {
  "Member": "bg-yellow-200 text-yellow-800",
  "Signed Up": "bg-green-200 text-green-800"
};

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow p-4 w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-2 justify-between">
      <span className="text-base font-semibold">Recent Activity</span>
      <button className="bg-blue-100 p-1 rounded-md">
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <circle cx="8" cy="8" r="6" strokeWidth="1.5" />
          <path d="M5 8h6" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] text-gray-500 font-medium text-xs border-b pb-1 mb-2">
      <div>Customer</div>
      <div>Status</div>
      <div>ID</div>
      <div>Retained</div>
      <div>Amount</div>
    </div>
    <div className="divide-y text-xs">
      {activityData.map((item, idx) => (
        <div key={idx} className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] items-center py-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src={item.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
            <div>
              <div className="truncate">{item.name}</div>
              <div className="text-[10px] text-gray-400 truncate">{item.email}</div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded text-[11px] font-medium ${statusStyles[item.status]}`}>{item.status}</span>
          <span className="truncate">{item.id}</span>
          <span className="truncate">{item.time}</span>
          <span className="font-semibold">{item.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;
