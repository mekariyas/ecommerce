import { useState,useEffect, FormEvent }from 'react'
import { useNavigate, useParams} from "react-router-dom";

import instance from "../api/api.tsx"
import { useOrderStore } from '../store/cart.ts';

interface product{
  _id: string,
  name:string,
  brand: string,
  stock: number,
  size: string[],
  price: number,
  color: string[],
  image: string
}


const OrderForm = () => {

  const {name} = useParams();
  const navigate  = useNavigate();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const [productData, setProductData] = useState<product>({_id:"",name:"", brand:"", stock:0, size:[],price:0, color:[], image:""})

  const [amount, setAmount] = useState<number>(1)

  const [size, setSize] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const addToCart = useOrderStore((state)=>state.addToCart)  
  const handleProductFetch = async()=>{
    try{
      const product = await instance(`/user/product/${name}`);
      const item = product.data.item
      setProductData({
        _id:item._id,
        name: item.name,
        brand: item.brand,
        stock: item.stock,
        size: item.size,
        price: item.price,
        color: item.color,
        image: item.image
      });      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    handleProductFetch()
  },[])

  

  const handleOrderSubmission = (e: FormEvent,_id:string, name:string, brand:string, amount:number,price:number, size: string,color:string, image:string )=>{
    e.preventDefault()
    addToCart({_id,name,brand,amount,price, size,color: color? color : productData.color[0],image})
    alert("Added to Cart");
    navigate(-1);
  }
  return (
    <section className="w-full flex md:flex-row flex-col justify-around items-start">
      { productData.brand ?(<><img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${productData.image}`} alt={productData.name} className="mt-18 ml-10 md:ml-0 mb-10 md:mb-0 rounded-md"/>
      
      <form className="w-[100%] md:w-[40%] flex flex-col text-base md:text-lg pl-4 gap-4" onSubmit={(e)=>handleOrderSubmission(e,productData._id,productData.name,productData.brand,amount, productData.price * amount,size,color,productData.image)}>
        <label className="w-full h-10">Name:</label>
        <input type="text" name="name" value={name} readOnly disabled className="w-[93%] md:w-[85%] h-12 border-2 border-gray-200 pl-2 rounded-md cursor-not-allowed"/>
        <label className="w-full h-10">Brand:</label>
        <input type="text" name="Brand" value={productData.brand} readOnly disabled className="w-[93%] md:w-[85%] h-12 border-2 border-gray-200 pl-2 rounded-md cursor-not-allowed"/>
        <label className="w-full h-10">Amount:</label>
        <input type="number" name="Amount" min="1" max={productData.stock} value={amount} onChange={(e)=>setAmount(parseInt(e.target.value))} className="w-[93%] md:w-[85%] h-12 border-[1px] pl-2 rounded-md"/>
        <label className="w-full h-10">Color:</label>
        <select value={color} onChange={(e)=>setColor(e.target.value)} className="w-[93%] md:w-[85%] h-12 border-[1px] pl-2 rounded-md">
          {productData.color.map((prodColor,i)=>{
            return(<option key={i} value={prodColor}>{prodColor}</option>)
          })}
        </select>
        <label className="w-full h-10">Price:</label>
        <input type="number" name="name" value={productData.price}  readOnly disabled className="w-[93%] md:w-[85%] h-12 border-2 border-gray-200 pl-2 rounded-md cursor-not-allowed"/>
        <label  className="w-full h-10">Size: {productData.size.join(",")}</label>
        <input type="text" value={size} onChange={(e)=>setSize(e.target.value)} required className="w-[93%] md:w-[85%] h-12 border-[1px] pl-2 rounded-md"/>
        <input type="submit" className="w-[93%] md:w-[85.5%]  h-12  rounded-md cursor-pointer bg-slate-600  text-white font-bold mb-1"/>
        <button type="button" className="w-[93%] md:w-[85.5%]  h-12 rounded-md cursor-pointer bg-red-600  text-white font-bold mb-1" onClick={()=>navigate(-1)}>Cancel</button>
      </form></>):(<p className="text:lg mt-10 text-center w-full font-bold">Loading...</p>)
      }
    </section>
  )
}

export default OrderForm