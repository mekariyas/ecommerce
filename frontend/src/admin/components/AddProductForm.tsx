import { useState, useEffect,FormEvent } from 'react'
import { AxiosError } from 'axios'
import { BiCamera } from 'react-icons/bi'
import instance from "../../api/api.tsx"


import NotificationCard from "../../components/NotificationCard.tsx"


const AddProductForm = () => {

  const [isUpLoading,setIsUpLoading ] = useState<boolean>(false)

  //form state
  const [ name, setName] = useState<string>("")
  const [price, setPrice] = useState<number>(500)
  const [brand, setBrand] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [size, setSize ] = useState<string>("")
  const [stock, setStock] = useState<number>(1)
  const [color, setColor] = useState<string>("")
  const [image, setImage] = useState< File | null>(null)

  const [statusText, setStatusText] = useState<string>("")
  const [notificationVisibility,setNotificationVisibility] =  useState<boolean>(false)

  useEffect(()=>{
    if(notificationVisibility){
      const timer = setTimeout(() => {
        setNotificationVisibility(false)
      }, 5000);
      return ()=> clearTimeout(timer)
    }
  },[notificationVisibility])

  const handleFormSubmit = async(e : FormEvent)=>{
    e.preventDefault()
    if (!image){
      setStatusText("Please Insert an Image")
      setNotificationVisibility(true)
      return
    }
    const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price.toString())
      formData.append("brand", brand)
      formData.append("description", description)
      formData.append("size", size)
      formData.append("stock",stock.toString())
      formData.append("color", color)
      formData.append("shoes", image)
    try{
      setIsUpLoading(true)
      const sendShoesData = await instance.post("/admin/newProduct", formData)
      if(sendShoesData.status === 200){
        const { data } = sendShoesData.data
        setIsUpLoading(false)
        setName("")
        setPrice(500)
        setBrand("")
        setDescription("")
        setSize("")
        setStock(1)
        setColor("")
        setImage(null)
        setStatusText(data.message)
        setNotificationVisibility(true)
      }
    }catch(error){
      if(error instanceof AxiosError){
        console.log(error)
        setIsUpLoading(false)
        if(error.status == 409){
          setStatusText("Product already Exists")
          setNotificationVisibility(true)
        return
        }
        setStatusText(error.message)
        setNotificationVisibility(true)
        return
      }
      setIsUpLoading(false)
      setStatusText("Internal server Error. Please Try again")
      setNotificationVisibility(true)
    }
    }
  return (
    <>
      <form className="flex flex-col relative mt-4 md:mt-0 md:items-center h-[90%] md:h-[85%] pl-2" onSubmit={handleFormSubmit}>
        {notificationVisibility && <NotificationCard statusText={statusText}/>}
        <label className="md:w-[30%] md:ml-2">Name:</label>
        <input type="text" required value = {name} name="name" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setName(e.target.value)}/>
        <label className="md:w-[30%] md:ml-2">Price:</label>
        <input type="number" required min="500" value={price} name="price" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setPrice(Number(e.target.value))}/>
        <label className="md:w-[30%] md:ml-2">Brand:</label>
        <input type="text" required name="brand" value={brand} className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setBrand(e.target.value)}/>
        <label className="md:w-[30%] md:ml-2">Description:</label>
        <textarea required maxLength={500} value={description} name="description" className="ml-4 md:ml-2 pl-1 pt-1 rounded-sm w-[90%] md:w-[30%] h-10 resize-none not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
        onChange={(e)=>setDescription(e.target.value)}></textarea>
        <label className="md:w-[30%] md:ml-2">Size:</label>
        <input type="text" required name="size" value={size} placeholder='E.g:- 30 UK,10 US or 39-42UK etc' className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
        onChange={(e)=> setSize(e.target.value)}/>
        <label className="md:w-[30%] md:ml-2">Stock:</label>
        <input type="number" required name="stock" value={stock} min="1" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
        onChange={(e)=> setStock(Number(e.target.value))}/>
        <label className="md:w-[30%] md:ml-2">Color:</label>
        <input type="text" placeholder="E.G:- Blue, Grey, Red" required  name="color" value={color} className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
        onChange={(e)=> setColor(e.target.value)}/>
        <label className="md:w-[30%] md:ml-2">Image:</label>
        <section className="w-[85%] md:w-[30%] ml-4 md:ml-2 mb-2 flex h-7 relative cursor-pointer">
            <input type="file" required name="Image" accept="image/*" className="w-[75%] not-valid:outline-red-700 rounded-sm" onChange={(e)=> setImage(e.target.files?.[0] || null)}/>
            <BiCamera className="rounded-sm border-[1px]  border-white h-full w-[20%] md:w-[25%] absolute left-0 z-[2] bg-blue-950 text-white pointer-events-none"/>
        </section>
        <input type="submit" value={isUpLoading?"Uploading...":"Add Product"} disabled={isUpLoading} className={`border-blue-950 border-[1px] w-[95%] md:ml-2 md:w-[30%] h-10 font-bold rounded-sm mb-2 cursor-pointer ${isUpLoading? "bg-slate-600 cursor-not-allowed":""}`}/>
      </form>
    </>
  )
}

export default AddProductForm