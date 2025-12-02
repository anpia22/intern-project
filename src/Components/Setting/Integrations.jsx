import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBolt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Integrations = () => {
  const [integrationSettings, setIntegrationSettings] = useState({
    googleWorkspace: true, // Connected
    microsoft365: false,
    slack: false,
    twilio: true, // Connected
    googleAnalytics: false,
    zapier: false,
  });

  const handleConnect = (key) => {
    setIntegrationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const integrations = [
    {
      category: "Email & Calendar",
      items: [
        {
          key: "googleWorkspace",
          name: "Google Workspace",
          desc: "Gmail & Google Calendar",
          icon: (
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
          ),
          connected: integrationSettings.googleWorkspace,
        },
        {
          key: "microsoft365",
          name: "Microsoft 365",
          desc: "Outlook & Teams",
          icon: (
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          ),
          connected: integrationSettings.microsoft365,
        },
      ],
    },
    {
      category: "Communication",
      items: [
        {
          key: "slack",
          name: "Slack",
          desc: "Team messaging",
          icon: (
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBolt} className="text-white" />
            </div>
          ),
          connected: integrationSettings.slack,
        },
        {
          key: "twilio",
          name: "Twilio",
          desc: "SMS messaging",
          icon: (
            <div className="w-10 h-10 bg-[#00a63e] rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBolt} className="text-white" />
            </div>
          ),
          connected: integrationSettings.twilio,
        },
      ],
    },
    {
      category: "Data & Analytics",
      items: [
        {
          key: "googleAnalytics",
          name: "Google Analytics",
          desc: "Track website traffic",
          icon: (
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faChartBar} className="text-white" />
            </div>
          ),
          connected: integrationSettings.googleAnalytics,
        },
        {
          key: "zapier",
          name: "Zapier",
          desc: "Automate workflows",
          icon: (
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBolt} className="text-white" />
            </div>
          ),
          connected: integrationSettings.zapier,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {integrations.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {category.category}
          </h3>
          <div className="space-y-3">
            {category.items.map((integration) => (
              <div
                key={integration.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {integration.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {integration.name}
                    </h4>
                    <p className="text-sm text-gray-500">{integration.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(integration.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.connected
                      ? "bg-[#00a63e] text-white hover:bg-[#00a63e]/80"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {integration.connected ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Integrations;
