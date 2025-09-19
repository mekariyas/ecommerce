import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import instance from "../../api/api"


type Order = {
    amount:number,
    color: string[],
    image: string,
    name: string,
    price : number,
    size: string[]
}

interface OrderInfo{
    OrderList:Order[],
    address:{
        city:string,
        houseNumber: string,
        phoneNumber: string,
        streetNumber: string,
        subCity: string,
    },
    user:{
            email:string,
            fName:string,
            lName:string
    },
    status: string,
    totalPrice: number,
}



const Order = () => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME
    const { orderId }  = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [orderInfo, setOrderInfo] = useState<OrderInfo>({
        OrderList:[],
        address:{
            city:"",
            houseNumber: "",
            phoneNumber: "",
            streetNumber: "",
            subCity: "",
        },
        user:{
            email: "",
            fName: "",
            lName: ""
        },
        status: "",
        totalPrice:0
    })

    const handleOrderFetch = async()=>{
        setIsLoading(true)
        try{
            const orderData = await instance.get(`/admin/order/${orderId}`, {withCredentials: true})
            const {order} = orderData.data

            setOrderInfo({...orderInfo, OrderList:[...order.OrderList],address:{...order.address},user:{...order.user}, status: order.status,totalPrice: order.totalPrice})
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        handleOrderFetch()
    },[])
    return (
        <section className="flex flex-col gap-3 mt-2">
            {isLoading? (<p className="w-full mt-10 text-center text-xl">Loading...</p>):
            (<>
                <section className="border-b-[1px] md:ml-2 md:mr-2 w-full md:w-[95%] pl-2 md:border-[1px] border-slate-200 rounded-md shadow-md">
                    <h1 className="text-lg md:text-2xl font-semibold">Order</h1>
                    <p className="md:text-lg mt-2">Status:<span className={`ml-2 font-semibold ${orderInfo.status==="Pending"? "text-red-400" : "text-green-400"}`}>{orderInfo.status}</span></p>
                </section>

                <section className="md:ml-2 md:mr-2 md:w-[95%] pl-2 border-[0.5px] border-slate-200 rounded-md shadow-md">
                    <h1 className="text-lg md:text-2xl font-semibold mt-2 mb-6">Items</h1>
                    <ul className="w-full md:w-[95%] flex  flex-col gap-4 pb-2">
                        {orderInfo.OrderList.map((order,i)=>{
                            return(
                            <li key={i} className="flex gap-10">
                                <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${order.image}`} alt={order.name} className="w-50 h-32 rounded-md"/>
                                <section>
                                    <p className="md:text-lg">Name: {order.name}</p>
                                    <p className="md:text-lg">Amount: {order.amount}</p>
                                    <p className="md:text-lg">Price: {order.price} ETB</p>
                                    <p className="md:text-lg">Color: {order.color.length === 1? order.color[0] : order.color.join(",") }</p>
                                    <p className="md:text-lg">Size: {order.size.length ===1? order.size[0]: order.size.join(",")}</p>
                                </section>
                            </li>)
                        })}       
                    </ul>
                    <p className="text-lg  w-full text-right pr-2 mb-3">Total: <span className="font-semibold">{orderInfo.totalPrice} ETB</span></p>
                </section>
                <section className="md:ml-2 md:mr-2 md:w-[95%] pl-2 border-[0.5px] border-slate-200 rounded-md shadow-md">
                    <h1 className="text-2xl font-semibold">Address Information</h1>
                    <p className="md:text-lg mt-2">Name: {orderInfo.user.fName} {orderInfo.user.lName}</p>
                    <p className="md:text-lg mt-2">Email: {orderInfo.user.email}</p>
                    <p className="md:text-lg mt-2">City: {orderInfo.address.city}</p>
                    <p className="md:text-lg mt-2">Sub-City: {orderInfo.address.subCity}</p>
                    <p className="md:text-lg mt-2">Street-Number: {orderInfo.address.streetNumber}</p>
                    <p className="md:text-lg mt-2">House-Number: {orderInfo.address.houseNumber}</p>
                    <p className="md:text-lg mt-2">Phone number: {orderInfo.address.phoneNumber}</p>
                </section>
                <section className="md:ml-2 md:mr-2 md:w-[95%] pl-2 border-[0.5px] border-slate-200 rounded-md shadow-md mb-4 flex justify-center items-center">
                    <button className="w-[50%] h-14 border-2 bg-gray-700 text-white text-lg font-semibold rounded-lg cursor-pointer mt-2 mb-2" 
                    onClick={()=>navigate(-1)}>Go back</button>
                </section>
            </>)}
        </section>
    )
}


export default Order