import { FormEvent, useState, useEffect } from "react"
import { BiHide,BiShow } from "react-icons/bi"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import instance from "../../api/api.tsx"


const SignupForm = () => {
    const [show, setShow ] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleVisibility = ()=>{
        setShow(!show)
    }

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [ isLogging, setIsLogging]  = useState<boolean>(false)


    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isError, setIsError]  = useState<boolean>(false)

    const handleSignUp = async(e:FormEvent)=>{
      e.preventDefault()
      setIsLogging(true)
      try{
        const signUpRequest  = await instance.post("user/signUp", {firstName, lastName, email, password})
        navigate("/products")
      }catch(error){
        if (error instanceof AxiosError){
          setErrorMessage(error.response?.data.message || "Please Try Again")
          setIsError(true)
        }
         setErrorMessage("Internal Server Error, please try again")
         setIsError(true)
      }
    } 

    useEffect(()=>{
      if(isError){
        const timer = setTimeout(()=>{setIsError(false)},5000)

        return ()=> clearTimeout(timer)
      }
    },[isError])
    
  return (
    <form className="ml-2 w-full md:w-[95%] h-[85%] flex flex-col items-center gap-3" onSubmit={handleSignUp}>
            <label className="w-full text-xl font-bold">FirstName:</label>
            <input type="text" title="firstName"value={firstName} onChange={(e)=> setFirstName(e.target.value)} required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">LastName:</label>
            <input type="text" title="lastName" value={lastName} onChange={(e)=> setLastName(e.target.value)} required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">Email:</label>
            <input type="email" title="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required className="w-[85%] h-10 border-blue-950 border-[1px] outline-none rounded-2xl text-xl pl-4"/>
            <label className="w-full text-xl font-bold">Password:</label>
            <section className="mb-2 w-full flex items-center justify-center">
                <input type={show? "text": "password"} title="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-[75%] h-10  border-blue-950 border-l-[1px] border-t-[1px] border-b-[1px]  outline-none rounded-l-2xl text-xl pl-4"/>
                <button type="button" className='border-blue-950 border-r-[1px] border-t-[1px] border-b-[1px]  w-[10%] text-blue-950  h-10 flex justify-center items-center rounded-r-2xl cursor-pointer' onClick={handleVisibility}>{show? <BiHide className="w-[70%] h-[70%] bg-none font-medium"/> : <BiShow className="w-[70%] h-[70%] bg-none"/>}</button>
            </section>
            {isError?(<p className="text-xl font-semibold text-red-600 w-[85%] text-wrap h-12">{errorMessage}</p>):(<></>)}
            <input type="submit" value={isLogging? "Logging In...":"Login"} title="Login" disabled={isLogging} className={`${isLogging? "bg-slate-600 text-white cursor-not-allowed": ""} bg-blue-950 text-white w-[85%] h-10 rounded-2xl text-xl font-bold cursor-pointer`}/>
        </form>
  )
}

export default SignupForm