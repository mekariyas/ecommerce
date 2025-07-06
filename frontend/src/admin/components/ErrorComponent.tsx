import {useNavigate} from "react-router-dom"

interface errorState{
    errorMessage: string
}

const ErrorComponent = ({...props}:errorState) => {
    const navigate = useNavigate()
  return (
    <section className="w-full h-[87.6vh] mt-18 md:mt-0 md:h-full md:static flex flex-col justify-center items-center gap-5">
    <p className="text-xl text-red-500 font-bold">{props.errorMessage ?  props.errorMessage :"Error Please Try Again"}</p>
    <button onClick={()=> navigate(-1)} className=' border-2 w-40 h-14 font-semibold bg-red-500 text-white rounded-md cursor-pointer'>Go back</button>
    </section>
  )
}

export default ErrorComponent