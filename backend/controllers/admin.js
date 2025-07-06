import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Product from "../models/Product.js"


//log in and log out(get request)
//add a new product (post request)
//restock a product(put request)
//delete a product(delete request)



//admin

const login  = async (req,res)=>{
    const { email, password } = req.body
    
    if (!email || !password){
        return res.status(400).json({message:"Missing email or password", success:false})
    }
    
    try{
        const getUser  = await User.findOne({email:email})
        if(!getUser){
            return res.status(404).json({message: "User Does not Exist", success: false})
        }
        if(getUser.role !=="admin"){
            return res.status(403).json({message: "Access denied: Admins only", success: false})
        }
        const verifyUser  = await bcrypt.compare(password, getUser.password)
        if(!verifyUser){
            return res.status(401).json({message: "Incorrect password", success: false})
        }
        const accessToken = jwt.sign({email:getUser.email, role: getUser.role},process.env.SECRET_TOKEN,{expiresIn: "15m"})
        const refreshToken = jwt.sign({email:getUser.email, role: getUser.role}, process.env.SECRET_TOKEN,{expiresIn: "168h"})

        res.cookie("jwt_cookie", refreshToken, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(200).json({message:"successfully authorized", success: true, accessToken, id:getUser.id})
    
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", success: false})
    }
}



const logout = async(req, res)=>{
    const cookie = req.cookies?.jwt_cookie

    if (!cookie){
        return res.status(404).json({message: "cookie not found", success: false})
    }

    res.clearCookie("jwt_cookie",{
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"})
    
    return res.status(200).json({message: "successfully logged out", success: true})
}


const getAdmin = async(req, res) => {
    try{
        const { id } = req.params
        const admin = await User.findById(id)
        if(!admin){
            return res.status(404).json({message: "Admin not found"})
        }
        return res.status(200).json({firstName: admin.fName ,lastName: admin.lName})
    }
    catch(error){
        
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", success: false})
    }
}


//Product CRUD

const addProduct = async(req, res)=>{
    const { name, price, brand, description, size ,stock, color} = req.body
    const image = req.file?.filename
    if( !name || !price || !brand || !description || !size  ||!stock ||!color || !image ){
        return res.status(400).json({message: "Incomplete data", success: false})
    }
    try{
        const itemStored = await Product.findOne({name: name})
        if(itemStored){
            return res.status(409).json({message:"Item already exists", success:false})
        }
        await Product.create({name:name, price:Number(price), brand:brand, description: description, stock: Number(stock), size: size.split(","), color: color.split(","), image:image})
        return res.status(201).json({message:"Item created", success: true})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal server Error"})    
    }
}

const getProducts = async(req, res)=>{
    try{
        const products = await  Product.find({}).limit(5)

        return res.status(200).json({products:products})
    }catch(error){
        return res.status(500).json({message: "Internal server error", success: false})
    }
}

const getProduct  = async(req, res)=>{
    const { name } = req.params;
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
        
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", success: false})
    }
}

const restockProduct = async(req, res)=>{
    const {name, price, brand, description, stock, color} = req.body
    const image = req.file?.filename || req.body.image
    if(!name){
        return res.status(401).json({message:"Product name not provided", success: false})
    }
    try{
        await Product.findOneAndUpdate({name: name}, {name:name, price:price, brand:brand, description:description, stock:stock, color:color, image: '../uploads/shoe-items/' + image})
        return res.status(200).json({message:"Product Updated", success:true})
    }
    catch(error){
        
        console.log(error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

const deleteProduct   = async(req, res)=>{
    const {name} = req.body
    if(!name){
        return res.status(401).json({message:"Product name not provided", success: false})
    }
    try{
        const findItem = await Product.findOne({name: name})
        if(!findItem){
            return res.status(404).json({message:"Product does not exist", success: false})
        } 
        await Product.findOneAndDelete({name:name})
        return res.status(204).json({message:"Product deleted", success: true})
    }
    catch(error){
        
        console.log(error.message)
        return res.status(500).json({message:"Internal server error"})        
    }
}



export {login, getAdmin, logout, addProduct, getProduct, restockProduct, deleteProduct, getProducts}