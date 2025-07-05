import { useState, useEffect, FormEvent} from "react"
import { AxiosError } from "axios"
import { useNavigate } from 'react-router-dom'

import instance from "../../api/api.tsx"
import { BiHide,BiShow } from "react-icons/bi"



const LoginForm = () => {
  const [show, setShow ] = useState<boolean>(false)

  const handleVisibility = ()=>{
    setShow(!show)
  }

  const[email, setEmail ] =  useState<string>("");
  const[password, setPassword ] =  useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess ] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate() 

  const handleSubmit = async( e:FormEvent )=>{
    setIsLoading(true)
    e.preventDefault()
    try{
      const sendData = await instance.post("/admin/adminLogin",{email, password})
      console.log(sendData)
      const { id } = await sendData.data
      navigate(`/dashboard/${id}`)
      setIsLoading(false)
    }
    catch(error){
     if (error instanceof AxiosError){
      setErrorMessage(error.response?.data.message || "Please Try Again")
      setIsSuccess(false)
    }
    else if(error instanceof Error){
      setErrorMessage("Internal Server Error, please try again")
      setIsSuccess(false)
    }
    }
  }

  useEffect(()=>{
    if(!isSuccess || isLoading){
     const timer =  setTimeout(()=>{
      setIsLoading(false)
      setIsSuccess(true)
      },3000)

      return ()=> clearTimeout(timer)
    }
  },[isSuccess, isLoading])

  return (
    <form className="ml-2 w-full md:w-[95%] h-[80%] flex flex-col items-center gap-3" onSubmit={handleSubmit}>
        <label className="w-full text-xl font-bold">Email:</label>
        <input type="email" title="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
        <label className="w-full text-xl font-bold">Password:</label>
        <section className="mb-2 w-full flex items-center justify-center">
            <input type={show? "text": "password"} title="Password" value={password} required onChange={(e)=>setPassword(e.target.value)} className="w-[75%] h-10  border-blue-950 border-l-[1px] border-t-[1px] border-b-[1px]  outline-none rounded-l-2xl text-xl pl-4"/>
            <button type="button" className='border-blue-950 border-r-[1px] border-t-[1px] border-b-[1px]  w-[10%] text-blue-950  h-10 flex justify-center items-center rounded-r-2xl cursor-pointer' onClick={handleVisibility}>{show? <BiHide className="w-[70%] h-[70%] bg-none font-medium"/> : <BiShow className="w-[70%] h-[70%] bg-none"/>}</button>
        </section>
        {!isSuccess?(<p className="text-xl font-semibold text-red-600 w-[85%] text-wrap h-12">{errorMessage}</p>):(<></>)}
        <input type="submit" value={isLoading? "Please Wait...": "Login"} title="Login" className={`bg-blue-950 text-white w-[85%] h-10 rounded-2xl text-xl font-bold cursor-pointer ${isLoading? "bg-slate-600 text-white cursor-not-allowed": ""}`} disabled={isLoading}/>
    </form>
  )
}

export default LoginForm