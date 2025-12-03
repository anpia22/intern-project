import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faDownload,
  faAngleDown,
  faCircleCheck,
  faEllipsisVertical,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Initial mock data for clients - this will be replaced with API data
const initialMockClients = [
  {
    id: 1,
    name: "Sarah Martinez",
    email: "sarah.martinez@email.com",
    phone: "9924156245",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    subscriptionPlan: "Basic Plan",
    planType: "Monthly",
    systemDetails: { capacity: "4.8 kW", panels: "12 panels" },
    status: "Active",
    price: "₹9,999 /mo.",
    nextBilling: "Nov 25, 2025",
    started: "Oct 25, 2024",
    address: "1247 Maple Street San Diego, CA 92101",
    companyAddress: "415408",
    city: "Pune",
    companyName: "DTG",
    totalLeads: "1,256",
  },
  {
    id: 2,
    name: "Andrew Peterson",
    email: "andrew.peterson@gmail.com",
    phone: "9924156246",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    subscriptionPlan: "Growth Plan",
    planType: "Monthly",
    systemDetails: { capacity: "6.2 kW", panels: "16 panels" },
    status: "Active",
    price: "₹11,999 /mo.",
    nextBilling: "Dec 15, 2025",
    started: "Nov 15, 2024",
    address: "456 Oak Avenue Los Angeles, CA 90001",
    companyAddress: "415409",
    city: "Mumbai",
    companyName: "ABC Corp",
    totalLeads: "2,450",
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily.johnson@email.com",
    phone: "9924156247",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    subscriptionPlan: "Free Starter Tier",
    planType: "Monthly",
    systemDetails: { capacity: "4.8 kW", panels: "12 panels" },
    status: "Pending",
    price: "₹0 /mo.",
    nextBilling: "Dec 1, 2025",
    started: "Nov 1, 2024",
    address: "789 Pine Road Seattle, WA 98101",
    companyAddress: "415410",
    city: "Delhi",
    companyName: "XYZ Ltd",
    totalLeads: "890",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "9924156248",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    subscriptionPlan: "Verified Leads Plan",
    planType: "Monthly",
    systemDetails: { capacity: "5.5 kW", panels: "14 panels" },
    status: "Cancelled",
    price: "₹15,999 /mo.",
    nextBilling: "N/A",
    started: "Sep 10, 2024",
    address: "321 Elm Street Chicago, IL 60601",
    companyAddress: "415411",
    city: "Bangalore",
    companyName: "Tech Solutions",
    totalLeads: "567",
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "jessica.williams@email.com",
    phone: "9924156249",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    subscriptionPlan: "Growth Plan",
    planType: "Yearly",
    systemDetails: { capacity: "7.5 kW", panels: "20 panels" },
    status: "Active",
    price: "₹143,988 /yr.",
    nextBilling: "Jan 10, 2026",
    started: "Jan 10, 2025",
    address: "123 Main Street New York, NY 10001",
    companyAddress: "415412",
    city: "Chennai",
    companyName: "Solar Energy Inc",
    totalLeads: "3,200",
  },
  {
    id: 6,
    name: "Robert Davis",
    email: "robert.davis@email.com",
    phone: "9924156250",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    subscriptionPlan: "Enterprise Plan",
    planType: "Monthly",
    systemDetails: { capacity: "10.0 kW", panels: "28 panels" },
    status: "Active",
    price: "Custom Pricing",
    nextBilling: "Dec 20, 2025",
    started: "Dec 20, 2024",
    address: "789 Business Park San Francisco, CA 94102",
    companyAddress: "415413",
    city: "Hyderabad",
    companyName: "Enterprise Solutions",
    totalLeads: "5,000",
  },
];

// Subscription plans data from SubscriptionPlans.jsx
const subscriptionPlans = [
  { name: "Free Starter Tier", price: "₹0", monthlyPrice: "₹0" },
  { name: "Basic Plan", price: "₹9,999 /100 Leads", monthlyPrice: "₹9,999" },
  { name: "Growth Plan", price: "₹11,999 /150 Leads", monthlyPrice: "₹11,999" },
  { name: "Verified Leads Plan", price: "₹15,999 /100 Leads", monthlyPrice: "₹15,999" },
  { name: "Enterprise Plan", price: "Custom Pricing /lead", monthlyPrice: "Custom" },
];

