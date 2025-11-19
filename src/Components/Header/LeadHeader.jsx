const LeadHeader = ({ status }) => {
    return (
  <div
    className="flex justify-evenly items-center bg-white rounded-2xl shadow px-6 gap-2 basis-sm py-4 mb-6"
  >
    <span className="flex items-center gap-3">
      <span className={`w-4 h-4 rounded-full ${status.color}`}></span>
      <span className="font-semibold text-lg">{status.name}</span>
    </span>
    <span className={`px-4 py-1 rounded-xl text-base font-medium ${status.badge}`}>
      {status.count} Leads
    </span>
  </div>
);
}
export default LeadHeader;