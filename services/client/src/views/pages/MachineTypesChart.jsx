// apex
import Chart from "react-apexcharts"

// ----------------------------------------------------------------------- //

const MachineTypesChart = ({ data }) => {
  const series = data.series

  const options = {
    labels: data.options.labels,
    chart: {
      type: "donut",
      foreColor: "#ffffff",
    },
    stroke: {
      colors: "transparent",
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Machine types</h2>
        <Chart options={options} series={series} width="100%" type="donut" />
      </div>
    </div>
  )
}

export default MachineTypesChart
