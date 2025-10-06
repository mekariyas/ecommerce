import { useState } from "react"
import { Link } from "react-router-dom"
import { BiCart } from "react-icons/bi"
import kickova from "../../assets/kickova_logo.svg"
import { AxiosError } from "axios"


import Hamburger from "./Hamburger"

import instance from "../../api/api"

import { useTokenStorage } from "../../store/token"


const Navbar = () => {
  const[isVisible, setIsVisible] = useState<boolean>(false)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const token = useTokenStorage((state)=>state.token)

  const clearToken = useTokenStorage((state)=>state.clearToken)
  
  const handleVisibility = ()=> {
    setIsVisible(!isVisible)
  }

  const handleLogout = async()=>{
    setIsLoggingOut(true)
    try{
      const logOut = await instance.get("/user/logOut", {withCredentials: true})
      console.log(logOut)
      if (logOut.status === 200){
        clearToken()
      }
    }catch(error){
      if (error instanceof Error || error instanceof AxiosError){
        console.log(error)
        alert(error.message)
      }
      else{
        alert("Internal server error please Try again")
      }
      clearToken()
    }finally{
      setIsLoggingOut(false)
    }
  }
  return (
    <header
        className='w-full h-20 z-[10] bg-white sticky top-0  flex items-center justify-between shadow-md shadow-slate-200'>
        <section className="ml-2 w-28 h-20 flex items-center justify-center">
            <img src={kickova} alt="Kickova-logo" className="w-full h-16"/>
        </section>
        <nav className={`${!isVisible? "hidden" : ""} flex flex-col md:flex  md:flex-row justify-evenly items-center absolute md:static top-20 w-full h-[30vh] md:h-full bg-white   md:w-[70%] md:ml-40 text-lg md:text-2xl bg-none`}>
            <Link to="/" className="w-full md:w-[20%] text-center">Home</Link>
            <Link to="/products/?page=1&skip=0" className="w-full md:w-[20%] text-center">Products</Link>
            <Link to="/cart" className="w-full md:w-[20%] flex justify-center"><BiCart className="w-12 h-8"/></Link>
            {token? 
              (<button className="w-[80%] md:w-36 rounded-lg shadow-xl cursor-pointer text-white font-bold bg-red-600 shadow-slate-200 pb-2" onClick={handleLogout} disabled={isLoggingOut}>Log out</button>):
              (<>
                <Link to="/signIn" className="w-full md:w-[20%] text-center">Sign in</Link>
                <Link to="/signUp" className="w-full md:w-[20%] text-center">Sign up</Link>
              </>)}
        </nav>
        <Hamburger handleVisibility={handleVisibility}/>
    </header>
  )
}

export default Navbar