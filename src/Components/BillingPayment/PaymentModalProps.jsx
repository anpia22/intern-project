"use client";
import { X } from "lucide-react";
import React from "react";

const PaymentModal = ({
  open,
  status,
  amount,
  date,
  method,
  methodType,
  methodDetails = {},
  transactionId,
  onClose,
  onViewReceipt,
}) => {
  if (!open) return null;

  const isSuccess = status === "success";

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] sm:w-[450px] p-6 rounded-2xl shadow-lg relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span
              className={`text-4xl ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {isSuccess ? "✔" : "✖"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={`text-center text-2xl font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Payment Successful" : "Payment Unsuccessful"}
        </h2>

        <p className="text-center text-gray-500 text-sm mt-1">
          {isSuccess
            ? "Thank you for payment. Your transaction was completed successfully"
            : "Sorry your payment was unsuccessful"}
        </p>

        <hr className="my-6" />

        {/* Payment Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid :</span>
            <span className="font-medium">{amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date Paid :</span>
            <span className="font-medium">{date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method :</span>
            <span className="font-medium">{method}</span>
          </div>

          {/* Method-specific details */}
          {renderMethodSpecificDetails()}

          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID :</span>
            <span className="font-medium">{transactionId}</span>
          </div>
        </div>

        <hr className="my-6" />

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          {isSuccess && onViewReceipt && (
            <button
              onClick={onViewReceipt}
              className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 w-full font-medium"
            >
              View Receipt
            </button>
          )}

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg w-full text-white font-medium ${
              isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isSuccess && onViewReceipt ? "Close" : "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
