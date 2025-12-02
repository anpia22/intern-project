import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faGlobe } from "@fortawesome/free-solid-svg-icons";

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    activeSessions: [
      {
        id: 1,
        device: "Chrome on MacBook Pro",
        location: "San Diego, CA",
        time: "Current session",
        isActive: true,
      },
      {
        id: 2,
        device: "Safari on iPhone",
        location: "San Diego, CA",
        time: "2 hours ago",
        isActive: false,
      },
    ],
  });

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRevokeSession = (sessionId) => {
    setSecuritySettings((prev) => ({
      ...prev,
      activeSessions: prev.activeSessions.filter(
        (session) => session.id !== sessionId
      ),
    }));
  };

  const handleUpdatePassword = () => {
    // Add password update logic here
    if (
      securitySettings.newPassword &&
      securitySettings.newPassword === securitySettings.confirmPassword
    ) {
      alert("Password updated successfully!");
      setSecuritySettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={securitySettings.currentPassword}
              onChange={handleSecurityChange}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={securitySettings.newPassword}
              onChange={handleSecurityChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={securitySettings.confirmPassword}
              onChange={handleSecurityChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-start">
            <button
              onClick={handleUpdatePassword}
              className="bg-[#3887ee] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-start gap-4 p-4">
          <FontAwesomeIcon icon={faShield} className="text-gray-500 text-xl" />
          <div className="flex items-center justify-between gap-4 flex-1">
            <div>
              <h4 className="font-medium text-gray-900">Enable 2FA</h4>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onChange={handleSecurityChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Sessions
        </h3>
        <div className="space-y-4">
          {securitySettings.activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div className="flex items-center gap-4 flex-1">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-gray-500 text-xl"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{session.device}</h4>
                  <p className="text-sm text-gray-500">
                    {session.location} • {session.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {session.isActive ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;