const ClientsList = ({ onClientClick }) => {
  const [clients, setClients] = useState(initialMockClients);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const exportMenuRef = useRef(null);
  const itemsPerPage = 10;

  // Get default price for Basic Plan
  const getDefaultPrice = () => {
    const defaultPlan = subscriptionPlans.find((plan) => plan.name === "Basic Plan");
    return defaultPlan ? `${defaultPlan.monthlyPrice} /mo.` : "";
  };

  const [formData, setFormData] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    subscriptionPlan: "Basic Plan",
    planType: "Monthly",
    systemCapacity: "",
    systemPanels: "",
    status: "Active",
    price: (() => {
      const defaultPlan = subscriptionPlans.find((plan) => plan.name === "Basic Plan");
      return defaultPlan ? `${defaultPlan.monthlyPrice} /mo.` : "";
    })(),
    nextBilling: "",
    address: "",
    companyAddress: "",
    city: "",
    companyName: "",
    totalLeads: "0",
  }));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter clients based on status
  const filteredClients =
    statusFilter === "All"
      ? clients
      : clients.filter((client) => client.status === statusFilter);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleClientClick = (client) => {
    if (onClientClick) {
      onClientClick(client);
    }
  };

  const handleExportCSV = () => {
    // Export functionality - can be implemented later
    console.log("Export CSV");
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    // Export functionality - can be implemented later
    console.log("Export Excel");
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    // Export functionality - can be implemented later
    console.log("Export PDF");
    setShowExportMenu(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
        setAvatarPreview(reader.result);
      };
      
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => {
        const updated = {
          ...prev,
          [name]: value,
        };
        
        // Auto-update price when subscription plan changes
        if (name === "subscriptionPlan") {
          const selectedPlan = subscriptionPlans.find((plan) => plan.name === value);
          if (selectedPlan) {
            updated.price = selectedPlan.monthlyPrice === "Custom" 
              ? "Custom Pricing" 
              : `${selectedPlan.monthlyPrice}${prev.planType === "Monthly" ? " /mo." : " /yr."}`;
          }
        }
        
        // Update price format when plan type changes
        if (name === "planType") {
          const selectedPlan = subscriptionPlans.find((plan) => plan.name === prev.subscriptionPlan);
          if (selectedPlan && selectedPlan.monthlyPrice !== "Custom") {
            const monthlyPrice = selectedPlan.monthlyPrice.replace(/[₹,]/g, "");
            const priceNum = parseInt(monthlyPrice);
            if (!isNaN(priceNum)) {
              updated.price = value === "Monthly" 
                ? `₹${priceNum.toLocaleString("en-IN")} /mo.`
                : `₹${(priceNum * 12).toLocaleString("en-IN")} /yr.`;
            }
          }
        }
        
        return updated;
      });
    }
  };

  const handleAddClient = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (Name, Email, and Phone)");
      return;
    }

    // Use provided avatar or generate a random one
    let avatar = formData.avatar;
    if (!avatar) {
      const avatarId = Math.floor(Math.random() * 100);
      const gender = Math.random() > 0.5 ? "women" : "men";
      avatar = `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`;
    }

    // Format next billing date
    let nextBillingDate = formData.nextBilling;
    if (nextBillingDate) {
      const date = new Date(nextBillingDate);
      nextBillingDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else {
      nextBillingDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Create new client object
    const newClient = {
      id: clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: avatar,
      subscriptionPlan: formData.subscriptionPlan,
      planType: formData.planType,
      systemDetails: {
        capacity: formData.systemCapacity || "4.8 kW",
        panels: formData.systemPanels || "12 panels",
      },
      status: formData.status,
      price: formData.price || "₹0 /mo.",
      nextBilling: nextBillingDate,
      started: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      address: formData.address || "N/A",
      companyAddress: formData.companyAddress || "N/A",
      city: formData.city || "N/A",
      companyName: formData.companyName || "N/A",
      totalLeads: formData.totalLeads || "0",
    };

    // Add new client to the list (at the beginning)
    setClients((prevClients) => [newClient, ...prevClients]);

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      avatar: "",
      subscriptionPlan: "Basic Plan",
      planType: "Monthly",
      systemCapacity: "",
      systemPanels: "",
      status: "Active",
      price: "",
      nextBilling: "",
      address: "",
      companyAddress: "",
      city: "",
      companyName: "",
      totalLeads: "0",
    });
    setAvatarPreview(null);
    setShowAddClientModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="text-xl sm:text-2xl font-semibold">Clients</div>
        <div className="flex flex-row gap-2 sm:gap-3 items-center">
          <button
            onClick={() => {
              // Initialize price when opening modal
              const defaultPlan = subscriptionPlans.find((plan) => plan.name === "Basic Plan");
              if (defaultPlan) {
                setFormData((prev) => ({
                  ...prev,
                  price: `${defaultPlan.monthlyPrice} /mo.`,
                }));
              }
              setShowAddClientModal(true);
            }}
            className="bg-[#3887ee] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl flex flex-row gap-2 sm:gap-3 items-center text-sm sm:text-base hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm sm:text-base" />
            <span className="hidden sm:inline">Add New Client</span>
          </button>
          <div>
            <button className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faFilter} className="text-sm sm:text-base" />
              <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
            </button>
          </div>
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-[#3887ee] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl flex flex-row gap-2 sm:gap-3 items-center text-sm sm:text-base hover:bg-blue-700 transition-colors"
            >
              <span className="hidden sm:inline">Export</span>
              <FontAwesomeIcon icon={faDownload} className="text-sm sm:text-base" />
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`text-xs transition-transform ${showExportMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
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
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {["All", "Active", "Pending", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-[#3887ee] text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Subscription Plan
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  System Details
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Next Billing
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Started
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleClientClick(client)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {client.subscriptionPlan}
                      </div>
                      <div className="text-sm text-gray-500">{client.planType}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {client.systemDetails.capacity}
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.systemDetails.panels}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusStyles[client.status] || statusStyles.Active}`}
                    >
                      {client.status === "Active" && (
                        <FontAwesomeIcon icon={faCircleCheck} className="text-xs" />
                      )}
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium">
                    {client.price}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{client.nextBilling}</td>
                  <td className="px-4 py-4 text-gray-700">{client.started}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle row actions
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {paginatedClients.map((client) => (
            <div
              key={client.id}
              onClick={() => handleClientClick(client)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 mb-1">{client.name}</div>
                  <div className="text-sm text-gray-500 truncate">{client.email}</div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusStyles[client.status] || statusStyles.Active}`}
                >
                  {client.status === "Active" && (
                    <FontAwesomeIcon icon={faCircleCheck} className="text-xs" />
                  )}
                  {client.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Subscription Plan</div>
                  <div className="font-medium">{client.subscriptionPlan}</div>
                  <div className="text-xs text-gray-500">{client.planType}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">System Details</div>
                  <div className="font-medium">{client.systemDetails.capacity}</div>
                  <div className="text-xs text-gray-500">{client.systemDetails.panels}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Price</div>
                  <div className="font-medium">{client.price}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Next Billing</div>
                  <div className="font-medium">{client.nextBilling}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Started</div>
                  <div className="font-medium">{client.started}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? "bg-[#3887ee] text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Add New Client Modal */}
      {showAddClientModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50 transition-opacity duration-200"
          onClick={() => setShowAddClientModal(false)}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4 transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in the details to add a new client
                </p>
              </div>
              <button
                onClick={() => setShowAddClientModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddClient} className="flex-1 p-6 space-y-4 overflow-y-auto">
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
                  placeholder="Enter client name"
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="space-y-3">
                  {/* Avatar Preview */}
                  {avatarPreview && (
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarPreview(null);
                          setFormData((prev) => ({ ...prev, avatar: "" }));
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="avatarFile"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* URL Input */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Or Enter Image URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                      onBlur={(e) => {
                        if (e.target.value) {
                          setAvatarPreview(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Plan
                </label>
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.name} value={plan.name}>
                      {plan.name} - {plan.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Type
                </label>
                <select
                  name="planType"
                  value={formData.planType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* System Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Capacity
                </label>
                <input
                  type="text"
                  name="systemCapacity"
                  value={formData.systemCapacity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 4.8 kW"
                />
              </div>

              {/* System Panels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Panels
                </label>
                <input
                  type="text"
                  name="systemPanels"
                  value={formData.systemPanels}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 12 panels"
                />
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
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Price (Auto-populated, but editable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Auto-populated from plan"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  Price is automatically set based on selected plan
                </p>
              </div>

              {/* Next Billing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Billing Date
                </label>
                <input
                  type="date"
                  name="nextBilling"
                  value={formData.nextBilling}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              {/* Company Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company address"
                />
              </div>

              {/* Total Leads */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Leads
                </label>
                <input
                  type="text"
                  name="totalLeads"
                  value={formData.totalLeads}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total leads"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-blue-50 pb-2">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsList;

