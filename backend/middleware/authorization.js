import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next)=>{
    const auth = req.header["authorization"].split(" ")
}

export {authMiddleWare}