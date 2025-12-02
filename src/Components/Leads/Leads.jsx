import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faDownload,
  faCalendar,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import LeadCard from "../CardSection/LeadCard";
import LeadHeader from "../Header/LeadHeader";
import LeadCardsList from "./LeadCardsList";
import LeadDetailsModal from "./LeadDetailsModal";

const leadData = [
  {
    id: 1,
    name: "Sarah Johnson",
    time: "Today 10:30PM",
    phone: "9924156245",
    email: "sarah.johnson@gmail.com",
    status: "New",
  },
  {
    id: 2,
    name: "Michael Chen",
    time: "Today 9:15PM",
    phone: "9876543210",
    email: "michael.chen@gmail.com",
    status: "New",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    time: "Today 8:45PM",
    phone: "9765432109",
    email: "emily.rodriguez@gmail.com",
    status: "New",
  },
  {
    id: 4,
    name: "David Williams",
    time: "Today 7:20PM",
    phone: "9654321098",
    email: "david.williams@gmail.com",
    status: "New",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    time: "Today 6:10PM",
    phone: "9543210987",
    email: "jessica.martinez@gmail.com",
    status: "New",
  },
  {
    id: 6,
    name: "Andrew Peterson",
    time: "Today 5:30PM",
    phone: "9432109876",
    email: "andrew.peterson@gmail.com",
    status: "Open",
  },
  {
    id: 7,
    name: "Olivia Brown",
    time: "Today 4:45PM",
    phone: "9321098765",
    email: "olivia.brown@gmail.com",
    status: "Open",
  },
  {
    id: 8,
    name: "James Taylor",
    time: "Today 3:20PM",
    phone: "9210987654",
    email: "james.taylor@gmail.com",
    status: "Open",
  },
  {
    id: 9,
    name: "Sophia Anderson",
    time: "Today 2:15PM",
    phone: "9109876543",
    email: "sophia.anderson@gmail.com",
    status: "Open",
  },
  {
    id: 10,
    name: "Robert Lee",
    time: "Today 1:00PM",
    phone: "9098765432",
    email: "robert.lee@gmail.com",
    status: "Open",
  },
  {
    id: 11,
    name: "Isabella Garcia",
    time: "Yesterday 11:30PM",
    phone: "8987654321",
    email: "isabella.garcia@gmail.com",
    status: "In Progress",
  },
  {
    id: 12,
    name: "William Moore",
    time: "Yesterday 10:15PM",
    phone: "8876543210",
    email: "william.moore@gmail.com",
    status: "In Progress",
  },
  {
    id: 13,
    name: "Ava Jackson",
    time: "Yesterday 9:00PM",
    phone: "8765432109",
    email: "ava.jackson@gmail.com",
    status: "In Progress",
  },
  {
    id: 14,
    name: "Christopher White",
    time: "Yesterday 8:30PM",
    phone: "8654321098",
    email: "christopher.white@gmail.com",
    status: "In Progress",
  },
  {
    id: 15,
    name: "Mia Harris",
    time: "Yesterday 7:45PM",
    phone: "8543210987",
    email: "mia.harris@gmail.com",
    status: "In Progress",
  },
  {
    id: 16,
    name: "Daniel Thompson",
    time: "Yesterday 6:20PM",
    phone: "8432109876",
    email: "daniel.thompson@gmail.com",
    status: "Open Deal",
  },
  {
    id: 17,
    name: "Charlotte Lewis",
    time: "Yesterday 5:10PM",
    phone: "8321098765",
    email: "charlotte.lewis@gmail.com",
    status: "Open Deal",
  },
  {
    id: 18,
    name: "Matthew Walker",
    time: "Yesterday 4:00PM",
    phone: "8210987654",
    email: "matthew.walker@gmail.com",
    status: "Open Deal",
  },
  {
    id: 19,
    name: "Amelia Hall",
    time: "Yesterday 3:30PM",
    phone: "8109876543",
    email: "amelia.hall@gmail.com",
    status: "Open Deal",
  },
  {
    id: 20,
    name: "Joseph Allen",
    time: "Yesterday 2:15PM",
    phone: "8098765432",
    email: "joseph.allen@gmail.com",
    status: "Open Deal",
  },
];

const statusColumns = [
  {
    name: "New",
    color: "bg-orange-500",
    badge: "bg-yellow-200 text-oklch(87.9% 0.169 91.605)",
  },
  {
    name: "Open",
    color: "bg-blue-700",
    badge: "bg-green-400 text-white",
  },
  {
    name: "In Progress",
    color: "bg-green-600",
    badge: "bg-blue-400 text-white",
  },
  {
    name: "Open Deal",
    color: "bg-purple-600",
    badge: "bg-purple-400 text-white",
  },
];

const Leads = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate actual counts for each status
  const statusColumnsWithCounts = statusColumns.map((status) => {
    const count = leadData.filter((lead) => lead.status === status.name).length;
    return {
      ...status,
      count,
    };
  });

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto py-6 px-2">
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button className="bg-blue-300 rounded-lg px-4 py-3 text-slate-900 hover:bg-blue-400 transition-colors">
              <FontAwesomeIcon icon={faFilter} />
            </button>

            {/* Export Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium">
              <span>Export</span>
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>

            {/* Date Button */}
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-gray-200 transition-colors">
              <span>Date</span>
              <FontAwesomeIcon icon={faCalendar} size="sm" />
            </button>
          </div>
        </div>

        {/* Status Headers: 4 evenly spaced boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-start mb-6">
          {statusColumnsWithCounts.map((status) => (
            <LeadHeader key={status.name} status={status} />
          ))}
        </div>

        {/* Leads lists: 4 columns, cards only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-start">
          {statusColumnsWithCounts.map((status) => (
            <div key={status.name}>
              <LeadCardsList
                statusName={status.name}
                badgeClass={status}
                leadData={leadData}
                onLeadClick={handleLeadClick}
              />
            </div>
          ))}
        </div>
      </div>

    {/* Lead Details Modal */}
    <LeadDetailsModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      lead={selectedLead}
    />
    </>
  );
};
export default Leads;