import LeadCard from "../CardSection/LeadCard";

const LeadCardsList = ({ statusName, badgeClass, leadData, onLeadClick }) => {
    return  (
  <>
    {leadData
      .filter((lead) => lead.status === statusName)
      .map((lead) => (
        <LeadCard 
          key={lead.id} 
          lead={lead} 
          badgeClass={badgeClass} 
          onClick={() => onLeadClick(lead)}
        />
      ))}
  </>
);}

export default LeadCardsList;