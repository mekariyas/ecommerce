import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Product from "../models/Product.js"


//log in and log out(get request)
//add a new product (post request)
//restock a product(put request)
//delete a product(delete request)


const login  = async (req,res)=>{
    const { email, password } = req.body
    
    if (!email || !password){
        return res.status(401).json({message:"Missing credentials", success:false})
    }
    
    try{
        const getUser  = await User.find({email:email})
        if(!getUser){
            return res.status(401).json({message: "Unauthorized access", success: false})
        }
        const verifyUser  = await bcrypt.compare(password, getUser.password)
        if(!verifyUser){
            return res.status(401).json({message: "Incorrect password", success: false})
        }
        return res.status(200).json({message:"successfully authorized", success: true})
    
    }catch(error){
        return res.status(500).json({message:"Internal Server Error", success: false})
    }
}

const addProduct = async(req, res)=>{
    const { name, price, brand, description, size,stock, color} = req.body
    const image = req.file?.filename
    if( !name || !price || !brand || !description || size.length == 0 ||!stock ||!color || !image ){
        return res.status(400).json({message: "Incomplete data", success: false})
    }
    try{
        const itemStored = await Product.findOne({name: name})
        if(itemStored){
            return res.status(409).json({message:"Item already exists", success:false})
        }
        await Product.create({name:name, price:price, brand:brand, description: description, stock:stock, size: size, color: color, image: '../uploads/shoe-items/' + image})
        return res.status(201).json({message:"Item created", success: true})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal server Error"})    
    }
}

const getProduct  = async(req, res)=>{
    const { name } = req.body;
    if(!name){
        return res.status(400).json({message: "No query defined", success:false})
    }
    try{
        const item = await Product.findOne({name:name});
    if(!item){
        return res.status(404).json({message: "Item not found", success:false})
    }
    return res.status(200).json({item})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error", success: false})
    }
}

const restockProduct = async(req, res)=>{
    const {name, price, brand, description, stock, color} = req.body
    const image = req.file?.filename
    if(!name){
        return res.status(401).json({message:"Product name not provided", success: false})
    }
    try{
        await Product.findOneAndUpdate({name: name}, {name:name, price:price, brand:brand, description:description, stock:stock, color:color, image: '../uploads/shoe-items/' + image})
        return res.status(200).json({message:"Product Updated", success:true})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

const deleteProduct   = async(req, res)=>{
    const {name} = req.params
    if(!name){
        return res.status(401).json({message:"Product name not provided", success: false})
    }
    try{
        const findItem = await Product.deleteOne({name: name})
        if(!findItem){
            return res.status(404).json({message:"Product does not exist", success: false})
        } 
        
        return res.status(204).json({message:"Product deleted", success: true})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})        
    }
}


const logout = async(req, res)=>{}


export {login, addProduct,getProduct, restockProduct, deleteProduct, logout}