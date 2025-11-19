import {
  faAngleDown,
  faCircleCheck,
  faDownLeftAndUpRightToCenter,
  faDownload,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const client = {
  name: "Andrew Peterson",
  phone: "9924156245",
  email: "andrew.peterson@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  project: {
    address: "1247 Maple Street San Diego, CA 92101",
    plan: "Rs 2850/month",
    companyAddress: "415408",
    city: "Pune",
    companyName: "DTG",
    totalLeads: "1,256",
  },
};

const nextSteps = [
  {
    label: "Site Visit Scheduled",
    description: "Nov 15, 2025 at 2:00 PM",
    highlight: true,
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
        <path d="M16 2v4M8 2v4" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Follow up on proposal",
    description: "Due: Nov 13, 2025",
    highlight: false,
    icon: (
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M17 21V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v14h18z"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Send financing options",
    description: "Due: Nov 14, 2025",
    highlight: false,
    icon: (
    //   <svg
    //     className="w-5 h-5 text-gray-500"
    //     fill="none"
    //     stroke="currentColor"
    //     viewBox="0 0 24 24"
    //   >
    //     <path
    //       d="M12 22s6-1 6-7V8A6 6 0 0 0 6 8v7c0 6 6 7 6 7z"
    //       strokeWidth="2"
    //     />
    //   </svg>
    <FontAwesomeIcon icon={faCircleCheck} />
    ),
  },
];

const ClientPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="text-2xl font-semibold mb-6">Clients</div>
        <div className="flex flex-row gap-3 items-center">
          <div>
            <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2 items-center bg-blue-300 rounded-lg  px-4 py-3 text-slate-900" />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex flex-row gap-3">
              <span>Export</span>
              <span>
                <FontAwesomeIcon icon={faDownload} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-2xl mb-8 p-3">
        <button className="text-gray-500 flex items-center gap-1">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            className="mr-2"
          >
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Back to Leads</span>
        </button>
        {/* Top Card */}
        <div className="flex flex-wrap md:flex-nowrap items-center p-2 gap-3">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-14 h-14 rounded-full "
          />
          <div>
            <div className="font-semibold text-lg">{client.name}</div>
            <div className="text-gray-500 text-sm flex gap-3">
              <span>{client.phone}</span>
              <span>{client.email}</span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 mt-4 md:mt-0">
            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-md font-semibold">
              In Process
            </span>
            <button className="bg-gray-900 text-white px-5 py-2 rounded font-semibold">
              Edit Lead
            </button>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Overview Card */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <div className="font-semibold mb-4">Project Overview</div>
          <div className="grid grid-cols-2 gap-5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-sm">
              <div>
                <div className="text-gray-500">Address</div>
                <div>{client.project.address}</div>
              </div>
              <div>
                <div className="text-gray-500">Subscription Plan</div>
                <div>{client.project.plan}</div>
              </div>
              <div>
                <div className="text-gray-500">Company Address</div>
                <div>{client.project.companyAddress}</div>
              </div>
              <div>
                <div className="text-gray-500">Company Name</div>
                <div>{client.project.companyName}</div>
              </div>
              <div>
                <div className="text-gray-500">City</div>
                <div>{client.project.city}</div>
              </div>
            </div>
            {/* Total Leads Card */}
            <div className="float-right bg-blue-50 rounded-xl w-52 h-32 flex flex-col justify-center items-center mx-auto">
              <div className="text-gray-500 font-semibold text-sm mb-1">
                Total Leads
              </div>
              <div className="text-4xl font-extrabold">
                {client.project.totalLeads}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-2xl shadow px-4 py-2">
          <div className="font-semibold mb-4">Next Steps</div>
          <div className="flex flex-col gap-4">
            {nextSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex gap-3 items-start rounded-xl px-2 py-3 ${
                  step.highlight ? "bg-blue-50" : ""
                }`}
              >
                {step.icon}
                <div>
                  <div className="font-medium text-sm">{step.label}</div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
