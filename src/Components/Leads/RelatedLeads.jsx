const statusStyles = {
  New: "bg-green-100 text-green-700",
  "In Process": "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  "In Process Pink": "bg-pink-100 text-pink-700",
};

const leads = [
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "In Process",
  },
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "New",
  },
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "New",
  },
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "In Process",
  },
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "Active",
  },
  {
    name: "Andrew Peterson",
    date: "Today 10:30PM",
    person: "Elias Thorne",
    number: "(555) 123-4567",
    email: "elias.thorne@fictionalmail.com",
    city: "Boulder, Colorado",
    pin: "80302",
    bill: "$115.50",
    status: "In Process Pink",
  },
];

const RelatedLeads = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Leads</h2>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded bg-gray-200"
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">
          Export
        </button>
        <button className="bg-gray-200 px-2 py-2 rounded">
          <svg width="16" height="16" fill="none" stroke="currentColor">
            <circle cx="8" cy="8" r="7" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((lead, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded-xl p-6 flex flex-col space-y-2"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-100 text-blue-600 rounded-full p-2">
              <svg width="24" height="24" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <rect x="8" y="14" width="8" height="6" rx="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{lead.name}</span>
              <span className="text-xs text-gray-500">{lead.date}</span>
            </div>
          </div>
          <hr />
          <div className="text-sm text-gray-700">
            <div>
              <span className="font-semibold">Name:</span> {lead.person}
            </div>
            <div>
              <span className="font-semibold">Number:</span> {lead.number}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {lead.email}
            </div>
            <div>
              <span className="font-semibold">City:</span> {lead.city}
            </div>
            <div>
              <span className="font-semibold">Pin Code:</span> {lead.pin}
            </div>
            <div>
              <span className="font-semibold">Monthly Electrical Bill:</span>{" "}
              {lead.bill}
            </div>
          </div>
          <div
            className={`mt-4 px-4 py-2 rounded-full font-semibold text-center w-fit ${
              statusStyles[lead.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {lead.status.replace("Pink", "")}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RelatedLeads;
