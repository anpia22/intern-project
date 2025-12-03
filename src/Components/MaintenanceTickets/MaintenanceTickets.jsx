"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  faFilter,
  faDownload,
  faChevronDown,
  faChevronUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  const getFileName = () => {
    return `${activeView === "Ticket" ? "tickets" : "maintenance"}_${new Date().toISOString().split('T')[0]}`;
  };

  const getExportData = () => {
    if (activeView === "Ticket") {
      return {
        headers: ["Ticket ID", "Subject", "Customer", "Priority", "Status"],
        data: tickets.map(t => [t.id, t.subject, t.customer, t.priority, t.status]),
      };
    }
    return {
      headers: ["Maintenance Data"],
      data: [["Maintenance export data"]],
    };
  };

  const handleExportCSV = () => {
    setShowExportDropdown(false);
    const { headers, data } = getExportData();
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${getFileName()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    setShowExportDropdown(false);
    const { headers, data } = getExportData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const colWidths = headers.map(() => ({ wch: 20 }));
    ws["!cols"] = colWidths;
    XLSX.utils.book_append_sheet(wb, ws, activeView === "Ticket" ? "Tickets" : "Maintenance");
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
  };

  const handleExportPDF = async () => {
    setShowExportDropdown(false);
    try {
      const contentElement = document.querySelector('.bg-white.rounded-2xl.shadow-lg.p-6');
      if (!contentElement) {
        alert("Error: Could not find content to export.");
        return;
      }

      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      pdf.setFontSize(18);
      pdf.text(`${activeView === "Ticket" ? "Tickets" : "Maintenance"} Report`, pdfWidth / 2, 15, { align: "center" });

      pdf.addImage(imgData, "PNG", imgX, 25, imgWidth * ratio, imgHeight * ratio);

      const { headers, data } = getExportData();
      let yPos = 25 + imgHeight * ratio + 10;

      pdf.setFontSize(10);
      data.forEach((row, index) => {
        if (yPos > pdfHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }
        row.forEach((cell, cellIndex) => {
          pdf.text(`${headers[cellIndex]}: ${cell}`, 20, yPos);
          yPos += 5;
        });
        yPos += 3;
      });

      pdf.save(`${getFileName()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-6 px-4 relative">
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
                className="bg-[#3887ee] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
              >
                + Create New Ticket
              </button>
            ) : (
              <button
                onClick={handleScheduleMaintenance}
                className="bg-[#3887ee] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
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
                    ? "bg-[#3887ee] text-white"
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
                              className="w-4 h-4 text-[#3887ee] border-gray-300 rounded focus:ring-blue-500"
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
                              className="w-4 h-4 text-[#3887ee] border-gray-300 rounded focus:ring-blue-500"
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
                className={`bg-[#3887ee] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium ${
                  showExportDropdown ? "bg-blue-700" : ""
                }`}
              >
                <span>Export</span>
                <FontAwesomeIcon icon={faDownload} />
                <FontAwesomeIcon 
                  icon={faAngleDown} 
                  className={`text-xs transition-transform ${showExportDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <span>📄 CSV</span>
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 border-t border-gray-200"
                  >
                    <span>📊 Excel</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 border-t border-gray-200"
                  >
                    <span>📑 PDF</span>
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
                      activeView === "Ticket" ? "bg-blue-50 text-[#3887ee]" : "text-gray-700"
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
                    activeView === "Maintenance" ? "bg-blue-50 text-[#3887ee]" : "text-gray-700"
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

