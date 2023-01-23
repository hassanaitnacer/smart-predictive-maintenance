// ----------------------------------------------------------------------- //

const MachinesCountStat = ({ totalMachines, down }) => {
  return (
    <div className="w-full stats items-start bg-primary text-primary-content">
      <div className="stat">
        <div className="stat-title">Total machines</div>
        <div className="stat-value">{totalMachines}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Current failure</div>
        <div className="stat-value">{down}</div>
        <div className="stat-actions">
          <label
            htmlFor="manual-predict-model"
            className="btn btn-sm btn-success"
          >
            Predict Manually
          </label>
        </div>
      </div>
    </div>
  )
}

export default MachinesCountStat
