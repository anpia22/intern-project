import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faFilter,
  faDownload,
  faPlus,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    city: "",
    companyName: "",
    companyAddress: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saving changes:", formData);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      city: "",
      companyName: "",
      companyAddress: "",
      bio: "",
    });
  };

  const handleExportPDF = () => {
    setShowExportDropdown(false);
    // Export logic here
    console.log("Exporting to PDF");
  };

  const handleExportExcel = () => {
    setShowExportDropdown(false);
    // Export logic here
    console.log("Exporting to Excel");
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setShowExportDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-6 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

        <div className="flex items-center gap-3">
          {/* Add New User Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" /> Add New User
          </button>

          {/* Filter Button */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`rounded-lg px-4 py-3 transition-colors ${
                showFilterDropdown
                  ? "bg-blue-300 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-2">
                  <p className="text-sm text-gray-500 px-3 py-2">Filter options</p>
                </div>
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="relative" ref={exportDropdownRef}>
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
            >
              Export
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </button>
            {showExportDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faDownload} size="sm" /> Export as PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faDownload} size="sm" /> Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Profile Picture
          </h2>
          <p className="text-sm text-gray-500">Update your profile photo.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-400 text-4xl"
              />
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faCamera} size="sm" /> Change Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={handleRemovePhoto}
              className="bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500">Update your personal details.</p>
        </div>

        <form onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Job Title */}
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="companyAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Address
              </label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white text-gray-700 px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

