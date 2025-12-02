"use client";
import React, { useState } from "react";
import PaymentDetailsForm from "./BillingPayment";
import PaymentModal from "./PaymentModalProps";
import PaymentReceiptModal from "./PaymentReceiptModal";

export default function Checkout() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    status: "",
    amount: "",
    date: "",
    method: "",
    transactionId: "",
  });

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
    // The PaymentDetailsForm component handles showing the receipt modal internally
    // This callback is for external handling if needed
    if (data.status === "success") {
      setReceiptModalOpen(true);
    } else {
      setPaymentModalOpen(true);
    }
  };

  return (
    <>
      <PaymentDetailsForm onSuccess={handlePaymentSuccess} />

      {/* Fallback modals if needed (PaymentDetailsForm handles its own modals) */}
      <PaymentModal
        open={paymentModalOpen}
        status={paymentData.status}
        amount={paymentData.amount}
        date={paymentData.date}
        method={paymentData.method}
        transactionId={paymentData.transactionId}
        onClose={() => setPaymentModalOpen(false)}
      />

      <PaymentReceiptModal
        open={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        amount={paymentData.amount}
        date={paymentData.date}
        method={paymentData.method}
        transactionId={paymentData.transactionId}
      />
    </>
  );
}
