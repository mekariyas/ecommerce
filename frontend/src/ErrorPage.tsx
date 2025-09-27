import{ useNavigate } from "react-router-dom"

const ErrorPage = ()=>{
    const navigate = useNavigate()
    return(
    <section className="w-full h-[100vh] flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold w-full text-2xl text-center">OOPS...</h1>
        <p className="italic semi-bold text-lg mt-2">Page not found</p>
        <button className="w-[35%] md:w-[25%] h-16 text-lg font-bold bg-red-600 text-white mt-3 rounded-md cursor-pointer" onClick={()=>navigate(-1)}>Go back</button>
    </section>)
}


export default  ErrorPage