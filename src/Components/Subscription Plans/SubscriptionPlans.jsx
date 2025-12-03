"use client";
import React, { useState } from "react";

const plans = [
  {
    name: "Free Starter Tier",
    price: "₹0",
    leads: "30 verified leads",
    button: "Choose Plan",
    highlight: false,
    features: [
      "30 verified leads",
      "Basic user activity dashboard",
      "Basic CRM access",
      "Up to 2 user seats",
      "Basic experience tracking",
      "Single invoice generation",
      "Standard email support",
    ],
  },
  {
    name: "Growth Plan",
    price: "₹11,999 /150 Leads",
    leads: "150 verified leads",
    button: "Choose Plan",
    highlight: true,
    tag: "MOST POPULAR",
    features: [
      "150 verified leads",
      "Region & category filters",
      "Instant lead delivery",
      "WhatsApp & email follow-ups",
      "Up to 10 user seats",
      "Full CRM access",
      "Real-time lead pipeline dashboard",
      "Billing management system",
      "Performance reports & reminders",
      "Priority email support",
    ],
  },
  {
    name: "Basic Plan",
    price: "₹9,999 /100 Leads",
    leads: "100 verified leads",
    button: "Choose Plan",
    highlight: false,
    features: [
      "100 verified leads",
      "Instant lead delivery",
      "Full CRM access",
      "Real-time lead pipeline dashboard",
      "Full billing management",
      "Priority email support",
    ],
  },
];

const bottomPlans = [
  {
    name: "Verified Leads Plan",
    price: "₹15,999 /100 Leads",
    leads: "100 verified & filtered leads",
    button: "Choose Plan",
    features: [
      "Everything in Growth Plan",
      "100 verified & filtered leads",
      "Location & KW based targeting",
      "Final-call verification",
      "Real-time CRM delivery",
      "Up to 10 user seats",
      "Full CRM dashboard",
      "Performance reports",
      "Full billing system",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise Plan",
    price: "Custom Pricing /lead",
    leads: "Custom bulk lead delivery",
    button: "Choose Plan",
    features: [
      "Everything in Verified Leads Plan",
      "Custom bulk lead delivery",
      "Custom multi-criteria filtering",
      "Dedicated data vetting",
      "Real-time CRM delivery",
      "Unlimited seats & SSO",
      "Two-way CRM/ERP integration",
      "AI-driven predictive analytics",
      "Advanced matching algorithms",
      "Automated & bulk invoice generation",
      "Full billing with audit logs",
      "Dedicated success manager",
      "Custom CRM setup & integrations",
    ],
  },
];

const SubscriptionPlans = () => {
  const [selectedDuration] = useState("Monthly");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Subscription Plans</h1>

      {/* Top Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between border rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 bg-white shadow-sm h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[520px] hover:border-[#95d5fd] hover:bg-[#eff9ff] transition-colors ${
              plan.highlight ? "border-blue-600 shadow-xl md:scale-[1.03] hover:border-[#95d5fd] hover:bg-[#eff9ff] transition-colors" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 w-full bg-[#3887ee] text-white py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold shadow-md">
                MOST POPULAR
              </div>
            )}

            <div className={plan.highlight ? "pt-8 sm:pt-10 lg:pt-12" : ""}>
              <h3 className="text-base sm:text-lg font-semibold">{plan.name}</h3>
              <p className="text-xl sm:text-2xl font-bold mt-1">{plan.price}</p>
              <p className="text-sm sm:text-base text-gray-500 mt-1">{plan.leads}</p>

              <ul className="mt-4 sm:mt-6 space-y-2 text-xs sm:text-sm text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start sm:items-center gap-2">
                    <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5 sm:mt-0">✔</span> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`mt-6 sm:mt-8 w-full py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg border hover:border-blue-600 hover:border transition-colors ${
                plan.highlight
                  ? "hover:bg-[#3887ee] hover:text-white bg-white text-[#3887ee] hover:border-[#3887ee] hover:border transition-colors"
                  : "hover:text-[#3887ee] bg-[#3887ee] text-white hover:bg-white hover:border-[#3887ee] hover:border transition-colors"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full md:w-2/3 mx-auto">
        {bottomPlans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col justify-between border rounded-2xl p-4 sm:p-6 lg:p-8 bg-white shadow-sm h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[520px] hover:border-[#95d5fd] hover:bg-[#eff9ff] transition-colors"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">{plan.name}</h3>
              <p className="text-xl sm:text-2xl font-bold mt-1">{plan.price}</p>
              <p className="text-sm sm:text-base text-gray-500 mt-1">{plan.leads}</p>

              <ul className="mt-4 sm:mt-6 space-y-2 text-xs sm:text-sm text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start sm:items-center gap-2">
                    <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5 sm:mt-0">✔</span> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 sm:mt-8 w-full py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg border bg-[#3887ee] text-white hover:bg-white hover:text-[#3887ee] hover:border-[#3887ee] hover:border transition-colors">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
