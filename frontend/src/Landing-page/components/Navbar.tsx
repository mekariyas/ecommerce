import { useState } from "react"
import { Link } from "react-router-dom"
import { BiCart } from "react-icons/bi"
import kickova from "../../assets/kickova_logo.svg"
import { AxiosError } from "axios"

import Hamburger from "./Hamburger"
import instance from "../../api/api"
import { useTokenStorage } from "../../store/token"

const Navbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const token = useTokenStorage((state) => state.token)
  const clearToken = useTokenStorage((state) => state.clearToken)

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const logOut = await instance.get("/user/logOut", { withCredentials: true })
      console.log(logOut)
      if (logOut.status === 200) {
        clearToken()
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        console.log(error)
        alert(error.message)
      } else {
        alert("Internal server error please Try again")
      }
      clearToken()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header
      className="w-full h-20 z-[10] sticky top-0 flex items-center justify-between
        bg-white/10 backdrop-blur-xl
        border-b border-white/15
        shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
    >
      <section className="ml-2 w-28 h-20 flex items-center justify-center">
        <img src={kickova} alt="Kickova-logo" className="w-full h-16" />
      </section>

      <nav
        className={`${!isVisible ? "hidden" : ""} flex flex-col md:flex md:flex-row
          justify-evenly items-center
          absolute md:static top-20 w-full h-[45vh] md:h-full
          text-white md:text-black bg-white/10 backdrop-blur-xl
        border-b border-white/15 backdrop-blur-xl md:backdrop-blur-none
          md:bg-transparent
          md:w-[70%] md:ml-40
          text-lg md:text-base`}
      >
        <Link
          to="/"
          className="w-full md:w-auto text-center px-4 py-1.5 rounded-lg
            hover:bg-white/10 transition-colors duration-200"
        >
          Home
        </Link>

        <Link
          to="/products/?page=1&skip=0"
          className="w-full md:w-auto text-center px-4 py-1.5 rounded-lg
            hover:bg-white/10 transition-colors duration-200"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="w-full md:w-auto flex justify-center px-4 py-1.5 rounded-lg
            hover:bg-white/10 transition-colors duration-200"
        >
          <BiCart className="w-12 h-8" />
        </Link>

        {token ? (
          <button
            className="w-[80%] md:w-36 rounded-lg cursor-pointer font-medium
              bg-red-500/20 border border-red-400/40 text-red-300
              hover:bg-red-500/30 transition-colors duration-200 py-1.5
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        ) : (
          <>
            <Link
              to="/signIn"
              className="w-full md:w-auto text-center px-4 py-1.5 rounded-lg
                hover:bg-white/10 transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/signUp"
              className="w-full md:w-auto text-center px-4 py-1.5 rounded-lg
                hover:bg-white/10 transition-colors duration-200"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>

      <Hamburger handleVisibility={handleVisibility} />
    </header>
  )
}

export default Navbar