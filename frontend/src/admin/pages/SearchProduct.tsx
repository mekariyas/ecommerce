import { useState,useEffect } from 'react'
import { AxiosError } from "axios"
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import instance from "../../api/api"
import { useAdminTokenStorage }  from "../../store/adminToken"

import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

import ErrorComponent from "../components/ErrorComponent"

interface product{
  name: string,
  brand:string,
  image: string,
  price: number,
  color: string[],
  size: string[],
  stock: number,
  description: string
}

const SearchProduct = () => {

  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const navigate = useNavigate()
  const {id} = useParams()

  const [ searchParams, setSearchParams] = useSearchParams()

  const [productData, setProductData] = useState<product>({name:"", brand:"",image:"", price:0, color:[], size:[], stock:0, description:""})
  const [errorState, setErrorState] = useState<string>("")
  const [ isError, setIsError ] = useState<boolean>(false)
  
  const token = useAdminTokenStorage((state)=>state.token)
  const saveToken = useAdminTokenStorage((state)=>state.saveToken)
  
  const handleProductFetch = async()=>{
    try{
      const product = await instance.get(`admin/getProduct/${searchParams.get("name")}`, {headers:{
        Authorization: `bearer ${token}`
      },withCredentials:true})
      const {item, accessToken } = product.data
      saveToken(accessToken)
      console.log(item.color)
      setProductData({...productData,name:item.name,brand:item.brand, image:item.image,price:item.price,size:item.size,color: item.color,stock:item.stock, description:item.description})
    }catch(error){
      if(error instanceof AxiosError){
        if(error.status == 401){
          alert("Unable to access This page, login or sign up")
          return navigate("/admin")
          }
          alert(error.response?.data.message)
      }

      else if(error instanceof Error){
        alert(error.message)
      }
    }
  }
  const handleEditPageRoute = (param:string)=>{
      navigate(`/dashboard/${id}/${param}`)
    }
  
  const handleDelete = async(product:string)=>{
      try{    
        const deleteData = await instance.delete("/admin/deleteProduct",{name:product})
      }catch(error){
        if (error instanceof AxiosError){
            if (error.status == 401){
              alert(error.response?.data.message)
              navigate("/admin")
            }
            setIsError(true)
            setErrorState(error.response?.data.message)
          }
          else if (error instanceof Error){
            if(error.message === "Network Error"){
              alert("NetWork Error, please try again")
          }
        }
      }
    }  

  useEffect(()=>{
      handleProductFetch()
  },[])

  return (
    <section className="w-full flex justify-center items-center h-[80vh] md:h-full relative top-16 md:static">
      {isError ?(<ErrorComponent errorMessage={errorState}/>):
      (<section className="w-full mt-16 md:w-[80%] md:mt-0  md:h-[80%] rounded-md flex flex-col md:flex-row justify-around items-center">
        <section className="w-[45%] h-[90%]  rounded-md">
          <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${productData.image}`} 
          alt={productData.name}
          className="w-full h-full object-contain rounded-md"/>
        </section>
        <section className="w-[45%] h-[90%] pt-12 p-2">
          <p className="md:text-lg">Name: {productData.name}</p>
          <p className="md:text-lg">Brand: {productData.brand}</p>
          <p className="md:text-lg text-wrap">Description: {productData.description}</p>
          <p className="md:text-lg">Price: {productData.price} ETB</p>
          <p className="md:text-lg text-wrap">Size: {productData.size.join(",")}</p>
          <p className="md:text-lg text-wrap">Color: {productData.color.join(",")}</p>
          <section className="w-full mt-3 flex flex-col justify-around items-center gap-4">
            <button className="bg-orange-500 w-[100%] h-12 rounded-md text-center flex items-center justify-center text-white cursor-pointer" onClick={()=>handleEditPageRoute(productData.name)}><FaRegEdit className="ml-2 w-[30%] h-[50%]"/></button>
            <button className="bg-red-600 w-[100%] rounded-md h-12 text-center flex items-center justify-center text-white cursor-pointer" onClick={()=>handleDelete(productData.name)}><CiTrash className="w-[25%] h-[90%]"/></button>
        </section>
        </section>
      </section>)}
    </section>
  )
}

export default SearchProduct