// ----------------------------------------------------------------------- //

const StatsCard = ({ title, value, desc }) => {
  return (
    <div className="stats items-start bg-base-200">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc">{desc}</div>
      </div>
    </div>
  )
}

export default StatsCard
