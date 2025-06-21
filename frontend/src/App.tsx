import { RouterProvider, createBrowserRouter } from "react-router-dom"

//Landing page
import Home from "./Landing-page/Home"
import Index from "./Landing-page/Index"

//Admin pages
import Login from "./admin/pages/Login"
import Dashboard from "./admin/pages/Dashboard"
import AdminHome from "./admin/pages/Home"
import AddProduct from "./admin/pages/AddProduct"



//User pages
import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"
import Cart from "./user/Cart"
import Products from "./user/Products"

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children:[
        {
          index:true,
          element: <Index/>
        },
        {
          path:"/products",
          element: <Products/>
        },
        {
          path: "/cart",
          element:<Cart/>
        },
        {
          path: "/signIn",
          element: <SignIn/>
        },
        {
          path: "/signUp",
          element: <SignUp/>
        }
      ]
    },

    //admin-routes
    {
      path:"/admin",
      element:<Login/>,
    },
    {
      path:"/dashboard/:id",
      element:<Dashboard/>,
      children:[
        {
          index: true,
          element:<AdminHome/>
        },
        {
          path:"/dashboard/:id/addProduct",
          element:<AddProduct/>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App