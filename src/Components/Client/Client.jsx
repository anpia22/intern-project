import {
  faAngleDown,
  faCircleCheck,
  faDownLeftAndUpRightToCenter,
  faDownload,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Default client data (fallback)
const defaultClient = {
  name: "Andrew Peterson",
  phone: "9924156245",
  email: "andrew.peterson@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  project: {
    address: "1247 Maple Street San Diego, CA 92101",
    plan: "Rs 2850/month",
    companyAddress: "415408",
    city: "Pune",
    companyName: "DTG",
    totalLeads: "1,256",
  },
};

const nextSteps = [
  {
    label: "Site Visit Scheduled",
    description: "Nov 15, 2025 at 2:00 PM",
    highlight: true,
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
        <path d="M16 2v4M8 2v4" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Follow up on proposal",
    description: "Due: Nov 13, 2025",
    highlight: false,
    icon: (
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M17 21V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v14h18z"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Send financing options",
    description: "Due: Nov 14, 2025",
    highlight: false,
    icon: (
      <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 text-gray-500" />
    ),
  },
];

const ClientPage = ({ clientData, onBack }) => {
  // Use provided client data or fallback to default
  const client = clientData || defaultClient;
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  const clientCardRef = useRef(null);

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

  const getFileName = () => {
    return `client_${client.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}`;
  };

  const getExportData = () => {
    return {
      headers: [
        "Name",
        "Phone",
        "Email",
        "Address",
        "Subscription Plan",
        "Company Name",
        "Company Address",
        "City",
        "Total Leads",
        "Status",
      ],
      data: [
        [
          client.name,
          client.phone,
          client.email,
          client.project.address,
          client.project.plan,
          client.project.companyName,
          client.project.companyAddress,
          client.project.city,
          client.project.totalLeads,
          "In Process",
        ],
      ],
    };
  };

  const handleExportCSV = () => {
    const { headers, data } = getExportData();

    // Convert to CSV format
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Create blob and download
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
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    const { headers, data } = getExportData();

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

    // Set column widths
    const colWidths = headers.map(() => ({ wch: 20 }));
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Client Data");

    // Generate Excel file and download
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
    setShowExportMenu(false);
  };

  const handleExportPDF = async () => {
    if (!clientCardRef.current) return;

    try {
      // Create canvas from the client card
      const canvas = await html2canvas(clientCardRef.current, {
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
      const imgY = 10;

      // Add title
      pdf.setFontSize(18);
      pdf.text("Client Information", pdfWidth / 2, 15, { align: "center" });

      // Add image
      pdf.addImage(imgData, "PNG", imgX, imgY + 10, imgWidth * ratio, imgHeight * ratio);

      // Add additional data as text
      const { headers, data } = getExportData();
      let yPos = imgY + imgHeight * ratio + 20;

      pdf.setFontSize(12);
      headers.forEach((header, index) => {
        if (yPos > pdfHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }
        pdf.setFontSize(10);
        pdf.text(`${header}:`, 20, yPos);
        pdf.text(String(data[0][index]), 80, yPos);
        yPos += 8;
      });

      // Save PDF
      pdf.save(`${getFileName()}.pdf`);
      setShowExportMenu(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
      setShowExportMenu(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="text-xl sm:text-2xl font-semibold">Clients</div>
        <div className="flex flex-row gap-2 sm:gap-3 items-center">
          <div>
            <button className="bg-blue-300 text-slate-900 rounded-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-sm sm:text-base" />
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

      {/* Client Info Card */}
      <div ref={clientCardRef} className="bg-white shadow rounded-2xl mb-6 sm:mb-8 p-3 sm:p-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-500 flex items-center gap-1 mb-3 sm:mb-4 text-sm sm:text-base hover:text-gray-700 transition-colors"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              className="mr-2"
            >
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Back to Clients</span>
          </button>
        )}
        
        {/* Top Card */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap items-start sm:items-center p-2 gap-3 sm:gap-4">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base sm:text-lg mb-1">{client.name}</div>
            <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row sm:gap-3 sm:items-center gap-1">
              <span className="flex items-center gap-1 truncate">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="truncate">{client.phone}</span>
              </span>
              <span className="flex items-center gap-1 truncate">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{client.email}</span>
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0 sm:ml-auto">
            <span className="bg-blue-100 text-blue-700 px-3 py-2 sm:px-5 sm:py-2 rounded-md font-semibold text-xs sm:text-sm text-center sm:text-left">
              In Process
            </span>
            <button className="bg-gray-900 text-white px-3 py-2 sm:px-5 sm:py-2 rounded font-semibold text-xs sm:text-sm w-full sm:w-auto">
              Edit Lead
            </button>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Project Overview Card */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:col-span-2">
          <div className="font-semibold mb-4 text-base sm:text-lg">Project Overview</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-3 sm:gap-y-2 text-gray-700 text-xs sm:text-sm">
              <div>
                <div className="text-gray-500 mb-1">Address</div>
                <div className="break-words">{client.project.address}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Subscription Plan</div>
                <div>{client.project.plan}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Company Address</div>
                <div>{client.project.companyAddress}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Company Name</div>
                <div>{client.project.companyName}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">City</div>
                <div>{client.project.city}</div>
              </div>
            </div>
            {/* Total Leads Card */}
            <div className="bg-blue-50 rounded-xl w-full sm:w-52 h-28 sm:h-32 flex flex-col justify-center items-center mx-auto sm:mx-0 sm:float-right">
              <div className="text-gray-500 font-semibold text-xs sm:text-sm mb-1">
                Total Leads
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold">
                {client.project.totalLeads}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-2xl shadow px-3 sm:px-4 py-3 sm:py-4">
          <div className="font-semibold mb-4 text-base sm:text-lg">Next Steps</div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {nextSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex gap-2 sm:gap-3 items-start rounded-xl px-2 sm:px-3 py-2 sm:py-3 ${
                  step.highlight ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {step.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-xs sm:text-sm">{step.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
