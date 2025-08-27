import {useEffect} from 'react'
import {useOrderStore} from "../store/cart.ts"


const Cart = () => {
  const Orders = useOrderStore((state)=>state.orders)

  useEffect(()=>{
    console.log(Orders);
  },[])
  return (
    <div>Cart</div>
  )
}

export default Cart