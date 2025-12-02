import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const BillingPlans = ({ setActivePage }) => {
  // Plan data mapping based on SubscriptionPlans.jsx
  const planData = {
    "Free Starter Tier": {
      price: "₹0",
      leads: 30,
      teamMembers: 2,
      storage: "10GB",
    },
    "Growth Plan": {
      price: "₹11,999",
      leads: 150,
      teamMembers: 10,
      storage: "50GB",
    },
    "Basic Plan": {
      price: "₹9,999",
      leads: 100,
      teamMembers: 5,
      storage: "30GB",
    },
    "Verified Leads Plan": {
      price: "₹15,999",
      leads: 100,
      teamMembers: 10,
      storage: "50GB",
    },
    "Enterprise Plan": {
      price: "Custom",
      leads: "Unlimited",
      teamMembers: "Unlimited",
      storage: "Unlimited",
    },
  };

  const [billingSettings, setBillingSettings] = useState({
    planName: "Growth Plan",
    price: planData["Growth Plan"].price,
    billingCycle: "Monthly",
    leads: planData["Growth Plan"].leads,
    teamMembers: planData["Growth Plan"].teamMembers,
    storage: planData["Growth Plan"].storage,
    paymentMethod: "Visa",
    cardNumber: "ending in 4242",
    expiryDate: "12/2025",
    isDefault: true,
    billingHistory: [
      {
        id: 1,
        description: "Nov 2025 - Growth Plan",
        date: "Nov 1, 2025",
        amount: "₹11,999.00",
      },
      {
        id: 2,
        description: "Oct 2025 - Growth Plan",
        date: "Oct 1, 2025",
        amount: "₹11,999.00",
      },
      {
        id: 3,
        description: "Sep 2025 - Growth Plan",
        date: "Sep 1, 2025",
        amount: "₹11,999.00",
      },
    ],
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpgradePlan = () => {
    if (setActivePage) {
      setActivePage("Subscription Plans");
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Handle invoice download logic here
    console.log("Downloading invoice:", invoiceId);
    alert("Invoice download started!");
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {billingSettings.planName}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {billingSettings.price === "Custom"
                  ? "Custom Pricing"
                  : `${billingSettings.price}/${billingSettings.billingCycle.toLowerCase()}`}{" "}
                • Billed monthly
              </p>
            </div>
            <button
              onClick={handleUpgradePlan}
              className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors font-medium"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
        {/* Plan Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="text-lg font-medium text-gray-900">
              {billingSettings.leads}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Leads/month
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="text-lg font-medium text-gray-900">
              {billingSettings.teamMembers}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Team Members
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="text-lg font-medium text-gray-900">
              {billingSettings.storage}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Storage
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Methods
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-gray-400 text-xl"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {billingSettings.paymentMethod} {billingSettings.cardNumber}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Expires {billingSettings.expiryDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {billingSettings.isDefault && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Default
                  </span>
                )}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Billing History
        </h3>
        <div className="space-y-4">
          {billingSettings.billingHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div>
                <h4 className="font-medium text-gray-900">
                  {invoice.description}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-medium">
                  {invoice.amount}
                </span>
                <button
                  onClick={() => handleDownloadInvoice(invoice.id)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPlans;

