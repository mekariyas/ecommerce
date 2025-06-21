import { useState } from "react"
import { Link } from "react-router-dom"
import { BiCart } from "react-icons/bi"
import kickova from "../../assets/kickova_logo.svg"
import Hamburger from "./Hamburger"

const Navbar = () => {
  const[isVisible, setIsVisible] = useState<boolean>(false)

  const handleVisibility = ()=> {
    setIsVisible(!isVisible)
  }
  return (
    <header
        className='w-full h-20 z-[10] bg-white sticky top-0 flex items-center justify-between'>
        <section className="ml-2 w-28 h-20 flex items-center justify-center">
            <img src={kickova} alt="Kickova-logo" className="w-full h-16"/>
        </section>
        <nav className={`${isVisible? "hidden":""} flex flex-col md:flex  md:flex-row justify-evenly items-center absolute md:static top-20 w-full h-[30vh] md:h-full bg-white   md:w-[70%] md:ml-40 text-lg md:text-2xl bg-none`}>
            <Link to="/" className="w-full text-center">Home</Link>
            <Link to="/products" className="w-full text-center">Products</Link>
            <Link to="/cart" className="w-full flex justify-center"><BiCart className="w-12 h-12"/></Link>
            <Link to="/signIn" className="w-full text-center">Sign in</Link>
            <Link to="/signUp" className="w-full text-center">Sign up</Link>
        </nav>
        <Hamburger handleVisibility={handleVisibility}/>
    </header>
  )
}

export default Navbar