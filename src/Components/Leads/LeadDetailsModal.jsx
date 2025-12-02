import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const statusStyles = {
  New: "bg-green-100 text-green-700",
  "In Process": "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  Open: "bg-blue-100 text-blue-700",
  "Open Deal": "bg-purple-100 text-purple-700",
  "In Process Pink": "bg-pink-100 text-pink-700",
};

const LeadDetailsModal = ({ isOpen, onClose, lead }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen || !lead) return null;

  // Generate lead history entries based on the selected lead
  // In a real app, this would come from an API
  const generateLeadHistory = (baseLead) => {
    const historyEntries = [
      {
        name: baseLead.name,
        date: baseLead.time,
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: baseLead.status,
      },
      {
        name: baseLead.name,
        date: "Yesterday 5:30PM",
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: baseLead.status === "New" ? "New" : "In Process",
      },
      {
        name: baseLead.name,
        date: "2 days ago",
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: "New",
      },
      {
        name: baseLead.name,
        date: "Last Week",
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: "Active",
      },
      {
        name: baseLead.name,
        date: "2 weeks ago",
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: "In Process",
      },
      {
        name: baseLead.name,
        date: "3 weeks ago",
        person: baseLead.name,
        number: baseLead.phone,
        email: baseLead.email,
        city: "Boulder, Colorado",
        pin: "80302",
        bill: "$115.50",
        status: "In Process Pink",
      },
    ];

    // Filter by search term if provided
    if (searchTerm) {
      return historyEntries.filter(
        (entry) =>
          entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.number.includes(searchTerm)
      );
    }

    return historyEntries;
  };

  const leadHistory = generateLeadHistory(lead);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Lead History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Modal Body - RelatedLeads Structure */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Leads</h2>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded bg-gray-200"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded">
                Export
              </button>
              <button className="bg-gray-200 px-2 py-2 rounded">
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <circle cx="8" cy="8" r="7" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadHistory.map((historyLead, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl p-6 flex flex-col space-y-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    <svg width="24" height="24" fill="currentColor">
                      <circle cx="12" cy="8" r="4" />
                      <rect x="8" y="14" width="8" height="6" rx="2" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{historyLead.name}</span>
                    <span className="text-xs text-gray-500">{historyLead.date}</span>
                  </div>
                </div>
                <hr />
                <div className="text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Name:</span> {historyLead.person}
                  </div>
                  <div>
                    <span className="font-semibold">Number:</span> {historyLead.number}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {historyLead.email}
                  </div>
                  <div>
                    <span className="font-semibold">City:</span> {historyLead.city}
                  </div>
                  <div>
                    <span className="font-semibold">Pin Code:</span> {historyLead.pin}
                  </div>
                  <div>
                    <span className="font-semibold">Monthly Electrical Bill:</span>{" "}
                    {historyLead.bill}
                  </div>
                </div>
                <div
                  className={`mt-4 px-4 py-2 rounded-full font-semibold text-center w-fit ${
                    statusStyles[historyLead.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {historyLead.status.replace("Pink", "")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;

