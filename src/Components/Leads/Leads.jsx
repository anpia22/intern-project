import React, { useState } from "react";
import LeadCard from "../CardSection/LeadCard";
import LeadHeader from "../Header/LeadHeader";
import LeadCardsList from "./LeadCardsList";

const leadData = [
  {
    id: 1,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "In Process",

  },
  {
    id: 2,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "In Process",
  },
  {
    id: 3,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "New",
  },
  {
    id: 4,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open",
  },
  {
    id: 5,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "New",
  },
  {
    id: 6,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open",
  },
  {
    id: 7,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open",
  },
  {
    id: 8,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open",
  },
  {
    id: 9,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "In Progress",
  },
  {
    id: 10,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open Deal",
  },
  {
    id: 11,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open Deal",
  },
  {
    id: 12,
    name: "Andrew Peterson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "andrew.peterson@gmail.com",
    status: "Open Deal",
  },
];

const statusColumns = [
  {
    name: "New",
    color: "bg-orange-500",
    // badge: "bg-indigo-100 text-[#535176]",
    count: 5,
    badge: "bg-yellow-200 text-oklch(87.9% 0.169 91.605)",
  },
  {
    name: "Open",
    color: "bg-blue-700",
    // badge: "bg-indigo-100 text-[#535176]",
    count: 5,
    badge: "bg-green-400 text-white",
  },
  {
    name: "In Progress",
    color: "bg-green-600",
    // badge: "bg-indigo-100 text-[#535176]",
    count: 5,
    badge: "bg-blue-400 text-white",
  },
  {
    name: "Open Deal",
    color: "bg-purple-600",
    // badge: "bg-indigo-100 text-[#535176]",
    count: 5,
    badge: "bg-purple-400 text-white",
  },
];

const Leads = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto py-6 px-2">
      {/* Header section: 4 evenly spaced boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-start">
        {statusColumns.map((status) => (
          <LeadHeader key={status.name} status={status} />
        ))}
      </div>
      <hr className="mb-4" />
      {/* Leads lists: 4 columns, cards only */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-start">
        {statusColumns.map((status) => (
          <div key={status.name}>
            <LeadCardsList
              statusName={status.name}
              badgeClass={status}
              leadData={leadData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Leads;