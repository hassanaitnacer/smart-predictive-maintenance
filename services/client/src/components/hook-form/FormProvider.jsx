// form
import { FormProvider as Form } from "react-hook-form"

// ----------------------------------------------------------------------- //

const FormProvider = ({ methods, children }) => {
  return <Form {...methods}>{children}</Form>
}

export default FormProvider
