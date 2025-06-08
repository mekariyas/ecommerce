import User from "../models/user.js"
import bcrypt from "bcryptjs"

const createAdmin = async(req, res)=>{
    const {fName, lName,email, password, role} = req.body

    if(!fName || !lName ||  !email || !password){
        return res.status(401).json({message:"Missing Credentials", success:false })
    }
    try{
        const getUser = await User.findOne({email: email})
        if(getUser){
            console.log(getUser)
            return res.status(401).json({message: "User already exists"})
        } 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        await User.insertOne({fName: fName, lName, email:email, password: hashedPassword, role: role? role : 'admin'})
    }
    catch(error){
        return res.status(500).json({message: "Internal server error", success:False})
    }
}


export default createAdmin