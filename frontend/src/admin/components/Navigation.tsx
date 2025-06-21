import { FaX } from "react-icons/fa6"

interface state{
  isVisible: boolean,
  handleVisibility: ()=> void
}


const Navigation = ({...props}: state) => {
  
  return (
    <aside className={`${props.isVisible? "sm:flex" :"hidden"} flex-col items-center md:flex absolute z-[12] top-0 font-medium right-0 md:static w-[60%] h-[100vh] md:w-[15%] md:h-[90vh]  pt-4 text-lg md:text-xl border-[1px] border-black  bg-slate-950 text-white`}>
        <button className="border-[1px] border-white w-[100%] md:w-[70%] h-14  grid place-items-center rounded-sm  md:hidden cursor-pointer" onClick={props.handleVisibility}><FaX/></button>
        <button className="mt-2 mb-2 w-[100%] md:w-[70%] h-10 border-[1px] border-white rounded-sm cursor-pointer">Home</button>
        <button className="mt-2 mb-2 w-[100%] md:w-[70%] min-h-10 border-[1px] border-white rounded-sm cursor-pointer">Add Product</button>
        <button className="mt-2 mb-2 w-[100%] md:w-[70%] h-10 border-[1px] border-white rounded-sm cursor-pointer">Products</button>
        <button className="mt-2 mb-2 w-[100%] md:w-[70%] h-10 border-[1px] border-white rounded-sm cursor-pointer">Orders</button>
        <button className="mt-2 mb-2 w-[100%] md:w-[70%] h-10 border-[1px] border-white rounded-sm cursor-pointer">Logout</button>
    </aside>
  )
}

export default Navigation