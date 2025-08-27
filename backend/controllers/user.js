import User from "../models/user.js"
import Product from "../models/product.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const signUp = async (req, res) => {
    const {firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password ){
        res.status(400).json({message:"Missing email or password", success:false})
    }
    try{
        const findUser = await User.findOne({email: email})
        if(findUser){
            return res.status(409).json({message:"Email is already in use", success:false})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        await User.create({fName:firstName, lName:lastName, email:email, password:hashedPassword})
        const getUser  = await User.findOne({email:email})
        const accessToken  = jwt.sign({email:getUser.email, role: getUser.role},process.env.SECRET_TOKEN,{expiresIn: "15m"})
        const refreshToken = jwt.sign({email:getUser.email, role: getUser.role}, process.env.SECRET_TOKEN,{expiresIn: "168h"})

        res.cookie("jwt_cookie", refreshToken, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(200).json({message:"User created", success:true, accessToken})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})
    }
}

const signIn = async (req,res) => {
    const { email, password } = req.body;
    try{
        const findUser = await User.findOne({email: email})
        if(!findUser){
            res.status(404).json({message:"User not found", success: false})
        } 
        const verifyUser  = await bcrypt.compare(password, findUser.password) 
        if(!verifyUser){
            return res.status(401).json({message: "Incorrect password", success: false})
        }
        const accessToken = jwt.sign({email:findUser.email, role: findUser.role},process.env.SECRET_TOKEN,{expiresIn: "15m"})
        const refreshToken = jwt.sign({email:findUser.email, role: findUser.role}, process.env.SECRET_TOKEN,{expiresIn: "168h"})

        res.cookie("jwt_cookie", refreshToken, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(200).json({message:"successfully authorized", success: true, accessToken, id:findUser.id})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error", success: false})
    }
}

const getProducts = async (req, res) => {
    try{
        const totalProducts = await Product.countDocuments({});
        const products = await  Product.find({}).limit(5);
        return res.status(200).json({products:products, totalProducts: totalProducts})
    }catch(error){
        return res.status(500).json({message: "Internal server error", success: false})
    }
}

const getProduct  = async  (req, res) => {
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


const logOut = async (req, res) => {
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


export { signUp, signIn, getProduct,getProducts, logOut}