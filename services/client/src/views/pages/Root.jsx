// react
import { useEffect, useState } from "react"

// axios
import axios from "axios"

// components
import MachinesFailureOverTimeChart from "./MachinesFailureOverTimeChart"
import MachinesCountStat from "./MachinesCountStat"
import StatsCard from "./StatsCard"
import MachineTypesChart from "./MachineTypesChart"
import MachineStatesTable from "./MachineStatesTable"
import PredictManuallyModal from "./PredictManuallyModal"

// ----------------------------------------------------------------------- //

const Root = () => {
  const [data, setData] = useState()

  const loadData = () => {
    axios.get("/data/dashboard.json").then(({ data }) => setData(data))
  }

  useEffect(() => loadData(), [])

  if (!data) return

  return (
    <div>
      <div className="flex flex-col space-y-5 p-10">
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <MachinesCountStat
              totalMachines={data.stats.totalMachines}
              down={data.stats.down}
            />
          </div>
          <div className="grid gap-5 lg:col-span-2 sm:grid-cols-2">
            <StatsCard
              title="Failure mean time"
              value={data.stats.failureMeanTime}
              desc="Minutes"
            />
            <StatsCard
              title="Maintenance cost"
              value={data.stats.maintenanceCost}
              desc="MAD"
            />
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <MachinesFailureOverTimeChart data={data.machineFailureOverTime} />
          </div>
          <MachineTypesChart data={data.machineTypes} />
        </div>
        <div>
          <MachineStatesTable machines={data.machines} />
        </div>
      </div>

      <PredictManuallyModal />
    </div>
  )
}

export default Root
