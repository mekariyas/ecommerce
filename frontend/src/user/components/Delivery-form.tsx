import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { AxiosError } from "axios";
import { MdOutlineCancel } from "react-icons/md";
import instance from "../../api/api"

import { useOrderStore } from '../../store/cart';

interface deliveryInfo{
    city: string,
    subCity: string,
    streetName:string,
    houseNumber: string,
    phoneNumber: string
}

const DeliveryForm = ({...props}: {setIsAddressFormVisible:(val:boolean)=>void}) => {
    const [formData, setFormData] = useState<deliveryInfo>({city:"",subCity:"", streetName:"",houseNumber: "", phoneNumber:""})
    const Orders = useOrderStore((state)=>state.orders)
    const clearCart = useOrderStore((state)=>state.clearCart)
    const navigate = useNavigate() 
    const handleFormVisibility=()=>{
        props.setIsAddressFormVisible(false)
    }
const handleSubmission = async( e: FormEvent )=>{
    e.preventDefault()
    try{
        const order  = await instance.post(`/user/placeOrder`,{order:Orders, address:formData},{withCredentials:true})
            alert("Order has been placed")
            clearCart()
            props.setIsAddressFormVisible(false)
            
    }catch(error){
        if (error instanceof AxiosError){
        if (error.status === 401 || error.status === 404 ||error.status === 404){
          alert("Please login or signUp")
          navigate(-1)
        }
        else if(error.status === 500){
          alert("Internal Server Error")
          navigate(-1)
        }
      }
      else if(error instanceof Error){
        alert("Error occurred Please try again")
        navigate(-1)
      }
    }
}
  return (
    <section className="sticky z-[5] top-16 flex flex-col items-center w-[100%] bg-white">
        <section className="w-[100%] h-[20vh] flex justify-end items-start pr-4 pt-6">
            <button onClick={handleFormVisibility} className="cursor-pointer h-20 w-20 flex items-center justify-center rounded-lg text-4xl bg-red-600 text-white"><MdOutlineCancel /> </button>
        </section>
        <form className="flex flex-col pt-6 w-[100%] md:w-[50%] h-[70vh] md:h-[70vh] text-lg" onSubmit={handleSubmission}>
            <label>City:</label>
            <input type="text" placeholder="E.g:- Addis Ababa" className="w-[80%] border-2 border-slate-200 outline-none pl-2 ml-8 h-10 rounded-sm" value={formData.city} onChange={(e)=>setFormData({...formData,city:e.target.value})} required/>
            <label>Sub-city:</label>
            <input type="text" placeholder="E.g:- Arada" className="w-[80%] border-2 border-slate-200 outline-none pl-2 ml-8 h-10 rounded-sm" value={formData.subCity} onChange={(e)=>setFormData({...formData,subCity:e.target.value})} required/>
            <label>Street Name:</label>
            <input type="text" placeholder="E.g:- Queen Elizabeth Street" className="w-[80%] border-2 border-slate-200 outline-none pl-2 ml-8 h-10 rounded-sm" value={formData.streetName} onChange={(e)=>setFormData({...formData,streetName:e.target.value})} required/>
            <label>House Number:</label>
            <input type="text" placeholder="E.g:- 251 or 5/120" className="w-[80%] border-2 border-slate-200 outline-none pl-2 ml-8 h-10 rounded-sm" value={formData.houseNumber} onChange={(e)=>setFormData({...formData,houseNumber:e.target.value})} required/>
            <label>Phone Number:</label>
            <input type="text" placeholder="E.g:- 011-4-23-45-67 or +251-9-11-12-13-14" className="w-[80%] border-2 border-slate-200 outline-none pl-2 ml-8 h-10 rounded-sm" value={formData.phoneNumber} onChange={(e)=>setFormData({...formData,phoneNumber: e.target.value})}required/>
            <input type="submit" className="border-2 outline-none h-14 mt-2 mb-2 md:ml-4 w-full md:w-[85%] rounded-md font-bold bg-slate-600 text-white cursor-pointer"/>
        </form>
    </section>
  )
}

export default DeliveryForm