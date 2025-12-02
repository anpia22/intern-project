"use client";
import React, { useState } from "react";

export default function OtpCard({
  selectedMethod = "success",
  paymentData = {},
  onClose,
  onPaymentComplete,
}) {
  const [otp, setOtp] = useState("");

  const handlePayment = () => {
    if (otp.length < 4) {
      alert("Please enter a valid OTP");
      return;
    }

    // Determine payment status based on selectedMethod
    // For demo: if OTP is "1234" or "0000", treat as success, otherwise check selectedMethod
    let paymentStatus = "failed";
    if (otp === "1234" || otp === "0000" || selectedMethod === "success") {
      paymentStatus = "success";
    } else if (selectedMethod === "failed") {
      paymentStatus = "failed";
    }

    // Call the callback with payment status
    if (onPaymentComplete) {
      onPaymentComplete(paymentStatus);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
      <p className="text-sm font-medium mb-4">Enter OTP</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full h-10 bg-gray-200 rounded-md px-3 mb-6 outline-none"
        placeholder="Enter OTP"
        maxLength={6}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex-1 h-10 bg-gray-200 text-black rounded-md font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handlePayment}
          className="flex-1 h-10 bg-blue-500 text-white rounded-md font-medium"
        >
          Payment
        </button>
      </div>
    </div>
  );
}
