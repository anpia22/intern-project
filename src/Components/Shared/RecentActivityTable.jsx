"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const RecentActivityTable = ({ 
  title = "Recent Activity", 
  data = [],
  showFilter = true 
}) => {
  const statusStyles = {
    "Member": "bg-yellow-200 text-yellow-800",
    "Signed Up": "bg-green-200 text-green-800"
  };

  // Default data if none provided
  const defaultData = [
    {
      id: 1,
      name: "Joseph Arimathea",
      email: "Joseph.arimathea@gmail.com",
      status: "Member",
      customerId: "#74568320",
      retained: "5 min ago",
      plan: "$10,000",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVh_a2DacQBzMLqCbFDZlztPMItzefHeWXNTOK0AJYonA1TSPydH6kYRHNDWB00JAauw&usqp=CAU",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@gmail.com",
      status: "Signed Up",
      customerId: "#7568510",
      retained: "10 min ago",
      plan: "$5,000",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7EOjUsjbqO2FZBUqfyJvKaIVMpgQNYHtPQ&s",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@gmail.com",
      status: "Member",
      customerId: "#7568511",
      retained: "15 min ago",
      plan: "$8,000",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqMOmqF3CHR7lPy8KqD9cjzZsm6Ell1hOOCQ&s",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@gmail.com",
      status: "Signed Up",
      customerId: "#7568512",
      retained: "20 min ago",
      plan: "$12,000",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGo3NzEGe8brVPWQldRx19s0F7MH7m-d2g5Q&s",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@gmail.com",
      status: "Member",
      customerId: "#7568513",
      retained: "25 min ago",
      plan: "$7,500",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVh_a2DacQBzMLqCbFDZlztPMItzefHeWXNTOK0AJYonA1TSPydH6kYRHNDWB00JAauw&usqp=CAU",
    },
  ];

  const displayData = data.length > 0 ? data : defaultData;

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Header */}
        <div className="flex items-center mb-2 justify-between">
          <span className="text-sm font-semibold">{title}</span>
          {showFilter && (
            <button className="bg-blue-100 px-2 py-1 rounded-md">
              <FontAwesomeIcon icon={faFilter} className="text-xs" />
            </button>
          )}
        </div>

        {/* Mobile Data Rows - Stacked */}
        <div className="divide-y text-xs">
          {displayData.map((item) => (
            <div key={item.id || item.customerId} className="space-y-2 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400 truncate">{item.email}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[item.status] || statusStyles["Member"]}`}>
                  {item.status}
                </span>
                <span className="font-semibold text-xs">{item.plan || item.amount}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>ID: {item.customerId || item.id}</span>
                <span>{item.retained || item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="flex items-center mb-2 justify-between">
          <span className="text-base font-semibold">{title}</span>
          {showFilter && (
            <button className="bg-blue-100 px-2 py-1 rounded-md">
              <FontAwesomeIcon icon={faFilter} />
            </button>
          )}
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] text-gray-500 font-medium text-sm border-b pb-1 mb-2">
          <div>Customer</div>
          <div>Status</div>
          <div>Customer ID</div>
          <div>Retained</div>
          <div>Plan</div>
        </div>

        {/* Data Rows */}
        <div className="divide-y text-sm">
          {displayData.map((item) => (
            <div key={item.id || item.customerId} className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] items-center py-2">
              <div className="flex items-center gap-2 min-w-0">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-7 h-7 rounded-full object-cover" 
                />
                <div>
                  <div className="truncate">{item.name}</div>
                  <div className="text-xs text-gray-400 truncate">{item.email}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-sm font-medium w-fit ${statusStyles[item.status] || statusStyles["Member"]}`}>
                {item.status}
              </span>
              <span className="truncate">{item.customerId || item.id}</span>
              <span className="truncate">{item.retained || item.time}</span>
              <span className="font-semibold">{item.plan || item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTable;

