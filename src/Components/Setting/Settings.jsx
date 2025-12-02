import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUser,
  faBell,
  faLock,
  faCreditCard,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import GeneralSettings from "./GeneralSettings";
import MyProfile from "./MyProfile";
import Notifications from "./Notifications";
import Security from "./Security";
import BillingPlans from "./BillingPlans";
import Integrations from "./Integrations";

const Settings = ({ setActivePage }) => {
  const [activeSection, setActiveSection] = useState("General Settings");

  const settingsMenu = [
    { name: "General Settings", icon: faFileAlt },
    { name: "My Profile", icon: faUser },
    { name: "Notifications", icon: faBell },
    { name: "Security", icon: faLock },
    { name: "Billing & Plans", icon: faCreditCard },
    { name: "Integrations", icon: faBolt },
  ];

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "General Settings":
        return <GeneralSettings />;
      case "My Profile":
        return <MyProfile />;
      case "Notifications":
        return <Notifications />;
      case "Security":
        return <Security />;
      case "Billing & Plans":
        return <BillingPlans setActivePage={setActivePage} />;
      case "Integrations":
        return <Integrations />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Setting</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Navigation */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <div className="bg-white p-4">
            <nav className="space-y-2">
              {settingsMenu.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeSection === item.name
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${
                      activeSection === item.name
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-3/4 mr-16">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {renderContent()}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  // Reset logic can be added here
                }}
                className="bg-white text-gray-700 px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
