import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Navigation from "../components/Navigation"

const Main = () => {
  const [isVisible , setIsVisible] = useState<boolean>(false)

  const handleVisibility = ()=>{
    setIsVisible(!isVisible)
  }
  return (
    <>
      <Header handleVisibility={handleVisibility}/>
      <main className="w-full  md:w-[100%]  flex">
        <Navigation isVisible={isVisible} handleVisibility={handleVisibility}/>
        <section className="w-full md:w-[85%]">
          <Outlet/>
        </section>
      </main>
    </>
  )
}

export default Main