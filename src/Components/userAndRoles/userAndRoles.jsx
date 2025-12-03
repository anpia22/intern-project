"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faDownload,
  faChevronDown,
  faChevronUp,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function UserRoleManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Olivia Rhye",
      email: "olivia@example.com",
      role: "Administrator",
      status: "Active",
    },
    {
      id: 2,
      name: "Phoenix Baker",
      email: "phoenix@example.com",
      role: "Sales",
      status: "Active",
    },
    {
      id: 3,
      name: "Lana Steiner",
      email: "lana@example.com",
      role: "Technician",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Demi Wilkinson",
      email: "demi@example.com",
      role: "Sales",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Olivia Rhye",
      email: "olivia@example.com",
      role: "Administrator",
      status: "Active",
    },
    {
      id: 6,
      name: "Phoenix Baker",
      email: "phoenix@example.com",
      role: "Sales",
      status: "Active",
    },
    {
      id: 7,
      name: "Lana Steiner",
      email: "lana@example.com",
      role: "Technician",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Demi Wilkinson",
      email: "demi@example.com",
      role: "Sales",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Phoenix Baker",
      email: "phoenix@example.com",
      role: "Sales",
      status: "Active",
    },
    {
      id: 10,
      name: "Lana Steiner",
      email: "lana@example.com",
      role: "Technician",
      status: "Inactive",
    },
  ]);

  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [roleSectionExpanded, setRoleSectionExpanded] = useState(true);
  const [statusSectionExpanded, setStatusSectionExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const filterDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const [roleFilters, setRoleFilters] = useState({
    Administrator: false,
    Sales: false,
    Technician: false,
  });

  const [statusFilters, setStatusFilters] = useState({
    Active: false,
    Inactive: false,
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Reset to page 1 when filtered results change
  useEffect(() => {
    const activeRoleFilters = Object.keys(roleFilters).filter(
      (role) => roleFilters[role]
    );
    const activeStatusFilters = Object.keys(statusFilters).filter(
      (status) => statusFilters[status]
    );

    let filtered = [...users];
    if (activeRoleFilters.length > 0) {
      filtered = filtered.filter((user) => activeRoleFilters.includes(user.role));
    }
    if (activeStatusFilters.length > 0) {
      filtered = filtered.filter((user) => activeStatusFilters.includes(user.status));
    }

    const maxPages = Math.ceil(filtered.length / itemsPerPage);
    setCurrentPage((prevPage) => {
      if (prevPage > maxPages && maxPages > 0) {
        return 1;
      }
      return prevPage;
    });
  }, [roleFilters, statusFilters, users, itemsPerPage]);

  // Handle role filter checkbox change
  const handleRoleFilterChange = (role) => {
    setRoleFilters((prev) => {
      const updated = {
        ...prev,
        [role]: !prev[role],
      };
      // Reset to page 1 when filters change
      setCurrentPage(1);
      return updated;
    });
  };

  // Handle status filter checkbox change
  const handleStatusFilterChange = (status) => {
    setStatusFilters((prev) => {
      const updated = {
        ...prev,
        [status]: !prev[status],
      };
      // Reset to page 1 when filters change
      setCurrentPage(1);
      return updated;
    });
  };

  // Get filtered users
  const getFilteredUsers = () => {
    let filtered = [...users]; // Create a copy to avoid mutating original array

    const activeRoleFilters = Object.keys(roleFilters).filter(
      (role) => roleFilters[role]
    );
    const activeStatusFilters = Object.keys(statusFilters).filter(
      (status) => statusFilters[status]
    );

    // Apply role filters (OR logic - user matches any selected role)
    if (activeRoleFilters.length > 0) {
      filtered = filtered.filter((user) => activeRoleFilters.includes(user.role));
    }

    // Apply status filters (OR logic - user matches any selected status)
    if (activeStatusFilters.length > 0) {
      filtered = filtered.filter((user) => activeStatusFilters.includes(user.status));
    }

    return filtered;
  };

  // Get paginated users
  const getPaginatedUsers = () => {
    const filtered = getFilteredUsers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields (Name, Email, and Role)");
      return;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    };

    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setShowNewUserModal(false);
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields (Name, Email, and Role)");
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status,
            }
          : user
      )
    );

    setShowEditModal(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  // Export functions
  const getFileName = () => {
    return `users_roles_${new Date().toISOString().split("T")[0]}`;
  };

  const getExportData = () => {
    return {
      headers: ["Name", "Email", "Role", "Status"],
      data: users.map((u) => [u.name, u.email, u.role, u.status]),
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
    XLSX.utils.book_append_sheet(wb, ws, "Users & Roles");
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
  };

  const handleExportPDF = async () => {
    setShowExportDropdown(false);
    try {
      const tableElement = document.querySelector('.overflow-x-auto table');
      if (!tableElement) {
        alert("Error: Could not find table to export.");
        return;
      }

      const canvas = await html2canvas(tableElement, {
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
      pdf.text("Users & Roles Report", pdfWidth / 2, 15, { align: "center" });

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

  // Calculate filtered and paginated users
  const filteredUsers = getFilteredUsers();
  const filteredTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = getPaginatedUsers();
  
  // Check if any filters are active
  const hasActiveFilters = 
    Object.values(roleFilters).some(Boolean) || 
    Object.values(statusFilters).some(Boolean);
  
  // Clear all filters function
  const clearAllFilters = () => {
    setRoleFilters({
      Administrator: false,
      Sales: false,
      Technician: false,
    });
    setStatusFilters({
      Active: false,
      Inactive: false,
    });
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-6 px-4">
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User & Role Management</h1>

          <div className="flex items-center gap-3">
            {/* Add New User Button */}
            <button
              onClick={() => {
                setFormData({
                  name: "",
                  email: "",
                  role: "",
                  status: "Active",
                });
                setShowNewUserModal(true);
              }}
              className="bg-[#3887ee] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faPlus} size="sm" /> Add New User
            </button>

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
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 transform transition-all duration-200 ease-out">
                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <div className="border-b border-gray-200">
                      <button
                        onClick={clearAllFilters}
                        className="w-full text-left px-4 py-2 text-sm text-[#3887ee] hover:bg-blue-50 font-medium transition-colors duration-200"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                  
                  {/* Role Section */}
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setRoleSectionExpanded(!roleSectionExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">Role</span>
                      <div className="flex items-center gap-2">
                        {Object.values(roleFilters).some(Boolean) && (
                          <span className="w-2 h-2 bg-[#3887ee] rounded-full transition-all duration-200"></span>
                        )}
                        <FontAwesomeIcon
                          icon={roleSectionExpanded ? faChevronUp : faChevronDown}
                          className={`text-xs text-gray-600 transition-transform duration-200 ${roleSectionExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${roleSectionExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                      {roleSectionExpanded && (
                        <div className="px-4 pb-3 space-y-2">
                          {Object.keys(roleFilters).map((role) => (
                            <label
                              key={role}
                              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-200"
                            >
                              <input
                                type="checkbox"
                                checked={roleFilters[role]}
                                onChange={() => handleRoleFilterChange(role)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
                              />
                              <span className="text-sm text-gray-700">{role}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Section */}
                  <div>
                    <button
                      onClick={() => setStatusSectionExpanded(!statusSectionExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">Status</span>
                      <div className="flex items-center gap-2">
                        {Object.values(statusFilters).some(Boolean) && (
                          <span className="w-2 h-2 bg-[#3887ee] rounded-full transition-all duration-200"></span>
                        )}
                        <FontAwesomeIcon
                          icon={statusSectionExpanded ? faChevronUp : faChevronDown}
                          className={`text-xs text-gray-600 transition-transform duration-200 ${statusSectionExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${statusSectionExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                      {statusSectionExpanded && (
                        <div className="px-4 pb-3 space-y-2">
                          {Object.keys(statusFilters).map((status) => (
                            <label
                              key={status}
                              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors duration-200"
                            >
                              <input
                                type="checkbox"
                                checked={statusFilters[status]}
                                onChange={() => handleStatusFilterChange(status)}
                                className="w-4 h-4 text-[#3887ee] border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
                              />
                              <span className="text-sm text-gray-700">{status}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Filter Results Count */}
                  {hasActiveFilters && (
                    <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                      <p className="text-xs text-gray-600">
                        Showing {filteredUsers.length} of {users.length} users
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Export Button with Dropdown */}
            <div className="relative" ref={exportDropdownRef}>
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                style={{ 
                  backgroundColor: showExportDropdown ? '#2d6fd6' : '#3887ee',
                }}
                className="text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium hover:opacity-90"
              >
                <span>Export</span>
                <FontAwesomeIcon icon={faDownload} />
                <FontAwesomeIcon 
                  icon={faAngleDown} 
                  className={`text-xs transition-transform duration-200 ${showExportDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden transform transition-all duration-200 ease-out">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>📄 CSV</span>
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 border-t border-gray-200"
                  >
                    <span>📊 Excel</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 border-t border-gray-200"
                  >
                    <span>📑 PDF</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                  User
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                  Role
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm text-gray-900 transition-colors duration-200">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 transition-colors duration-200">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 transition-colors duration-200">{user.role}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`transition-colors duration-200 ${
                        user.status === "Active"
                          ? "text-green-600 font-medium"
                          : "text-red-500 font-medium"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-[#3887ee] hover:text-blue-800 transition-all duration-200 hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 transition-all duration-200 hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
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
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-all duration-200 hover:scale-110"
          >
            ‹
          </button>
          {/* Show first few pages */}
          {[1, 2, 3, 4].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              disabled={pageNum > filteredTotalPages}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-[#3887ee] text-white scale-110"
                  : "text-gray-600 hover:bg-gray-100 hover:scale-110"
              } ${pageNum > filteredTotalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {pageNum}
            </button>
          ))}
          {/* Ellipsis */}
          {filteredTotalPages > 4 && <span className="px-2 text-gray-600">…</span>}
          {/* Show last pages */}
          {filteredTotalPages > 4 &&
            [filteredTotalPages - 1, filteredTotalPages].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                  currentPage === pageNum
                    ? "bg-[#3887ee] text-white scale-110"
                    : "text-gray-600 hover:bg-gray-100 hover:scale-110"
                }`}
              >
                {pageNum}
              </button>
            ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(filteredTotalPages, prev + 1))
            }
            disabled={currentPage === filteredTotalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-all duration-200 hover:scale-110"
          >
            ›
          </button>
        </div>
      </div>

      {/* Add New User Modal */}
      {showNewUserModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50 transition-opacity duration-200"
          onClick={() => setShowNewUserModal(false)}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4 transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in the details to add a new user
                </p>
              </div>
              <button
                onClick={() => setShowNewUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddUser} className="flex-1 p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Sales">Sales</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50 transition-opacity duration-200"
          onClick={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4 transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update user information
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateUser} className="flex-1 p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Sales">Sales</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
