// router
import { useRouteError, Link } from "react-router-dom"

// ----------------------------------------------------------------------- //

const RouteError = () => {
  const error = useRouteError()

  return (
    <section>
      <div className="flex items-center justify-center px-6 py-8 mx-auto h-screen lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
            {error.statusText || error.message}
          </h1>
          <p className="mb-4 text-lg font-light base-content">
            Sorry, an unexpected error has occurred!
          </p>
          <Link role="button" to="/" className="btn mt-4">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RouteError
