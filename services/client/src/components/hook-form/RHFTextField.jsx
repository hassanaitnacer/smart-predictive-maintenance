// form
import { useFormContext, Controller } from "react-hook-form"

// utils
import classNames from "classnames"

// ----------------------------------------------------------------------- //

const RHFTextField = ({ name, className, ...other }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <input
            {...field}
            className={classNames({
              [className]: true,
              "input-error": fieldState.error,
            })}
            {...other}
          />
          {fieldState.error && (
            <span className="label">
              <span className="label-text-alt text-error">
                {fieldState.error.message}
              </span>
            </span>
          )}
        </div>
      )}
    />
  )
}

export default RHFTextField
