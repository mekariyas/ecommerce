import {useEffect, useState} from 'react'
import {useOrderStore} from "../store/cart.ts"
import { FaTrash } from 'react-icons/fa6' 

import DeliveryForm from "./components/Delivery-form.tsx"

interface product{
  amount: number,
  brand: string,
  image: string,
  name: string,
  price: number,
  size: string,
  color: string
  _id: string,
}


const Cart = () => {

  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const Orders = useOrderStore((state)=>state.orders);
  const deleteItem = useOrderStore((state)=> state.deleteItem);
  const clearCart = useOrderStore((state)=> state.clearCart)
  const [items, setItems] = useState<product[]>([...Orders])

  const [isAddressFormVisible, setIsAddressFormVisible] = useState<boolean>(false)
  const handleClearCart= ()=>{
    clearCart()
    setItems([...Orders])
  }

  useEffect(()=>{
    setItems([...Orders])
  },[Orders])
  return (
    <section className="w-full mt-1 flex flex-col items-center">
      {items.length === 0? (<p className="text:lg mt-10 text-center w-full font-bold">Cart is empty</p>):(
        <>
        {isAddressFormVisible && (<DeliveryForm setIsAddressFormVisible={setIsAddressFormVisible}/>)}
        <ul className="w-[100%] mt-3 md:w-[70%] flex flex-col">
         {items.map(item=>{
          return<li key={item._id} className="flex flex-col items-center md:flex-row md:justify-between pt-4 pl-4 pr-4 h-[70vh]">
            <section className="w-[80%] md:w-[50%] ">
              <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${item.image}`} alt={item.name} className="w-[100%] h-[80%]  md:object-cover rounded-md" loading="lazy"/>
            </section>
            <section className="w-[80%] md:w-[45%] h-[62.2%] flex flex-col pl-4 pt-2">
                <p>Name: {item.name}</p>
                <p>Price: {item.price} ETB</p>
                <p>Amount: {item.amount}</p>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <button onClick={()=>{deleteItem(item._id)}} className="w-[90%] h-10 mt-8 rounded-md bg-red-600 flex  items-center justify-center text-white font-bold cursor-pointer"><FaTrash/></button>
            </section>
          </li>
         })}
        </ul>
        <p className="w-[70%] md:w-[68%] text-lg font-bold mt-16 md:mt-2">Total: {items.reduce((prev,curr)=>{
          return prev + curr.price
        },0)} ETB</p>
        <button className="mt-3 mb-3 w-[82%] md:w-[38%] h-14 bg-slate-600 rounded-md font-bold text-lg text-white cursor-pointer" onClick={()=>setIsAddressFormVisible(true)}>Check Out</button>
        <button onClick={handleClearCart} className="mb-2 w-[82%] md:w-[38%] h-14 bg-red-600 rounded-md font-bold text-lg text-white cursor-pointer" >Clear Cart</button>
        </>)}
    </section>
  )
}

export default Cart