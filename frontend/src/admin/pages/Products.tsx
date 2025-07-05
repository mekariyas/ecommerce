import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

import instance from "../../api/api.tsx"


interface products{
  _id: string
  name: string,
  price: number,
  brand: string,
  description: string,
  stock: number,
  color : string[],
  size: string[],
  image: string
}

const Products = () => {
  const{ id } = useParams()
  const navigate = useNavigate()
  const cloudName = import.meta.env.VITE_CLOUD_NAME

  const [products, setProducts ] = useState<products[]>([])

  const handleDataFetch = async()=>{
    try{
        const dataFetched = await instance.get("/admin/getProducts")
        //console.log(dataFetched.data.products)
        const { products } = dataFetched.data
        console.log(products)
        setProducts(products)
    }catch(error){
      console.log(error)
    }
  }

  const handleEditPageRoute = (param:string)=>{
    navigate(`/dashboard/${id}/${param}`)
  }
  useEffect(()=>{
    handleDataFetch()
  },[])

  //const handleDelete = ()=>{}
  
  return (
    <section className="w-full h-[80vh] md:h-full relative top-16 md:static overflow-y-scroll">
      <ul className="w-full flex flex-wrap items-between justify-center md:justify-start space-x-4 mb-2 md:pl-2 pt-4">
        {products.map(product=>{
          return(
          <li key={product._id} className="w-[80%] md:w-[45%] border-[0.5px] h-[88vh] flex flex-col  items-start md:space-x-2 rounded-lg mb-2">
            <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${product.image}`} alt={product.name} className="w-[100%] h-[55%] object-contain md:object-cover rounded-tl-md rounded-tr-md" loading="lazy"/>
            <section className="ml-2">
              <h1 className="md:text-lg font-semibold w-full">Name: {product.name}</h1>
              <h2 className="md:text-lg font-semibold w-full">Brand: {product.brand}</h2>
              <p className="md:text-lg font-semibold w-full">Description: {product.description}</p>
              <p className="md:text-lg font-semibold w-full">Price: {product.price} ETB</p>
              <p className="md:text-lg font-semibold w-full">Stock: {product.stock}</p>
              <section className="md:text-lg font-semibold w-full flex">Sizes: {
                product.size.length> 1? (<ul className="w-full flex  justify-start space-x-3">
                  {product.size.map((prodSize,i)=>{
                    return(<li key={i}>
                      <p className="md:text-lg font-semibold"> {prodSize}</p>
                    </li>)
                  })}
                </ul>): product.size}</section>
              <section className="md:text-lg w-full flex font-semibold">Colors: {
                product.color.length> 1? (<ul className="w-full flex  justify-start space-x-3">
                  {product.color.map((prodColor,i)=>{
                    return(<li key={i}>
                      <p className="md:text-lg font-semibold"> {prodColor}</p>
                    </li>)
                  })}
                </ul>): product.color}</section>
            </section>
            <section className="w-full flex justify-center items-center gap-2 h-20">
                <button className="bg-orange-500 w-[20%] h-[40%] rounded-lg text-center flex items-center justify-center text-white cursor-pointer" onClick={()=>handleEditPageRoute(product.name)}><FaRegEdit className="ml-2 w-[30%] h-[75%]"/></button>
                <button className="bg-red-600 w-[20%] h-[40%] rounded-lg text-center flex items-center justify-center text-white cursor-pointer"><CiTrash className="w-[25%] h-[90%]"/></button>
              </section>
          </li>)
      })}
      </ul>
    </section>
  )
}

export default Products