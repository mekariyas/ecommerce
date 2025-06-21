import { FaArrowLeft } from "react-icons/fa6"
import AddProductForm from "../components/AddProductForm"

const AddProduct = () => {
  return (
    <>
        <button className="flex mt-2 items-center text-center ml-2 cursor-pointer font-medium md:font-bold text-lg md:text-xl"><FaArrowLeft/>Go back</button>
        <h1 className="w-full h-10  font-medium md:font-bold text-lg md:text-xl text-center pt-2 pb-2">Add Product</h1>
        <AddProductForm/>
    </>
  )
}

export default AddProduct