import { useNavigate } from "react-router-dom"
import AddProductForm from "../components/AddProductForm"

const AddProduct = () => {
  const navigate = useNavigate()
  return (
    <>
        <h1 className="w-full h-10 mt-10 font-medium md:font-bold text-lg md:text-xl text-center pt-2 pb-2">Add Product</h1>
        <AddProductForm/>
    </>
  )
}

export default AddProduct