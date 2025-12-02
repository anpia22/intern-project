"use client";
import React, { useState } from "react";

const plans = [
  {
    name: "Free Starter Tier",
    price: "₹0",
    leads: "30 verified leads",
    button: "Start Free Trial",
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
    button: "Book Growth Plan",
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
    button: "Start Basic Plan",
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
    button: "Get Sample Leads",
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
    button: "Schedule Enterprise Plan",
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
    <div className="mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Subscription Plans</h1>

      {/* Top Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between border rounded-2xl p-8 bg-white shadow-sm h-full min-h-[520px] ${
              plan.highlight ? "border-blue-600 shadow-xl scale-[1.03]" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-2xl font-bold mt-1">{plan.price}</p>
              <p className="text-gray-500 mt-1">{plan.leads}</p>

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✔</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`mt-8 w-full py-2 font-semibold rounded-lg ${
                plan.highlight
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-2/3 mx-auto">
        {bottomPlans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col justify-between border rounded-2xl p-8 bg-white shadow-sm h-full min-h-[520px]"
          >
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-2xl font-bold mt-1">{plan.price}</p>
              <p className="text-gray-500 mt-1">{plan.leads}</p>

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✔</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-8 w-full py-2 font-semibold rounded-lg bg-blue-600 text-white">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
