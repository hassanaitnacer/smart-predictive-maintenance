// react
import { useState } from "react"

// form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// axios
import axios from "axios"

// utils
import classNames from "classnames"

// components
import { RHFTextField, FormProvider } from "../../components/hook-form"
import { data } from "autoprefixer"

// ----------------------------------------------------------------------- //

const SCHEMA = yup
  .object({
    Type: yup.string().required("Type is required"),
    Air_temperature: yup.number().required("Air temperature is required"),
    Process_temperature: yup
      .number()
      .required("Process temperature is required"),
    Rotational_speed: yup.number().required("Rotational speed is required"),
    Torque: yup.number().required("Torque is required"),
    Tool_wear: yup.number().required("Tool wear is required"),
  })
  .required()

const PredictManuallyModal = () => {
  const [data, setData] = useState()
  const formMethods = useForm({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      Type: "L",
      Air_temperature: 0,
      Process_temperature: 0,
      Rotational_speed: 0,
      Torque: 0,
      Tool_wear: 0,
    },
  })
  const { formState, register } = formMethods

  const onSubmit = async (data) => {
    const res = await axios.post(
      "http://localhost:8000/machine-failure/predict",
      {
        instances: [
          {
            ...data,
            Temperature_difference:
              data.Process_temperature - data.Air_temperature,
          },
        ],
      }
    )

    setData(res.data[0][0])
  }

  return (
    <div>
      <input
        type="checkbox"
        id="manual-predict-model"
        className="modal-toggle"
      />
      <label htmlFor="manual-predict-model" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <FormProvider methods={formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <select
                  className="select select-bordered w-full"
                  {...register("Type")}
                >
                  <option defaultChecked value="L">
                    Low
                  </option>
                  <option value="M">Medium</option>
                  <option value="H">High</option>
                </select>

                <RHFTextField
                  type="number"
                  step="0.01"
                  name="Air_temperature"
                  placeholder="Air temperature"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <RHFTextField
                  type="number"
                  step="0.01"
                  name="Process_temperature"
                  placeholder="Process temperature"
                  className="input input-bordered w-full"
                />
                <RHFTextField
                  type="number"
                  name="Rotational_speed"
                  placeholder="Rotational speed"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <RHFTextField
                  type="number"
                  step="0.01"
                  name="Torque"
                  placeholder="Torque"
                  className="input input-bordered w-full"
                />
                <RHFTextField
                  type="number"
                  name="Tool_wear"
                  placeholder="Tool wear"
                  className="input input-bordered w-full"
                />
              </div>

              <button
                type="submit"
                disabled={formState.isSubmitting}
                className={classNames({
                  "btn btn-primary": true,
                  loading: formState.isSubmitting,
                })}
              >
                Predict
              </button>
            </form>
          </FormProvider>
          {data && (
            <div className="mt-8">
              <div className="alert">
                <div>
                  <span>
                    <span className="text-lg font-bold text-primary">
                      {parseInt(data * 100)}%
                    </span>{" "}
                    will be fail
                  </span>
                </div>
              </div>
            </div>
          )}
        </label>
      </label>
    </div>
  )
}

export default PredictManuallyModal
