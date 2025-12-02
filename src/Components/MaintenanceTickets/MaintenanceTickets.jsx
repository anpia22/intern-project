"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  faFilter,
  faDownload,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tickets from "./Tickets";
import Maintenance from "./Maintenance";

const MaintenanceTickets = () => {
  const [activeView, setActiveView] = useState("Ticket"); // "Ticket" or "Maintenance"
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [statusSectionExpanded, setStatusSectionExpanded] = useState(true);
  const [prioritySectionExpanded, setPrioritySectionExpanded] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    Scheduled: false,
    "In Progress": false,
    Completed: false,
    Overdue: false,
  });
  const [priorityFilters, setPriorityFilters] = useState({
    High: false,
    Medium: false,
    Low: false,
  });
  const dropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);
  const ticketsRef = useRef(null);
  const maintenanceRef = useRef(null);
  const [ticketCounter, setTicketCounter] = useState(7); // Starting counter for new tickets

  // Sample ticket data - converted to state
  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "High",
      status: "Open",
    },
    {
      id: "TKT-002",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "Open",
      status: "In Progress",
    },
    {
      id: "TKT-003",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "High",
      status: "High",
    },
    {
      id: "TKT-004",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "High",
      status: "High",
    },
    {
      id: "TKT-005",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "High",
      status: "High",
    },
    {
      id: "TKT-006",
      subject: "Login issue with new update",
      customer: "Ajit Patil",
      priority: "High",
      status: "High",
    },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle status filter checkbox change
  const handleStatusFilterChange = (status) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Handle priority filter checkbox change
  const handlePriorityFilterChange = (priority) => {
    setPriorityFilters((prev) => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  };

  // Functions to open modals from parent component
  const handleCreateTicket = () => {
    if (ticketsRef.current) {
      ticketsRef.current.openModal();
    }
  };

  const handleScheduleMaintenance = () => {
    if (maintenanceRef.current) {
      maintenanceRef.current.openModal();
    }
  };

  // Export functions
  const handleExportPDF = () => {
    setShowExportDropdown(false);
    // Create a simple PDF export
    const data = activeView === "Ticket" 
      ? tickets.map(t => `${t.id} | ${t.subject} | ${t.customer} | ${t.priority} | ${t.status}`).join('\n')
      : "Maintenance data export (PDF)";
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeView === "Ticket" ? "tickets" : "maintenance"}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    setShowExportDropdown(false);
    // Create CSV format for Excel
    const headers = activeView === "Ticket" 
      ? "Ticket ID,Subject,Customer,Priority,Status"
      : "Maintenance Export";
    
    const rows = activeView === "Ticket"
      ? tickets.map(t => `${t.id},${t.subject},${t.customer},${t.priority},${t.status}`).join('\n')
      : "Maintenance data";
    
    const csvContent = headers + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeView === "Ticket" ? "tickets" : "maintenance"}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4 relative">
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeView === "Ticket" ? "Tickets" : "Maintenance"}
          </h1>

          <div className="flex items-center gap-3">
            {/* Create New Ticket / Schedule Maintenance Button */}
            {activeView === "Ticket" ? (
              <button
                onClick={handleCreateTicket}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
              >
                + Create New Ticket
              </button>
            ) : (
              <button
                onClick={handleScheduleMaintenance}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
              >
                + Schedule Maintenance
              </button>
            )}

            {/* Filter Icon with Dropdown */}
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`rounded-lg px-4 py-3 transition-colors ${
                  showFilterDropdown
                    ? "bg-blue-300 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faFilter} />
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  {/* Status Section */}
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setStatusSectionExpanded(!statusSectionExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Status</span>
                      <FontAwesomeIcon
                        icon={statusSectionExpanded ? faChevronUp : faChevronDown}
                        className="text-xs text-gray-600"
                      />
                    </button>
                    {statusSectionExpanded && (
                      <div className="px-4 pb-3 space-y-2">
                        {Object.keys(statusFilters).map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={statusFilters[status]}
                              onChange={() => handleStatusFilterChange(status)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{status}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority Section */}
                  <div>
                    <button
                      onClick={() => setPrioritySectionExpanded(!prioritySectionExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Priority</span>
                      <FontAwesomeIcon
                        icon={prioritySectionExpanded ? faChevronUp : faChevronDown}
                        className="text-xs text-gray-600"
                      />
                    </button>
                    {prioritySectionExpanded && (
                      <div className="px-4 pb-3 space-y-2">
                        {Object.keys(priorityFilters).map((priority) => (
                          <label
                            key={priority}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={priorityFilters[priority]}
                              onChange={() => handlePriorityFilterChange(priority)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{priority}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Export Button with Dropdown */}
            <div className="relative" ref={exportDropdownRef}>
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className={`bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium ${
                  showExportDropdown ? "bg-blue-700" : ""
                }`}
              >
                <span>Export</span>
                <FontAwesomeIcon icon={faDownload} />
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg text-gray-700 text-sm"
                  >
                    Pdf
                  </button>
                  <hr className="border-gray-200" />
                  <button
                    onClick={handleExportExcel}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-gray-700 text-sm"
                  >
                    Excel
                  </button>
                </div>
              )}
            </div>

            {/* View Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-colors font-medium"
              >
                <span>{activeView}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => {
                      setActiveView("Ticket");
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg ${
                      activeView === "Ticket" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    Ticket
                  </button>
                  <button
                    onClick={() => {
                      setActiveView("Maintenance");
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg ${
                      activeView === "Maintenance" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    Maintenance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render appropriate component based on active view */}
        {activeView === "Ticket" ? (
          <Tickets
            ref={ticketsRef}
            tickets={tickets}
            setTickets={setTickets}
            ticketCounter={ticketCounter}
            setTicketCounter={setTicketCounter}
          />
        ) : (
          <Maintenance ref={maintenanceRef} />
        )}
      </div>
    </div>
  );
};

export default MaintenanceTickets;

