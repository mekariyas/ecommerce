import { useState,FormEvent } from "react"
import { useNavigate, useParams} from "react-router-dom"
import kickova from "../../assets/kickova_logo.svg"
import { BiSearch } from "react-icons/bi"
import { MdCancel } from "react-icons/md";

interface state{
  handleVisibility : ()=> void
}


const Header = ({...props}: state) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [productName, setProductName] = useState<string>("")
  const { id } = useParams()
  const navigate = useNavigate()
  const handleProductFetch= (e:FormEvent)=>{
    e.preventDefault()
    navigate(`/dashboard/${id}/product/?name=${productName}`)
  }

  return (
    <header className="w-full h-16 flex justify-between bg-white md:justify-start items-center gap-14 fixed  top-0 z-[10] ">
        <section className="h-full w-[35%] md:w-[20%] flex justify-start items-center pl-2">
            <img src={kickova} alt="logo" className="h-[80%] w-[85%] md:w-[70%]"/>
        </section>
        <section className={`md:w-[50%] w-[100%] h-[30vh] ${isVisible?"sm:flex sm:flex-col absolute z-[4] top-1  bg-slate-200 rounded-md":"hidden"} md:static md:h-full md:flex md:flex-col items-center justify-around`}>
          <section className="w-full  h-[20%] md:hidden">
            <button className="h-full float-right cursor-pointer" type="button" onClick={()=>setIsVisible(false)}><MdCancel className="w-full h-full"/></button>
          </section>
            <form className="w-full mb-2 mt-4 md:mt-0 md:mb-0 md:w-[80%] h-[35%] md:h-[65%] flex items-center" onSubmit={handleProductFetch}>
              <input type="search" placeholder="Search for product" value={productName} onChange={(e)=>setProductName(e.target.value)} required className="border-l-[1px] border-t-[1px] border-b-[1px] border-l-blue-950 border-t-blue-950 border-b-blue-950 outline-none h-full w-[90%] pl-2 text-xl rounded-tl-sm rounded-bl-sm"/>
              <button type="submit" className="h-full w-[10%] rounded-tr-sm rounded-br-sm border-t-[1px] border-r-[1px] border-b-[1px] border-blue-950 cursor-pointer"><BiSearch className="w-full h-full"/></button>
            </form>
        </section>
        <section className="flex justify-end w-[30%] md:hidden">
            <button className="h-10 w-12 cursor-pointer mr-1" onClick={()=>setIsVisible(true)}><BiSearch className="w-full h-full"/></button>
            <button className="h-10 w-12  flex flex-col justify-around items-center  cursor-pointer" onClick={props.handleVisibility}>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
           </button>
        </section>
    </header>
  )
}

export default Header