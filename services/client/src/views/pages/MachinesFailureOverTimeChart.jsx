// apex
import Chart from "react-apexcharts"

// ----------------------------------------------------------------------- //

const MachinesFailureOverTimeChart = ({ data }) => {
  const series = [
    {
      name: "Low",
      data: data.series.low,
    },
    {
      name: "Medium",
      data: data.series.medium,
    },
    {
      name: "High",
      data: data.series.high,
    },
  ]

  const options = {
    chart: {
      type: "bar",
      foreColor: "#ffffff",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.options.categories,
    },
    yaxis: {
      title: {
        text: "Number of machines",
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: "#90A4AE22",
    },
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Failure of machines over time</h2>
        <Chart
          options={options}
          series={series}
          width="100%"
          height="200"
          type="bar"
        />
      </div>
    </div>
  )
}

export default MachinesFailureOverTimeChart
