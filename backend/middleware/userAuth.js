import jwt from "jsonwebtoken"

const userAuth =  (req, res, next)=>{
    const userAccessToken = req.headers.authorization?.split(" ")[1]
    const refreshToken = req.cookies.userCookie

    if(userAccessToken){
        jwt.verify(userAccessToken,process.env.SECRET_TOKEN,function (err, decoded){
            if(err){
               return verifyRefreshToken(req,res,next,refreshToken)
            }
            else if (decoded.role !== "user"){
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
    jwt.verify(refreshToken,process.env.SECRET_TOKEN, function(err, decoded){
        if(err){
            console.log(err.message)
            return res.status(401).json({message: "Invalid token, Sign up or log in", success:false})
        } 
        else if (decoded.role !== "user"){
            console.log("this is refresh token verification")
            return res.status(401).json({message:"Unauthorized access", success: false})
        }
        req.userId = decoded._id
        return next()
    })
}

export default userAuth