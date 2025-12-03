"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  faFilter,
  faDownload,
  faCalendar,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import OverallLeadsChart from "./OverallLeadsChart";
import NewLeadsChart from "./NewLeadsChart";
import RecentActivityTable from "../Shared/RecentActivityTable";
import LeadsPerWeek from "./LeadsPerWeek";

const ReportsAnalytic = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  const reportsContentRef = useRef(null);

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
    return `reports_analytics_${new Date().toISOString().split("T")[0]}`;
  };

  const handleExportCSV = () => {
    const csvContent = "Report Type,Date,Status\nReports & Analytics," + new Date().toISOString().split("T")[0] + ",Generated";
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
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["Report Type", "Date", "Status"], ["Reports & Analytics", new Date().toISOString().split("T")[0], "Generated"]]);
    ws["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
    setShowExportMenu(false);
  };

  const handleExportPDF = async () => {
    if (!reportsContentRef.current) return;
    try {
      const canvas = await html2canvas(reportsContentRef.current, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      pdf.setFontSize(18);
      pdf.text("Reports & Analytics", pdfWidth / 2, 15, { align: "center" });
      pdf.addImage(imgData, "PNG", imgX, 25, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${getFileName()}.pdf`);
      setShowExportMenu(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
      setShowExportMenu(false);
    }
  };

  return (
    <div ref={reportsContentRef} className="w-full max-w-7xl mx-auto pb-6 px-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytic
          </h1>

          <div className="flex items-center gap-3">
            {/* Filter Icon */}
            <button className="bg-blue-300 rounded-lg px-4 py-3 text-slate-900 hover:bg-blue-400 transition-colors">
              <FontAwesomeIcon icon={faFilter} />
            </button>

            {/* Export Button with Dropdown */}
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="bg-[#3887ee] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <span>Export</span>
                <FontAwesomeIcon icon={faDownload} />
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

            {/* Date Input */}
            <div className="relative">
              <input
                type="date"
                className="bg-gray-100 rounded-lg px-4 py-2 pr-10 text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{/* Overall Leads Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">
          <OverallLeadsChart />
        </div>

        {/* New Leads Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
          <NewLeadsChart />
        </div></div>
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Leads History Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">
            <RecentActivityTable title="Recent Leads History" />
          </div>

          {/* Leads Per Week Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
            <LeadsPerWeek />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytic;
