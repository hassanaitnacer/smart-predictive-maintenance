// react
import { Suspense, lazy } from "react"

// router
import { createBrowserRouter } from "react-router-dom"

// layouts
import { MainLayout } from "../layouts"

// ----------------------------------------------------------------------- //

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  )
}

const RouteError = Loadable(lazy(() => import("../views/misc/RouteError")))
const Root = Loadable(lazy(() => import("../views/pages/Root")))

// ----------------------------------------------------------------------- //

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Root />,
      },
    ],
  },
])
