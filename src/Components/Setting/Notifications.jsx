import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    // Notification Channels
    emailNotifications: true,
    smsNotifications: false,
    // Notification Types
    newLeadAssignment: true,
    statusChanges: true,
    newMessages: true,
  });

  const handleNotificationChange = (name) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Notification Channels Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Channels
        </h3>
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 flex-1">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 text-xl"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  Email Notifications
                </h4>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={() => handleNotificationChange("emailNotifications")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 flex-1">
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-500 text-xl"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                <p className="text-sm text-gray-500">
                  Receive notifications via text message
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={() => handleNotificationChange("smsNotifications")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Types Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Types
        </h3>
        <div className="space-y-4">
          {/* New Lead Assignment */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">New Lead Assignment</h4>
              <p className="text-sm text-gray-500">
                When a new lead is assigned to you
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.newLeadAssignment}
                onChange={() => handleNotificationChange("newLeadAssignment")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Status Changes */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Status Changes</h4>
              <p className="text-sm text-gray-500">
                When a lead status is updated
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.statusChanges}
                onChange={() => handleNotificationChange("statusChanges")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* New Messages */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">New Messages</h4>
              <p className="text-sm text-gray-500">
                When you receive a new message
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.newMessages}
                onChange={() => handleNotificationChange("newMessages")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

