"use client";
import React, { useState } from "react";
import OtpCard from "./Otpbox";
import PaymentModal from "./PaymentModalProps";
import PaymentReceiptModal from "./PaymentReceiptModal";

const paymentMethods = [
  { value: "credit", label: "Credit Card" },
  { value: "bank", label: "Bank Transfer" },
  { value: "check", label: "Check" },
  { value: "cash", label: "Cash" },
];

const PaymentDetailsForm = ({ onSuccess }) => {
  const [method, setMethod] = useState("bank");
  const [showOtp, setShowOtp] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("success");
  const [currentPaymentData, setCurrentPaymentData] = useState(null);
  const [formData, setFormData] = useState({
    couponCode: "",
    amount: "",
    date: "",
    // Bank Transfer fields
    accountHolderName: "",
    bankName: "",
    accountNo: "",
    ifscCode: "",
    // Credit Card fields
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    // Check fields
    checkNumber: "",
    checkDate: "",
  });

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const formatDate = (dateString) => {
    if (!dateString) return formattedDate;
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const generateTransactionId = () => {
    return "ch_" + Math.random().toString(36).substring(2, 15);
  };

  const handlePaymentClick = () => {
    // Validate required fields
    if (!formData.amount) {
      alert("Please enter payment amount");
      return;
    }
    setShowOtp(true);
  };

  const getMethodSpecificDetails = () => {
    switch (method) {
      case "credit":
        return {
          cardNumber: formData.cardNumber ? `****${formData.cardNumber.slice(-4)}` : "****5242",
          cardHolder: formData.cardHolderName || "Card Holder",
        };
      case "bank":
        return {
          accountNo: formData.accountNo ? `****${formData.accountNo.slice(-4)}` : "****1234",
          bankName: formData.bankName || "Bank Name",
          accountHolder: formData.accountHolderName || "Account Holder",
        };
      case "check":
        return {
          checkNumber: formData.checkNumber || "CHK-123456",
          bankName: formData.bankName || "Bank Name",
          checkDate: formData.checkDate ? formatDate(formData.checkDate) : formatDate(formattedDate),
        };
      case "cash":
        return {
          referenceNumber: `REF-${generateTransactionId().slice(-8).toUpperCase()}`,
        };
      default:
        return {};
    }
  };

  const formatPaymentMethodDisplay = () => {
    const methodLabel = paymentMethods.find(m => m.value === method)?.label || "Bank Transfer";
    const details = getMethodSpecificDetails();
    
    switch (method) {
      case "credit":
        return `${methodLabel} ${details.cardNumber}`;
      case "bank":
        return `${methodLabel} - ${details.accountNo}`;
      case "check":
        return `${methodLabel} #${details.checkNumber}`;
      case "cash":
        return `${methodLabel} - ${details.referenceNumber}`;
      default:
        return methodLabel;
    }
  };

  const handleOtpComplete = (status) => {
    setShowOtp(false);
    setPaymentStatus(status);
    
    const paymentData = {
      status: status,
      amount: formData.amount ? `Rs ${formData.amount}/-` : "Rs 1500/-",
      date: formatDate(formData.date || formattedDate),
      method: formatPaymentMethodDisplay(),
      methodType: method,
      methodDetails: getMethodSpecificDetails(),
      transactionId: generateTransactionId(),
    };

    setCurrentPaymentData(paymentData);
    setShowPaymentModal(true);
    
    if (onSuccess) {
      onSuccess(paymentData);
    }
  };

  const handleViewReceipt = () => {
    setShowPaymentModal(false);
    setShowReceiptModal(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-6">
      <div className="relative">
      {/* OTP MODAL */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <OtpCard
            selectedMethod={paymentStatus}
            paymentData={{
              amount: formData.amount || "1500",
              date: formData.date || formattedDate,
              method: paymentMethods.find(m => m.value === method)?.label || "Bank Transfer",
            }}
            onClose={() => setShowOtp(false)}
            onPaymentComplete={handleOtpComplete}
          />
        </div>
      )}

      {/* PAYMENT STATUS MODAL (always shown first) */}
      {currentPaymentData && (
        <PaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onViewReceipt={paymentStatus === "success" ? handleViewReceipt : null}
          status={paymentStatus}
          amount={currentPaymentData.amount}
          date={currentPaymentData.date}
          method={currentPaymentData.method}
          methodType={currentPaymentData.methodType}
          methodDetails={currentPaymentData.methodDetails}
          transactionId={currentPaymentData.transactionId}
        />
      )}

      {/* PAYMENT RECEIPT MODAL (shown after viewing receipt from success modal) */}
      {currentPaymentData && (
        <PaymentReceiptModal
          open={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          amount={currentPaymentData.amount}
          date={currentPaymentData.date}
          method={currentPaymentData.method}
          methodType={currentPaymentData.methodType}
          methodDetails={currentPaymentData.methodDetails}
          transactionId={currentPaymentData.transactionId}
          planPrice={formData.amount ? parseInt(formData.amount) : 1500}
        />
      )}

      {/* MAIN PAYMENT FORM */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="mb-4">
          <div className="text-2xl font-semibold mb-6">Payment Details</div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mt-6">
          {/* Row 1 */}
          <div className="col-span-2">
            <label className="text-sm text-gray-700">Enter Coupon Code</label>
            <input
              value={formData.couponCode}
              onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
              className="mt-1 w-3/6 block rounded-md bg-gray-100 h-10 pl-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Payment Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Payment Date</label>
            <input
              type="date"
              value={formData.date || formattedDate}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
            />
          </div>

          {/* Payment Method */}
          <div className="col-span-2">
            <label className="text-sm text-gray-700">Payment Method</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
              {paymentMethods.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setMethod(m.value)}
                  className={`rounded-md px-5 py-2 text-sm font-semibold ${
                    method === m.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic fields based on payment method */}
          {method === "bank" && (
            <>
              <div>
                <label className="text-sm text-gray-700">Account Holder Name</label>
                <input
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter account holder name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Select Bank Name</label>
                <input
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Account No</label>
                <input
                  type="number"
                  value={formData.accountNo}
                  onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">IFSC Code</label>
                <input
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter IFSC code"
                  maxLength={11}
                />
              </div>
            </>
          )}

          {method === "credit" && (
            <>
              <div className="col-span-2">
                <label className="text-sm text-gray-700">Card Number</label>
                <input
                  type="number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-gray-700">Card Holder Name</label>
                <input
                  value={formData.cardHolderName}
                  onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter card holder name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Expiry Date</label>
                <input
                  type="month"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">CVV</label>
                <input
                  type="number"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </>
          )}

          {method === "check" && (
            <>
              <div>
                <label className="text-sm text-gray-700">Check Number</label>
                <input
                  value={formData.checkNumber}
                  onChange={(e) => setFormData({ ...formData, checkNumber: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter check number"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Bank Name</label>
                <input
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Check Date</label>
                <input
                  type="date"
                  value={formData.checkDate}
                  onChange={(e) => setFormData({ ...formData, checkDate: e.target.value })}
                  className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3"
                />
              </div>
            </>
          )}

          {method === "cash" && (
            <div className="col-span-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Cash Payment:</strong> Please ensure you have the exact amount ready. 
                  A reference number will be generated upon payment confirmation.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="bg-gray-200 px-6 py-2 rounded text-gray-700 font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePaymentClick}
              className="bg-blue-500 text-white px-6 py-2 rounded font-semibold"
            >
              Payment
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
