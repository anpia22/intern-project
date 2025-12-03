import StatCard from "../CardSection/StatCard";

const StatsCardsGrid = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 w-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          percent={stat.percent}
          delta={stat.delta}
        />
      ))}
    </div>
  );
};

export default StatsCardsGrid;

