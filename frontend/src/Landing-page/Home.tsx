import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.tsx"
import Footer from "../components/Footer.tsx"
const Home = () => {
  return (
    <>
    <Navbar/>
      <main className="flex flex-col justify-around items-center relative ">
        <Outlet/>
      </main>
    <Footer/>
    </>
  )
}

export default Home