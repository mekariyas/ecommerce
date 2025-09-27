import jwt from "jsonwebtoken"

const  adminAuth =  (req, res, next)=>{
    const userAccessToken = req.headers.authorization?.split(" ")[1]
    const refreshToken = req.cookies.adminCookie
    
    if(userAccessToken){
        jwt.verify(userAccessToken,process.env.ADMIN_SECRET_TOKEN,function (err, decoded){
            if(err){
               return verifyRefreshToken(req,res,next,refreshToken)
            }else if (decoded.role !== "admin"){
                return res.status(401).json({message:"Unauthorized access", success: false})
            }
            req.userId = decoded._id
            return next()
        })

    }else if(refreshToken){
        verifyRefreshToken(req,res,next,refreshToken)
    }else{
       return res.status(401).json({message: "No tokens provided, login or signup", success: false}); 
    }
}

function verifyRefreshToken(req, res,next,refreshToken){
    jwt.verify(refreshToken,process.env.ADMIN_SECRET_TOKEN, function(err, decoded){
        if(err){
            return res.status(401).json({message: "Invalid token, Sign up or log in", success:false})
        } 
        else if (decoded.role !== "admin"){
                return res.status(401).json({message:"Unauthorized access", success: false})
        }
        req.userId = decoded._id
        return next()
    })
}

export default adminAuth