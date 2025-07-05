import { useState ,useEffect } from "react"
import { useParams } from "react-router-dom"
import instance from "../../api/api"


const Home = () => {
  const { id } = useParams()
  const [firstName, setFirstName ] = useState<string>("");
  const [lastName, setLastName ] = useState<string>("");
  
  const [isError, setIsError] = useState<boolean>(false);

  const fullName:string = `${firstName} ${lastName}`

  const handleUserDataFetch = async()=>{
     try{
      const getUser = await instance.get(`/admin/adminInfo/${id}`)
      const { firstName, lastName } = getUser.data
      setFirstName(firstName)
      setLastName(lastName)
    }
      catch(error){
        setIsError(true)      
    }
  }
  useEffect(()=>{
    handleUserDataFetch()
  },[])
  return (
    <section className="w-full h-[80vh] md:h-full relative top-16 md:static">
        <h1 className="w-full h-6 font-medium md:font-bold text-lg md:text-xl text-center mb-4">Admin Dashboard</h1>
        <section className="w-full flex flex-col items-start justify-center  pl-3 gap-2">
            {!isError?(<p className="w-52 pl-2">Name: {fullName}</p>):(<p className="w-52 pl-2 text-red-600 text-xl font-bold">Error, reload page</p>)}
        </section>
    </section>
  )
}

export default Home