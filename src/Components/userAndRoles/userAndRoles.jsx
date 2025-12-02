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
} from "@fortawesome/free-solid-svg-icons";

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

  // Handle role filter checkbox change
  const handleRoleFilterChange = (role) => {
    setRoleFilters((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  // Handle status filter checkbox change
  const handleStatusFilterChange = (status) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Get filtered users
  const getFilteredUsers = () => {
    let filtered = users;

    const activeRoleFilters = Object.keys(roleFilters).filter(
      (role) => roleFilters[role]
    );
    const activeStatusFilters = Object.keys(statusFilters).filter(
      (status) => statusFilters[status]
    );

    if (activeRoleFilters.length > 0) {
      filtered = filtered.filter((user) => activeRoleFilters.includes(user.role));
    }

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
  const handleExportPDF = () => {
    setShowExportDropdown(false);
    const data = users
      .map(
        (u) =>
          `${u.name} | ${u.email} | ${u.role} | ${u.status}`
      )
      .join("\n");

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    setShowExportDropdown(false);
    const headers = "Name,Email,Role,Status";
    const rows = users
      .map((u) => `${u.name},${u.email},${u.role},${u.status}`)
      .join("\n");

    const csvContent = headers + "\n" + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const paginatedUsers = getPaginatedUsers();
  const filteredUsers = getFilteredUsers();
  const filteredTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4">
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
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
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
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  {/* Role Section */}
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setRoleSectionExpanded(!roleSectionExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Role</span>
                      <FontAwesomeIcon
                        icon={roleSectionExpanded ? faChevronUp : faChevronDown}
                        className="text-xs text-gray-600"
                      />
                    </button>
                    {roleSectionExpanded && (
                      <div className="px-4 pb-3 space-y-2">
                        {Object.keys(roleFilters).map((role) => (
                          <label
                            key={role}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={roleFilters[role]}
                              onChange={() => handleRoleFilterChange(role)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{role}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status Section */}
                  <div>
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
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-gray-900">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{user.role}</td>
                  <td className="py-4 px-6">
                    <span
                      className={
                        user.status === "Active"
                          ? "text-green-600 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
          >
            ‹
          </button>
          {/* Show first few pages */}
          {[1, 2, 3, 4].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              disabled={pageNum > filteredTotalPages}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(filteredTotalPages, prev + 1))
            }
            disabled={currentPage === filteredTotalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
          >
            ›
          </button>
        </div>
      </div>

      {/* Add New User Modal */}
      {showNewUserModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50"
          onClick={() => setShowNewUserModal(false)}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4"
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
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50"
          onClick={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4"
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
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
