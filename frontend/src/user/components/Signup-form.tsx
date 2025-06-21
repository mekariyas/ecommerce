import { useState } from "react"
import { BiHide,BiShow } from "react-icons/bi"


const SignupForm = () => {
    const [show, setShow ] = useState<boolean>(false)

    const handleVisibility = ()=>{
        setShow(!show)
    }

  return (
    <form className="ml-2 w-full md:w-[95%] h-[85%] flex flex-col items-center gap-3">
            <label className="w-full text-xl font-bold">FirstName:</label>
            <input type="text" title="firstName" required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">LastName:</label>
            <input type="text" title="lastName" required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">Email:</label>
            <input type="email" title="Email" required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">Password:</label>
            <section className="mb-2 w-full flex items-center justify-center">
                <input type={show? "text": "password"} title="Password" required className="w-[75%] h-10  border-blue-950 border-l-[1px] border-t-[1px] border-b-[1px]  outline-none rounded-l-2xl text-xl pl-4"/>
                <button type="button" className='border-blue-950 border-r-[1px] border-t-[1px] border-b-[1px]  w-[10%] text-blue-950  h-10 flex justify-center items-center rounded-r-2xl cursor-pointer' onClick={handleVisibility}>{show? <BiHide className="w-[70%] h-[70%] bg-none font-medium"/> : <BiShow className="w-[70%] h-[70%] bg-none"/>}</button>
            </section>
            <input type="submit" value="Login" title="Login" className="bg-blue-950 text-white w-[85%] h-10 rounded-2xl text-xl font-bold cursor-pointer"/>
        </form>
  )
}

export default SignupForm