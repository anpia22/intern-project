import LeadCard from "../CardSection/LeadCard";

const LeadCardsList = ({ statusName, badgeClass, leadData }) => {
    return  (
  <>
    {leadData
      .filter((lead) => lead.status === statusName)
      .map((lead) => (
        <LeadCard key={lead.id} lead={lead} badgeClass={badgeClass} />
      ))}
  </>
);}

export default LeadCardsList;