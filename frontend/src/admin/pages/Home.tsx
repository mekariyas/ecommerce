import { useState ,useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import instance from "../../api/api"
import { useAdminTokenStorage }  from "../../store/adminToken"
import { AxiosError } from "axios"

const Home = () => {

  const navigate = useNavigate() 
  const { id } = useParams()
  const [firstName, setFirstName ] = useState<string>("");
  const [lastName, setLastName ] = useState<string>("");
  
  const token = useAdminTokenStorage((state)=>state.token)
  const saveToken = useAdminTokenStorage((state)=>state.saveToken)
  const [isError, setIsError] = useState<boolean>(false);

  const fullName:string = `${firstName} ${lastName}`

  const handleUserDataFetch = async()=>{
     try{
      const getUser = await instance.get(`/admin/adminInfo/${id}`,{
        headers:{
          Authorization: `bearer ${token}`
        },
        withCredentials: true})

      const { firstName, lastName, accessToken } = getUser.data
      saveToken(accessToken)
      setFirstName(firstName)
      setLastName(lastName)
    }
      catch(error){
        setIsError(true)
        if(error instanceof AxiosError){
          if(error.response?.data.message === "No tokens provided, login or signup" || error.response?.data.message === "Unauthorized access"){
            alert("Unable to access this page Login again")
            return navigate("/admin")
          }
          alert(error.response?.data.message || "Please try again")
        }
        else if (error instanceof Error){
          alert(error.message) 
        }     
    }
  }
  useEffect(()=>{
    handleUserDataFetch()
  },[])
  return (
    <section className="w-full h-[80vh] md:h-full relative top-16 md:static">
        <h1 className="w-full h-6 font-medium md:font-bold text-lg md:text-xl text-center mb-4">Admin Dashboard</h1>
        <section className="w-full flex flex-col items-start justify-center  pl-3 gap-2">
            {!isError && (<p className="w-full md:text-xl text-center font-semibold">Welcome {fullName}</p>)}
        </section>
    </section>
  )
}

export default Home