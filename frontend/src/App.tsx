import { RouterProvider, createBrowserRouter } from "react-router-dom"

//Landing page
import Home from "./Landing-page/Home"
import Index from "./Landing-page/Index"

//Admin pages
import Login from "./admin/pages/Login"
import Dashboard from "./admin/pages/Dashboard"
import AdminHome from "./admin/pages/Home"
import AddProduct from "./admin/pages/AddProduct"
import AdminProducts from "./admin/pages/Products"
import Orders from "./admin/pages/Orders"
import Order from "./admin/pages/Order"
import EditProduct from "./admin/pages/EditProduct"

//User pages
import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"
import Cart from "./user/Cart"
import Products from "./user/Products"
import OrderForm from "./user/OrderForm"


//ErrorPage
import ErrorPage from "./ErrorPage"

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
          element: <Products/>,
        },
        {
          path:"/addProduct/:name",
          element: <OrderForm/>
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
        },
        {
          path:"/dashboard/:id/products",
          element:<AdminProducts/>
        },
        {
          path:"/dashboard/:id/orders",
          element:<Orders/>
        },
        {
          path: "/dashboard/:id/order/:orderId",
          element: <Order/>
        },
        {
          path:"/dashboard/:id/:name",
          element:<EditProduct/>
        }
      ]
    },
    {
      path:"*",
      element: <ErrorPage/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App