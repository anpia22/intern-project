"use client";
import { X, Download, ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PaymentReceiptModal({
  open,
  onClose,
  amount,
  date,
  method,
  methodType,
  methodDetails = {},
  transactionId,
  planTitle = "Pro Plan Subscription (Monthly)",
  planPrice = 1500,
}) {
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const exportDropdownRef = useRef(null);
  const receiptContentRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    if (showExportDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showExportDropdown]);

  const getFileName = () => {
    return `Payment_Receipt_${transactionId}_${new Date().toISOString().split('T')[0]}`;
  };

  const getExportData = () => {
    const headers = ["Field", "Value"];
    const data = [
      ["Subscription Plan", `Rs ${planPrice}/- Monthly`],
      ["Transaction ID", transactionId],
      ["Payment Date", date],
      ["Payment Method", method],
    ];

    if (methodType === "credit") {
      data.push(
        ["Card Number", methodDetails.cardNumber || "****5242"],
        ["Card Holder", methodDetails.cardHolder || "Card Holder"]
      );
    } else if (methodType === "bank") {
      data.push(
        ["Account Number", methodDetails.accountNo || "****1234"],
        ["Bank Name", methodDetails.bankName || "Bank Name"],
        ["Account Holder", methodDetails.accountHolder || "Account Holder"]
      );
    } else if (methodType === "check") {
      data.push(
        ["Check Number", methodDetails.checkNumber || "CHK-123456"],
        ["Bank Name", methodDetails.bankName || "Bank Name"],
        ["Check Date", methodDetails.checkDate || date]
      );
    } else if (methodType === "cash") {
      data.push(["Reference Number", methodDetails.referenceNumber || "REF-XXXX"]);
    }

    data.push(["Status", "Paid"]);
    data.push([]);
    data.push(["Item Details", ""]);
    data.push(["Description", planTitle]);
    data.push(["Quantity", "1"]);
    data.push(["Price", `Rs ${planPrice}/-`]);
    data.push(["Total", `Rs ${planPrice}/-`]);

    return { headers, data };
  };

  const handleDownloadCSV = () => {
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

  const handleDownloadExcel = () => {
    setShowExportDropdown(false);
    const { headers, data } = getExportData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const colWidths = headers.map(() => ({ wch: 25 }));
    ws["!cols"] = colWidths;
    XLSX.utils.book_append_sheet(wb, ws, "Payment Receipt");
    XLSX.writeFile(wb, `${getFileName()}.xlsx`);
  };

  const handleDownloadPDF = async () => {
    setShowExportDropdown(false);
    if (!receiptContentRef.current) return;

    try {
      const canvas = await html2canvas(receiptContentRef.current, {
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

      pdf.setFontSize(18);
      pdf.text("Payment Receipt", pdfWidth / 2, 15, { align: "center" });

      pdf.addImage(imgData, "PNG", imgX, imgY + 10, imgWidth * ratio, imgHeight * ratio);

      const { headers, data } = getExportData();
      let yPos = imgY + imgHeight * ratio + 20;

      pdf.setFontSize(10);
      data.forEach((row, index) => {
        if (yPos > pdfHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }
        if (row.length === 2 && row[0] && row[1]) {
          pdf.text(`${row[0]}: ${row[1]}`, 20, yPos);
          yPos += 8;
        } else if (row.length === 1 && row[0]) {
          pdf.setFontSize(12);
          pdf.text(row[0], 20, yPos);
          pdf.setFontSize(10);
          yPos += 10;
        } else {
          yPos += 5;
        }
      });

      pdf.save(`${getFileName()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (!open) return null;

  const renderMethodSpecificDetails = () => {
    if (!methodDetails || Object.keys(methodDetails).length === 0) return null;

    switch (methodType) {
      case "credit":
        return (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Card Number :</span>
              <span className="font-medium">{methodDetails.cardNumber || "****5242"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Card Holder :</span>
              <span className="font-medium">{methodDetails.cardHolder || "Card Holder"}</span>
            </div>
          </>
        );
      case "bank":
        return (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Number :</span>
              <span className="font-medium">{methodDetails.accountNo || "****1234"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank Name :</span>
              <span className="font-medium">{methodDetails.bankName || "Bank Name"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Holder :</span>
              <span className="font-medium">{methodDetails.accountHolder || "Account Holder"}</span>
            </div>
          </>
        );
      case "check":
        return (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Check Number :</span>
              <span className="font-medium">{methodDetails.checkNumber || "CHK-123456"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank Name :</span>
              <span className="font-medium">{methodDetails.bankName || "Bank Name"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check Date :</span>
              <span className="font-medium">{methodDetails.checkDate || date}</span>
            </div>
          </>
        );
      case "cash":
        return (
          <div className="flex justify-between">
            <span className="text-gray-600">Reference Number :</span>
            <span className="font-medium">{methodDetails.referenceNumber || "REF-XXXX"}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative">
        
        {/* border top */}
        <div className="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-[#0F6EFF]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <div ref={receiptContentRef} className="px-7 py-10">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-4xl text-blue-600">✔</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold">
            Thank you for your payment
          </h2>

          <p className="text-center text-gray-500 text-sm mt-1 mb-6">
            Here is a summary of your recent payment
          </p>

          {/* Payment Summary */}
          <h3 className="text-md font-semibold mb-2">Payment Summary :</h3>

          <div className="text-sm space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subscription Plan :</span>
              <span className="font-medium">Rs {planPrice}/- Monthly</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID :</span>
              <span className="font-medium">{transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date :</span>
              <span className="font-medium">{date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method :</span>
              <span className="font-medium">{method}</span>
            </div>

            {/* Method-specific details */}
            {renderMethodSpecificDetails()}

            <div className="flex justify-between">
              <span className="text-gray-600">Status :</span>
              <span className="font-medium text-green-600">● Paid</span>
            </div>
          </div>

          {/* Item Details */}
          <h3 className="text-md font-semibold mb-3">Item Details</h3>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">DESCRIPTION</th>
                  <th className="py-3 px-4">QUANTITY</th>
                  <th className="py-3 px-4 text-right">PRICE</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="py-3 px-4">{planTitle}</td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4 text-right">Rs {planPrice}/-</td>
                </tr>

                <tr className="bg-gray-100 font-semibold">
                  <td className="py-3 px-4">Total</td>
                  <td></td>
                  <td className="py-3 px-4 text-right">
                    Rs {planPrice}/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Download Button with Dropdown */}
          <div className="relative mt-6" ref={exportDropdownRef}>
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              Download
              <ChevronDown 
                size={16} 
                className={`transition-transform ${showExportDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showExportDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                <button
                  onClick={handleDownloadCSV}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 text-sm transition-colors flex items-center gap-2"
                >
                  <span>📄 CSV</span>
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 text-sm transition-colors flex items-center gap-2 border-t border-gray-200"
                >
                  <span>📊 Excel</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 text-sm transition-colors flex items-center gap-2 border-t border-gray-200"
                >
                  <span>📑 PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
