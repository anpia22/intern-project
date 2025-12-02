"use client";
import { X, Download } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

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

  if (!open) return null;

  const handleDownloadPDF = () => {
    setShowExportDropdown(false);
    // Generate receipt content
    const receiptContent = `
PAYMENT RECEIPT
================

Thank you for your payment!

Payment Summary:
- Subscription Plan: Rs ${planPrice}/- Monthly
- Transaction ID: ${transactionId}
- Payment Date: ${date}
- Payment Method: ${method}
${methodType === "credit" ? `- Card Number: ${methodDetails.cardNumber || "****5242"}\n- Card Holder: ${methodDetails.cardHolder || "Card Holder"}` : ""}
${methodType === "bank" ? `- Account Number: ${methodDetails.accountNo || "****1234"}\n- Bank Name: ${methodDetails.bankName || "Bank Name"}\n- Account Holder: ${methodDetails.accountHolder || "Account Holder"}` : ""}
${methodType === "check" ? `- Check Number: ${methodDetails.checkNumber || "CHK-123456"}\n- Bank Name: ${methodDetails.bankName || "Bank Name"}\n- Check Date: ${methodDetails.checkDate || date}` : ""}
${methodType === "cash" ? `- Reference Number: ${methodDetails.referenceNumber || "REF-XXXX"}` : ""}
- Status: Paid

Item Details:
- ${planTitle}
- Quantity: 1
- Price: Rs ${planPrice}/-
- Total: Rs ${planPrice}/-

Generated on: ${new Date().toLocaleString()}
    `.trim();

    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payment_Receipt_${transactionId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcel = () => {
    setShowExportDropdown(false);
    // Generate CSV content for Excel
    const csvContent = `Payment Receipt\n\n` +
      `Subscription Plan,Rs ${planPrice}/- Monthly\n` +
      `Transaction ID,${transactionId}\n` +
      `Payment Date,${date}\n` +
      `Payment Method,${method}\n` +
      `${methodType === "credit" ? `Card Number,${methodDetails.cardNumber || "****5242"}\nCard Holder,${methodDetails.cardHolder || "Card Holder"}\n` : ""}` +
      `${methodType === "bank" ? `Account Number,${methodDetails.accountNo || "****1234"}\nBank Name,${methodDetails.bankName || "Bank Name"}\nAccount Holder,${methodDetails.accountHolder || "Account Holder"}\n` : ""}` +
      `${methodType === "check" ? `Check Number,${methodDetails.checkNumber || "CHK-123456"}\nBank Name,${methodDetails.bankName || "Bank Name"}\nCheck Date,${methodDetails.checkDate || date}\n` : ""}` +
      `${methodType === "cash" ? `Reference Number,${methodDetails.referenceNumber || "REF-XXXX"}\n` : ""}` +
      `Status,Paid\n\n` +
      `Item Details\n` +
      `Description,Quantity,Price\n` +
      `${planTitle},1,Rs ${planPrice}/-\n` +
      `Total,,Rs ${planPrice}/-`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Payment_Receipt_${transactionId}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

        <div className="px-7 py-10">
          
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
              className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700"
            >
              <Download size={18} />
              Download
            </button>
            {showExportDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg text-gray-700 text-sm"
                >
                  Pdf
                </button>
                <hr className="border-gray-200" />
                <button
                  onClick={handleDownloadExcel}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-gray-700 text-sm"
                >
                  Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
