const LeadCard = ({ lead, badgeclass }) => {
  
  return (
    <div className="bg-white rounded-2xl shadow px-6 py-5 mb-5">
      {/* Profile and Menu */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt={lead.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="font-semibold text-sm">{lead.name}</div>
            <div className="text-xs text-gray-500">{lead.time}</div>
          </div>
        </div>
        <button className="text-gray-400 text-lg hover:text-gray-600">⋮</button>
      </div>
      <div className="border-b border-gray-200 my-2"></div>
      {/* Contact Info */}
      <div className="text-sm text-gray-800 mb-1 flex items-center gap-2">
        {/* <div className="flex items-center gap-2"> */}
          <span>📞</span>
          <span>{lead.phone}</span>
        </div>
        <div className="text-sm text-gray-800 flex items-center gap-2 mb-3">
          <span>✉️</span>
          <span className="truncate">{lead.email}</span>
        </div>
      {/* </div> */}
      
      {/* Status Badge */}
      <div className={`${badgeclass} w-fit mt-2 inline-block px-5 py-2 text-sm rounded-lg font-semibold`}>
        {lead.status}
      </div>
    </div>
  );
};
export default LeadCard;