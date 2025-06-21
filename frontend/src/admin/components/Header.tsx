import kickova from "../../assets/kickova_logo.svg"
import { BiSearch } from "react-icons/bi"


interface state{
  handleVisibility : ()=> void
}

const Header = ({...props}: state) => {
  return (
    <header className="w-full h-16 flex justify-between md:justify-start items-center gap-14 fixed top-0 z-[10] md:static">
        <section className="h-full w-[35%] md:w-[20%] flex justify-start items-center pl-2">
            <img src={kickova} alt="logo" className="h-[80%] w-[85%] md:w-[70%]"/>
        </section>
        <section className="w-[50%] hidden h-full md:flex items-center justify-around">
            <form className="w-[80%] h-[65%] flex items-center">
              <input type="search" placeholder="Search for product" required className="border-l-[1px] border-t-[1px] border-b-[1px] border-l-blue-950 border-t-blue-950 border-b-blue-950 outline-none h-full w-[90%] pl-2 text-xl rounded-tl-sm rounded-bl-sm"/>
              <button type="submit" className="h-full w-[10%] rounded-tr-sm rounded-br-sm border-t-[1px] border-r-[1px] border-b-[1px] border-blue-950 cursor-pointer"><BiSearch className="w-full h-full"/></button>
            </form>
        </section>
        <section className="flex w-[30%] md:hidden justify-between">
            <button className="h-10 w-12 cursor-pointer"><BiSearch className="w-full h-full"/></button>
            <button className="h-10 w-12  flex flex-col justify-around items-center mr-2 cursor-pointer" onClick={props.handleVisibility}>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
                <section className={`w-[80%] h-[2px] bg-black`}></section>
           </button>
        </section>
    </header>
  )
}

export default Header