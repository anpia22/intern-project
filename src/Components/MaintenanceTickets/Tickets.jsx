"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

const Tickets = forwardRef(({ tickets, setTickets, ticketCounter, setTicketCounter }, ref) => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    subject: "",
    description: "",
    priority: "",
    assignee: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const priorityColors = {
    High: "bg-[#69A4F2] text-black/80",
    Open: "bg-[#F29269] text-black/80",
    Medium: "bg-[#FFC107] text-black/80",
    Low: "bg-[#6C757D] text-black/80",
  };

  const statusColors = {
    Open: "bg-[#F29269] text-black/80",
    "In Progress": "bg-[#00B27B] text-white",
    High: "bg-[#69A4F2] text-black/80",
    Closed: "bg-[#6C757D] text-black/80",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.customerName || !formData.subject || !formData.priority) {
      alert("Please fill in all required fields (Customer Name, Subject, and Priority)");
      return;
    }

    // Generate new ticket ID
    const newTicketId = `TKT-${String(ticketCounter).padStart(3, "0")}`;

    // Create new ticket object
    const newTicket = {
      id: newTicketId,
      subject: formData.subject,
      customer: formData.customerName,
      priority: formData.priority,
      status: "Open", // New tickets default to "Open" status
    };

    // Add new ticket to the list (at the beginning)
    setTickets((prevTickets) => [newTicket, ...prevTickets]);

    // Increment ticket counter
    setTicketCounter((prev) => prev + 1);

    // Reset form and close modal
    setShowNewTicketModal(false);
    setFormData({
      customerName: "",
      subject: "",
      description: "",
      priority: "",
      assignee: "",
    });
  };

  const totalPages = 10;

  // Expose modal opening function to parent
  useImperativeHandle(ref, () => ({
    openModal: () => setShowNewTicketModal(true),
  }));

  return (
    <>
      {/* Filter Options */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Status: All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Priority: All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Assigned To</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Date Range</option>
        </select>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Ticket ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Subject
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Priority
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-900">{ticket.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{ticket.subject}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{ticket.customer}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      priorityColors[ticket.priority] || priorityColors.Open
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      statusColors[ticket.status] || statusColors.Open
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
        >
          ‹
        </button>
        {/* Show first few pages */}
        {[1, 2, 3, 4].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}
        {/* Ellipsis */}
        {currentPage < 9 && <span className="px-2 text-gray-600">...</span>}
        {/* Show last pages */}
        {[9, 10].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
        >
          ›
        </button>
      </div>

      {/* New Ticket Modal Overlay */}
      {showNewTicketModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50"
          onClick={() => setShowNewTicketModal(false)}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Ticket</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in the details to create a new support ticket
                </p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ticket subject"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter ticket description"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter priority"
                />
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter assigned to"
                />
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="text-gray-400 text-2xl mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    Upload a file or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10 MB
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
});

Tickets.displayName = "Tickets";

export default Tickets;

