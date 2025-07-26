import { useState, useEffect } from 'react'
import instance from "../api/api.tsx"

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

  const [products, setProducts] = useState<products[]>([])
  const handleDataFetch = async()=>{
      try{
        const dataFetched = await instance.get("/admin/getProducts")
        const { products } = dataFetched.data
        setProducts(products)
      }catch(error){
        console.log(error)
    } 
  }
  useEffect(()=>{
    handleDataFetch()
  },[])

  return (
    <section className="w-full h-[87.5vh]">
      <ul className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:items-between justify-center md:justify-start md:space-x-4 mb-2 md:pl-2 pt-4">
        {products.map(product=>{
          return(
            <li key={product._id} className="w-[80%] md:w-[45%] border-[0.5px] h-[88vh] flex flex-col  items-start md:space-x-2 rounded-lg mb-2">
              <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${product.image}`} alt={product.name} className="w-[100%] h-[55%] md:object-cover rounded-tl-md rounded-tr-md" loading="lazy"/>
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
              <section className="w-full flex justify-center items-center mt-1">
                <button className="border-2 w-38 h-12 font-semibold text-white bg-blue-600 rounded-md cursor-pointer">Add To Cart</button>
              </section>
            </li>
          )}
        )}
      </ul>
    </section>
  )
}

export default Products