import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register/>
  }
])

const AppRouter = () => {
  return <RouterProvider router={appRouter} fallbackElement={<div>Loading...</div>} />
}

export default AppRouter