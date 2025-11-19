import React, { useState } from "react";

// Pricing tiers
const plans = [
  {
    name: "Starter",
    price: "$29",
    currency: "USD",
    per: "month",
    description: "Perfect for small solar businesses",
    features: [
      "Up to 100 leads per month",
      "Basic CRM features",
      "Email support",
      "1 user account",
      "Lead tracking & management",
      "Basic reporting"
    ],
    button: "Choose Plan",
    highlight: false,
  },
  {
    name: "Professional",
    price: "Rs 79",
    currency: "INR",
    per: "month",
    description: "Ideal for growing solar companies",
    features: [
      "Up to 500 leads per month",
      "Advanced CRM features",
      "Priority email & chat support",
      "Up to 5 user accounts",
      "Advanced analytics & reporting"
    ],
    button: "Current Plan",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Rs 199",
    currency: "INR",
    per: "month",
    description: "For large solar enterprises",
    features: [
      "Unlimited leads",
      "Full CRM suite with AI insights",
      "24/7 phone & email support",
      "Unlimited user accounts",
      "Custom reporting & dashboards",
      "Advanced automation & AI",
      "API access & integrations",
      "Dedicated account manager"
    ],
    button: "Choose Plan",
    highlight: false,
  },
];

const durations = [
  { label: "Monthly", active: true },
  { label: "3 Months", badge: "Save 5%" },
  { label: "6 Months", badge: "Save 10%" },
  { label: "Yearly", badge: "Save 20%" },
];

const SubscriptionPlans = () => {
  const [selectedDuration, setSelectedDuration] = useState("Monthly");

  return (
    <div className=" mx-auto px-4 pt-2">
      {/* TopBar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <div className="flex gap-3">
          {durations.map(d => (
            <button
              key={d.label}
              onClick={() => setSelectedDuration(d.label)}
              className={`px-5 py-2 rounded-xl font-semibold border
                ${selectedDuration === d.label
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
                }`}
            >
              {d.label}
              {d.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-200 text-green-800 font-bold">
                  {d.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Plans */}
      <div className="flex gap-8 justify-center flex-wrap">
        {plans.map((plan, i) => (
          <div key={plan.name} className={`relative bg-white border-2 rounded-2xl px-8 py-10 w-[300px] flex flex-col items-center shadow ${plan.highlight ? 'border-blue-600 z-20' : 'border-blue-200'}`}>
            {plan.highlight && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-blue-600 text-white text-sm font-bold shadow">
                Most Popular
              </span>
            )}
            <div className="font-semibold text-xl mb-2">{plan.name}</div>
            <div className="text-blue-600 font-bold text-lg mb-1">
              {plan.price} <span className="text-gray-600 font-normal text-base">/{plan.per}</span>
            </div>
            <div className="text-gray-500 mb-6 text-center">{plan.description}</div>
            <ul className="mb-8 space-y-2 text-gray-700 text-sm">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className={`px-6 py-2 rounded-lg font-bold transition ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
