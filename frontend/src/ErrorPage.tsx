import{ useNavigate } from "react-router-dom"

const ErrorPage = ()=>{
    const navigate = useNavigate()
    return(
    <section className="w-full h-[100vh] flex justify-center items-center">
        <h1 className="font-bold w-full text-2xl">OOPS...</h1>
        <p className="italic semi-bold text-lg mt-2">Page not found</p>
        <button className="w-24 h-16 text-lg font-bold bg-red-600 text-white mt-3" onClick={()=>navigate(-1)}>Go back</button>
    </section>)
}


export default  ErrorPage