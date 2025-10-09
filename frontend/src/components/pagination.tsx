import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Pagination = ({...props}: {totalProducts: number, id? :string}) => { 
  const navigate = useNavigate()
  
  const [searchParams, setSearchParams ] = useSearchParams()

  const [buttons, setButtons] = useState<number[]>([])
  
  let numbers:number[] = []

  
  const handleButtonsPopulation = (num: number)=>{
    if (num == 0 ){
      return setButtons(numbers)
    }
    numbers = [num,...numbers]
    return handleButtonsPopulation(num-1)
  } 

  useEffect(()=>{
    handleButtonsPopulation(props.totalProducts)
  },[])

  return (
    <>
      <hr className="w-full h-4 text-slate-400"/>
        <ul className={`w-[80%] rounded-md mt-2 pl-3 md:pl-0  flex ${buttons.length > 10? "justify-start pt-2 pb-2":"justify-center items-center"} gap-10 flex-wrap justify-center pl-2 pt-2 mb-6`}>
            {buttons.map((button,i)=>{
              return (
                <li key={i} className="w-16 h-16 mb-4">
                  <button className={`w-full text-lg h-full  ${button === parseInt(searchParams.get("page"))? "bg-slate-600": "bg-blue-600"} cursor-pointer text-white font-medium rounded-md`} 
                  onClick={()=> navigate( props.id ? `/dashboard/${props.id}/products/?page=${button}&skip=${button == 1? 0: i * (props.totalProducts + 1)}` :`/products/?page=${button}&skip=${button == 1? 0: i * (props.totalProducts + 1)}`)}>{button}</button>
                </li>)
         })}
        </ul>
    </>
)}

export default Pagination