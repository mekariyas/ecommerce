import { useState, useEffect } from 'react'
import { AxiosError } from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useTokenStorage } from '../store/token.ts'

import instance from "../api/api.tsx"

import Loading from "../components/Loading.tsx"
import Pagination from "../components/pagination.tsx"


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

  const cloudName = import.meta.env.VITE_CLOUD_NAME

  const navigate = useNavigate() 

  const [searchParams, setSearchParams ] = useSearchParams()

  const [products, setProducts] = useState<products[]>([])
  const [totalProducts, setTotalProducts] = useState<number>(0)
  
  const saveToken = useTokenStorage((state)=>state.saveToken)

  const handleDataFetch = async()=>{
      try{
        const dataFetched = await instance.get(`/user/products/?page=${searchParams.get("page")}&skip=${searchParams.get("skip") ?? 0}`,{withCredentials: true})
        const { products, totalProducts,accessToken } = dataFetched.data
      
        if(accessToken){
          saveToken(accessToken)
        }
        setProducts(products)
        if(totalProducts % 5 === 0){
          setTotalProducts(totalProducts / 5)
        } else{
          setTotalProducts(Math.ceil(totalProducts / 5))
        }
      }catch(error){
        if (error instanceof AxiosError){
          if(error.status === 500){
            alert("Internal Server Error, please Try again")
          }else if (error.status == 404){
            alert("no items found")
          }
        }
        else if (error instanceof Error){
          if(error.message === "Network Error"){
            alert("NetWork Error, please try again")
            
          }
        }
        console.log(error)
        alert(error.message)
        navigate("/")
    } 
  }

  
  const handleOrderFormNavigation = (productName: string)=>{

    navigate(`/addProduct/${productName}`);
  } 

  useEffect(()=>{
    handleDataFetch()
  },[searchParams])

  return (
    <>
    { products.length > 0? 
    (<><section className="w-full">
      <ul className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:items-between justify-center md:justify-start md:space-x-4 mb-2 md:pl-2 pt-4">
        {products.map(product=>{
          return(
            <li key={product._id} className="w-[80%] md:w-[45%] shadow-2xl h-[89vh] flex flex-col  items-start md:space-x-2 rounded-lg mb-2">
              <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${product.image}`} alt={product.name} className="w-[100%] h-[55%] md:object-cover rounded-tl-md rounded-tr-md" loading="lazy"/>
              <section className="ml-2 mt-6 md:mt-0">
                <h1 className="font-semibold w-full">Name: {product.name}</h1>
                <h2 className="font-semibold w-full">Brand: {product.brand}</h2>
                <p className="font-semibold w-full">Description: {product.description}</p>
                <p className="font-semibold w-full">Price: {product.price} ETB</p>
                <p className="font-semibold w-full">Stock: {product.stock}</p>
                <p className="font-semibold w-full">Sizes: {product.size.join(",")}</p>
                <p className="font-semibold w-full">Color: {product.color.join(",")}</p>
              </section>
              <section className="w-full flex justify-center items-center mt-2 md:mt-1">
                <button className="border-2 w-38 h-10 font-semibold text-white bg-blue-600 rounded-md cursor-pointer" onClick={()=>handleOrderFormNavigation(product.name)}>Add To Cart</button>
              </section>
            </li>
          )}
        )}
      </ul>
    </section>
    <Pagination totalProducts={totalProducts}/></>) : (
      <Loading/>
      )}
    </>
)}

export default Products