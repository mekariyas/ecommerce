import {useEffect , useState} from "react"
import { useParams,useNavigate } from "react-router-dom"
import OrderPagination from "../components/OrderPagination"

import instance from "../../api/api"


interface Orders{
  _id: string,
  email: string,
  fName: string,
  lName: string,
  totalPrice: number,
  address:{
    city: string,
    subCity: string,
    streetName: string,
    houseNumber: string,
    phoneNumber: string
  },
  status: string
}

const Orders = () => {
  const {id} = useParams()
  const [allOrders, setAllOrders] = useState<Orders[]>([])
  const [totalOrders, setTotalOrders] = useState<number>(0)
  const navigate = useNavigate()
  const handleOrderFetch = async()=>{
    try{
    const getOrders = await instance.get(`/admin/orders`, {withCredentials:true})
    const {orders, totalOrders} = getOrders.data
    setTotalOrders(totalOrders)
    
    for(const order of orders){
      console.log(order)
      setAllOrders(prev=>[...prev,{_id:order._id, email:order.user.email, fName: order.user.fName, lName: order.user.lName, address:order.address, totalPrice: order.totalPrice, status:order.status}])
    }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    handleOrderFetch()  
  },[])
  return (
    <section className="w-full relative top-16 md:static">
      <ul className="w-full pl-4 pt-2 flex justify-start flex-wrap gap-6">
        {allOrders.map(order=>{
          return<li key={order._id} className="w-[100%] md:w-[35%] h-[52vh] shadow-lg shadow-black rounded-md pt-2 pl-2">
          <p className="text-base md:text-lg">Name: {order.fName} {order.lName}</p>
          <p className="text-base md:text-lg">Email: {order.email}</p>
          <p className="text-base md:text-lg">City: {order.address.city}</p>
          <p className="text-base md:text-lg">Sub-city: {order.address.subCity}</p>
          <p className="text-base md:text-lg">Street-Name: {order.address.streetName}</p>
          <p className="text-base md:text-lg">Total: {order.totalPrice}ETB</p>
          <p className="text-base md:text-lg">Status: {order.status}</p>
          <section className="w-full h-20 flex justify-center items-center">
            <button className="cursor-pointer rounded-md bg-slate-950 text-white text-lg font-semibold w-[30%] h-[60%] active:border-inset-2 active:border-white" onClick={()=>navigate(`/dashboard/${id}/order/${order._id}`)}>View Info</button>
          </section>
          </li>
        })}
      </ul>  
      {totalOrders > 5 && <OrderPagination/>}
    </section>
  )
}

export default Orders