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
import StatsCardsGrid from "../Shared/StatsCardsGrid";
import CityDonutChart from "./CityDonutChart";
import MonthlyBarChart from "./MonthlyBarChart";
import background from "../../Images/bground2.png";

const Revenue = () => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  const revenueContentRef = useRef(null);

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
    return `revenue_${new Date().toISOString().split("T")[0]}`;
  };

  const handleExportCSV = () => {
    const csvContent = "Metric,Value\nTotal Revenue,12832\nTotal Leads,12832\nTotal Visitors,12832\nNet Profit,12832";
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
    const ws = XLSX.utils.aoa_to_sheet([["Metric", "Value"], ["Total Revenue", 12832], ["Total Leads", 12832], ["Total Visitors", 12832], ["Net Profit", 12832]]);
    ws["!cols"] = [{ wch: 20 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws, "Revenue");
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
    setShowExportMenu(false);
  };

  const handleExportPDF = async () => {
    if (!revenueContentRef.current) return;
    try {
      const canvas = await html2canvas(revenueContentRef.current, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      pdf.setFontSize(18);
      pdf.text("Revenue Report", pdfWidth / 2, 15, { align: "center" });
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
    <div ref={revenueContentRef} className="w-full max-w-7xl mx-auto pb-6 px-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>

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

            {/* Date Button */}
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-gray-200 transition-colors">
              <span>Date</span>
              <FontAwesomeIcon icon={faCalendar} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Section - Donut Chart and Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* City Donut Chart - Full width on left */}
        <div className="rounded-2xl shadow-lg px-8 py-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
        >
          <CityDonutChart />
        </div>

        {/* Stats Cards Grid */}
        <div className="w-full">
          <StatsCardsGrid
            stats={[
              { title: "Total Revenue", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Total Leads", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Total Visitors", value: 12832, percent: 20.1, delta: 2123 },
              { title: "Net Profit", value: 12832, percent: 20.1, delta: 2123 },
            ]}
          />
        </div>
      </div>

      {/* Bottom Section - Monthly Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Revenue;

