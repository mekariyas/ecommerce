import { useState,useEffect } from "react"
import { useNavigate,useParams, useSearchParams } from "react-router-dom"
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

import { AxiosError } from "axios"
import { useAdminTokenStorage }  from "../../store/adminToken"

import instance from "../../api/api.tsx"
import Pagination from "../../components/pagination.tsx"

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
  const { id } = useParams()
  const navigate = useNavigate()
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const token = useAdminTokenStorage((state)=>state.token)
  const saveToken = useAdminTokenStorage((state)=>state.saveToken)
  const [searchParams, setSearchParams ] = useSearchParams()

  const [products, setProducts ] = useState<products[]>([])
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const handleDataFetch = async()=>{
    try{
        const dataFetched = await instance.get(`/admin/getProducts/?page=${searchParams.get("page")}&skip=${searchParams.get("skip") ?? 0}`,{headers:{
        Authorization: `bearer ${token}`
      },withCredentials:true})
        const { products , totalProducts, accessToken } = dataFetched.data
        saveToken(accessToken)
        setProducts(products)
        if(totalProducts % 5 === 0){
          setTotalProducts(totalProducts / 5)
        } else{
          setTotalProducts(Math.ceil(totalProducts / 5))
        }

    }catch(error){
      if(error instanceof AxiosError){
        console.log(error.message)
      }
      console.log("error")
      console.log(error)
    }
  }

  const handleEditPageRoute = (param:string)=>{
    navigate(`/dashboard/${id}/${param}`)
  }
  useEffect(()=>{
    handleDataFetch()
  },[searchParams])

  const handleDelete = async(product:string)=>{
    const name : string = product
    try{    
      const deleteData = await instance.delete("/admin/deleteProduct",{data:{name}})
    }catch(error){
      if (error instanceof AxiosError){
          if(error.status == 401){
          alert("Unable to access This page, login or sign up")
          return navigate("/admin")
          }
          alert(error.response?.data.message)
        }
        else if (error instanceof Error){
          if(error.message === "Network Error"){
            alert("NetWork Error, please try again")
            navigate("/")
        }
      }
    }
  }
  
  return (
    <section className="w-full h-[80vh] md:h-full relative top-16 md:static">
      {products.length > 0 ? (<><ul className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:items-between justify-center md:justify-start md:space-x-4 mb-2 md:pl-2 pt-4">
        {products.map(product=>{
          return(
          <li key={product._id} className="w-[80%] md:w-[45%] shadow-2xl h-[88vh] flex flex-col  items-start md:space-x-2 rounded-lg mb-2">
            <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${product.image}`} alt={product.name} className="w-[100%] h-[55%]  md:object-cover rounded-tl-md rounded-tr-md" loading="lazy"/>
            <section className="ml-2">
              <h1 className="md:text-lg font-semibold w-full">Name: {product.name}</h1>
              <h2 className="md:text-lg font-semibold w-full">Brand: {product.brand}</h2>
              <p className="md:text-lg font-semibold w-full">Description: {product.description}</p>
              <p className="md:text-lg font-semibold w-full">Price: {product.price} ETB</p>
              <p className="md:text-lg font-semibold w-full">Stock: {product.stock}</p>
              <p className="md:text-lg font-semibold w-full text-wrap">Sizes: {product.size.join(",")}</p>
              <p className="md:text-lg font-semibold w-full text-wrap">Colors: {product.color.join(",")}</p>
            </section>
            <section className="w-full flex justify-center items-center gap-2 h-20">
                <button className="bg-orange-500 w-[20%] h-[70%] rounded-lg text-center flex items-center justify-center text-white cursor-pointer" onClick={()=>handleEditPageRoute(product.name)}><FaRegEdit className="ml-2 w-[30%] h-[75%]"/></button>
                <button className="bg-red-600 w-[20%] h-[70%] rounded-lg text-center flex items-center justify-center text-white cursor-pointer" onClick={()=>handleDelete(product.name)}><CiTrash className="w-[25%] h-[90%]"/></button>
              </section>
          </li>)
      })}
      </ul>
      <Pagination totalProducts={totalProducts} id={id}/></>):(<p className="text:lg mt-10 text-center w-full font-bold">Loading...</p>)}
    </section>
    
  )
}

export default Products