import { useState,useEffect, FormEvent } from 'react'
import { AxiosError } from "axios"
import { useParams } from "react-router-dom"
import { BiCamera } from "react-icons/bi"

import NotificationCard from  "../../components/NotificationCard.tsx"
import ErrorComponent from "../components/ErrorComponent.tsx"

//axios instance
import instance from "../../api/api.tsx"


const EditProduct = () => {

    const cloudName = import.meta.env.VITE_CLOUD_NAME    
    //product data
    const { name } = useParams();
    const [productName, setProductName] = useState<string>(name)
    const [price, setPrice] = useState<number>(0)
    const [brand, setBrand] = useState<string>("")
    const [description,setDescription] = useState<string>("")
    const [stock, setStock] = useState<number>(0)
    const [color, setColor] = useState<string>("")
    const [size, setSize ] = useState<string>("")
    const [imageInfo,setImageInfo ] = useState<string>("")    
    const [image, setImage] = useState<File>()

    //Error state
    const[isError, setIsError] = useState<boolean>(false)
    const [statusText, setStatusText] = useState<string>("")
    
    const [isUploading ,setIsUploading] = useState<boolean>(false)

    //data fetch logic
    const handleDataFetch = async()=>{
        try{
            const getProduct = await instance.get(`/admin/getProduct/${name}`)
            if(getProduct.status == 200){
                const { item } = getProduct.data
                setPrice(item.price)
                setBrand(item.brand)
                setDescription(item.description)
                setStock(item.stock)
                setColor(item.color.join(","))
                setSize(item.size.join(","))
                setImageInfo(item.image)
            }
        }
        catch(error){
            if(error instanceof AxiosError){
                setIsError(true)
                setStatusText(error.message)
                console.log(error)
                return
            }
            setIsError(true)
            setStatusText("Error, Please Try again")

        }
    }

    //fetch data on the first render
    useEffect(()=>{
        handleDataFetch()
    },[])

    const handleDataUpdate = async(e: FormEvent)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", productName)
        formData.append("price", price.toString())
        formData.append("brand", brand)
        formData.append("description", description)
        formData.append("stock", stock.toString())
        formData.append("color", color)
        formData.append("size", size)
        formData.append("image", image? image: imageInfo)
        try{
            setIsUploading(false)
            const updateData = await instance.put('/admin/restock', formData)
            if(updateData.status === 200){
                setStatusText("Product updated Successfully")
                setIsUploading(false)
            }
        }catch(error){
            if(error instanceof AxiosError){
                setIsUploading(false)
                setIsError(true)
                setStatusText(error.message)
                console.log(error)
                return
            }
            setIsUploading(false)
            setIsError(true)
            setStatusText("Error, Please Try again")
        }
    }

    return (
    <>{ isError? (<ErrorComponent errorMessage={statusText}/>):
        (<section className="w-full h-[87.6vh] mt-18 md:mt-0 md:h-full md:static">
        <h1 className="w-full text-center font-bold text-lg static">Edit Product</h1>
        <section className="w-full flex flex-col items-center md:flex-row  md:items-start h-[95%] gap-6 md:pt-4 md:pl-4 overflow-y-scroll md:overflow-y-hidden"> 
            <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_500/q_auto/f_auto/${imageInfo}`} alt={productName} className="w-[75%] h-[40%] md:w-[45%] md:h-[50%]"/>
                <form className="flex flex-col relative mt-4 mb-6 md:mt-0 md:items-start md:pl-4 w-full md:w-[65%] h-[75vh] md:h-[85%] pl-2" onSubmit={handleDataUpdate}>
                   { isError && <section className="w-[90%] md:w-[55%] h-[14] flex justify-center"><NotificationCard statusText={statusText}/></section>}
                   <label className="md:w-[30%] md:ml-2">Name:</label>
                   <input type="text" required value = {productName} name="name" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setProductName(e.target.value)}/>
                   <label className="md:w-[30%] md:ml-2">Price:</label>
                   <input type="number" required min="500" value={price} name="price" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setPrice(Number(e.target.value))}/>
                   <label className="md:w-[30%] md:ml-2">Brand:</label>
                   <input type="text" required name="brand" value={brand} className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]" onChange={(e)=>setBrand(e.target.value)}/>
                   <label className="md:w-[30%] md:ml-2">Description:</label>
                   <textarea required maxLength={500} value={description} name="description" className="ml-4 md:ml-2 pl-1 pt-1 rounded-sm w-[90%] md:w-[45%] h-14 resize-none not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
                   onChange={(e)=>setDescription(e.target.value)}></textarea>
                   <label className="md:w-[30%] md:ml-2">Size:</label>
                   <input type="text" required name="size" value={size} placeholder='E.g:- 30 UK,10 US or 39-42UK etc' className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
                   onChange={(e)=> setSize(e.target.value)}/>
                   <label className="md:w-[30%] md:ml-2">Stock:</label>
                   <input type="number" required name="stock" value={stock.toString()} min="1" className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
                   onChange={(e)=> setStock(Number(e.target.value))}/>
                   <label className="md:w-[30%] md:ml-2">Color:</label>
                   <input type="text" placeholder="E.G:- Blue, Grey, Red" required  name="color" value={color} className="ml-4 md:ml-2 pl-1 rounded-sm w-[90%] md:w-[45%] h-14 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"
                   onChange={(e)=> setColor(e.target.value)}/>
                   <label className="md:w-[30%] md:ml-2">Image:</label>
                   <section className="w-[85%] md:w-[45%] ml-4 md:ml-2 mb-2 flex h-8 relative cursor-pointer">
                        <input type="file" required name="Image" accept="image/*" className="w-[75%] not-valid:outline-red-700 rounded-sm" onChange={(e)=> setImage(e.target.files?.[0])}/>
                        <BiCamera className="rounded-sm border-[1px]  border-white h-full w-[21.5%] md:w-[28%] absolute left-0 z-[2] bg-blue-950 text-white pointer-events-none"/>
                    </section>
                    <input type="submit" value={isUploading? "Submitting data...":"Add Product"}  className={`border-blue-950 border-[1px] w-[95%] md:ml-2 md:w-[45%] h-10 font-bold rounded-sm mb-2 cursor-pointer ${isUploading? "bg-slate-600 cursor-not-allowed":""}`}/>
                </form>
            </section>
       </section>)}
    </>
)}

export default EditProduct