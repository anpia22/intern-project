"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Maintenance = forwardRef((props, ref) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [calendarView, setCalendarView] = useState("Month"); // "Month", "Week", "Day"
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [formData, setFormData] = useState({
    asset: "",
    maintenanceType: "",
    date: "",
    time: "",
    description: "",
    assignedTo: "",
  });

  // Calendar functions
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 9, 1)); // October 2025
  };

  // Convert 24h time to 12h format with AM/PM
  const formatTime = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Sample maintenance events - converted to state
  const [maintenanceEvents, setMaintenanceEvents] = useState([
    { 
      id: 1,
      year: 2025, 
      month: 9, 
      date: 1, 
      time: "10:50 PM", 
      title: "HVAC Unit PM Asset #1026", 
      color: "light-blue" 
    },
    { 
      id: 2,
      year: 2025, 
      month: 9, 
      date: 5, 
      time: "10:50 PM", 
      title: "HVAC Unit PM Asset #1026", 
      color: "light-blue" 
    },
    { 
      id: 3,
      year: 2025, 
      month: 9, 
      date: 11, 
      time: "10:50 PM", 
      title: "HVAC Unit PM Asset #1026", 
      color: "light-red" 
    },
    { 
      id: 4,
      year: 2025, 
      month: 9, 
      date: 14, 
      time: "10:50 PM", 
      title: "HVAC Unit PM Asset #1026", 
      color: "light-blue" 
    },
    { 
      id: 5,
      year: 2025, 
      month: 9, 
      date: 14, 
      time: "10:50 PM", 
      title: "HVAC Unit PM Asset #1026", 
      color: "light-red" 
    },
  ]);

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Previous month's days
    const prevMonthDays = getDaysInMonth(new Date(year, month - 1, 1));
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (day, month, year) => {
    return maintenanceEvents.filter(
      (event) =>
        event.date === day &&
        event.month === month &&
        event.year === year
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.asset || !formData.maintenanceType || !formData.date || !formData.time) {
      alert("Please fill in all required fields (Asset, Maintenance Type, Date, and Time)");
      return;
    }

    // Parse the selected date
    const selectedDate = new Date(formData.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth(); // 0-indexed
    const day = selectedDate.getDate();

    // Format time
    const formattedTime = formatTime(formData.time);

    // Create event title from maintenance type and asset
    const eventTitle = `${formData.maintenanceType} Asset #${formData.asset}`;

    // Determine color (alternate or random, you can customize this logic)
    const color = Math.random() > 0.5 ? "light-blue" : "light-red";

    // Create new event
    const newEvent = {
      id: Date.now(), // Use timestamp as unique ID
      year,
      month,
      date: day,
      time: formattedTime,
      title: eventTitle,
      color,
      description: formData.description,
      assignedTo: formData.assignedTo,
    };

    // Add new event to the list
    setMaintenanceEvents((prevEvents) => [...prevEvents, newEvent]);

    // Reset form and close modal
    setShowScheduleModal(false);
    setFormData({
      asset: "",
      maintenanceType: "",
      date: "",
      time: "",
      description: "",
      assignedTo: "",
    });

    // Navigate to the month of the scheduled date if not already there
    if (year !== currentDate.getFullYear() || month !== currentDate.getMonth()) {
      setCurrentDate(new Date(year, month, 1));
    }
  };

  // Expose modal opening function to parent
  useImperativeHandle(ref, () => ({
    openModal: () => setShowScheduleModal(true),
  }));

  return (
    <>
      {/* Calendar Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 ml-2">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCalendarView("Month")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              calendarView === "Month"
                ? "bg-[#3887ee] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setCalendarView("Week")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              calendarView === "Week"
                ? "bg-[#3887ee] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setCalendarView("Day")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              calendarView === "Day"
                ? "bg-[#3887ee] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {calendarView === "Month" && (
        <div className="mt-4">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 border border-gray-200 rounded-lg overflow-hidden">
            {/* Day Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="bg-gray-50 py-3 px-2 text-center text-sm font-semibold text-gray-700 border-b border-gray-200"
              >
                {day}
              </div>
            ))}
            {/* Calendar Days */}
            {renderCalendar().map((dateObj, index) => {
              const events = dateObj.isCurrentMonth
                ? getEventsForDate(
                    dateObj.day,
                    currentDate.getMonth(),
                    currentDate.getFullYear()
                  )
                : [];
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border-r border-b border-gray-200 ${
                    dateObj.isCurrentMonth ? "bg-white" : "bg-gray-50"
                  } ${!dateObj.isCurrentMonth ? "text-gray-400" : "text-gray-900"}`}
                >
                  <div className="text-sm font-medium mb-1">{dateObj.day}</div>
                  <div className="space-y-1">
                    {events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs p-1.5 rounded ${
                          event.color === "light-blue"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-red-100 text-red-900"
                        }`}
                      >
                        <div className="font-medium">{event.time}</div>
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal Overlay */}
      {showScheduleModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-end z-50"
          onClick={() => setShowScheduleModal(false)}
        >
          <div
            className="bg-blue-50 rounded-2xl shadow-2xl w-full max-w-md h-[90vh] overflow-y-auto flex flex-col m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Schedule Maintenance
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in the details to schedule a maintenance task
                </p>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
              {/* Asset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="asset"
                  value={formData.asset}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter asset name or ID"
                  required
                />
              </div>

              {/* Maintenance Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., HVAC Unit PM"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter maintenance description"
                />
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter assigned technician"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#3887ee] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
});

Maintenance.displayName = "Maintenance";

export default Maintenance;

