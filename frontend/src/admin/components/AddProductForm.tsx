import React from 'react'
import { BiCamera } from 'react-icons/bi'

const AddProductForm = () => {
  return (
    <form className="flex flex-col md:items-center h-[90%] md:h-[85%] pl-2">
        <label className="md:w-[30%] md:ml-2">Name:</label>
        <input type="text" required className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Price:</label>
        <input type="number" required className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Brand:</label>
        <input type="text" required className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Description:</label>
        <textarea required maxLength={500} className="ml-2 pl-1 pt-1 rounded-sm w-[90%] md:w-[30%] h-10 resize-none not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"></textarea>
        <label className="md:w-[30%] md:ml-2">Size:</label>
        <input type="text" required placeholder='E.g:- 30 UK,10 US' className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Stock:</label>
        <input type="number" required className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Color:</label>
        <input type="text" placeholder="E.G:- Blue, Grey, Red" required className="ml-2 pl-1 rounded-sm w-[90%] md:w-[30%] h-10 not-valid:outline-red-700 border-blue-950  outline-blue-950 border-[1px]"/>
        <label className="md:w-[30%] md:ml-2">Image:</label>
        <section className="w-[90%] md:w-[30%] md:ml-2 mb-2 flex h-7 relative cursor-pointer">
            <input type="file" required className="w-[70%] not-valid:outline-red-700 rounded-sm"/>
            <BiCamera className="rounded-sm border-[1px] cursor-pointer border-white h-full w-[25%] absolute left-0 z-[2] bg-blue-950 text-white pointer-events-none"/>
        </section>
        <input type="submit" value="Add Product" className="border-blue-950 border-[1px] w-[95%] md:ml-2 md:w-[30%] h-10 font-bold rounded-sm mb-2 cursor-pointer"/>
    </form>
  )
}

export default AddProductForm