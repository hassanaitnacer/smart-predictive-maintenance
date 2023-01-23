// react
import { useState, useEffect } from "react"

// axios
import axios from "axios"

// uuid
import { v4 as uuidv4 } from "uuid"

// ----------------------------------------------------------------------- //

const MachineStatesTable = ({ machines }) => {
  const [data, setData] = useState()

  const loadPredictions = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/machine-failure/predict",
      {
        instances: machines.map((machine) => ({
          Type: machine.type,
          Air_temperature: machine.airTemperature,
          Process_temperature: machine.processTemperature,
          Rotational_speed: machine.rotationalSpeed,
          Torque: machine.torque,
          Tool_wear: machine.toolWear,
          Temperature_difference: machine.temperatureDifference,
        })),
      }
    )

    setData(
      machines.map((machine, index) => ({
        ...machine,
        likelihoodToBeDown: data[index][0],
      }))
    )
  }

  useEffect(() => {
    loadPredictions()
  }, [])

  if (!data) return

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Machine</th>
            <th>Air (°C)</th>
            <th>Process (°C)</th>
            <th>Rotational speed (rpm)</th>
            <th>Tool wear (min)</th>
            <th>Torque (Nm)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((machine, index) => (
            <tr key={uuidv4()}>
              <td>{`M${index}`}</td>
              <td>{machine.airTemperature}</td>
              <td>{machine.processTemperature}</td>
              <td>{machine.rotationalSpeed}</td>
              <td>{machine.torque}</td>
              <td>{machine.toolWear}</td>
              <td>
                {machine.isFailed ? (
                  <div className="badge badge-error">Down</div>
                ) : machine.likelihoodToBeDown > 0.5 ? (
                  <div>
                    <div className="badge badge-warning">In danger</div>
                    <div className="text-sm opacity-70">
                      {parseInt(machine.likelihoodToBeDown * 100)}% will be down
                      (predicted using our model)
                    </div>
                  </div>
                ) : (
                  <div className="badge badge-success">Up</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MachineStatesTable
