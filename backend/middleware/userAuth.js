import jwt from "jsonwebtoken"

const  userAuth =  (req, res, next)=>{
    const userAccessToken = req.headers.authorization.split(" ")[1]
    const refreshToken = req.cookies.userCookie

    if(!userAccessToken && !refreshToken){
        return res.status(401).json({message: "No tokens provided, login or signup", success: false});
    }

    if(accessToken){
        jwt.verify(accessToken,process.env.SECRET_TOKEN,function (err, decoded){
            if(err){
               return  verifyRefreshToken(refreshToken)
            } else if (decoded.role !== "user"){
                return res.status(401).json({message:"Unauthorized access", success: false})
            }
            return next()
        })
    }else{
        verifyRefreshToken(refreshToken)
    }

    const decoded = jwt.decode(refreshToken, { complete:true })
    req.userId = decoded.payload._id
    return next()
}

function verifyRefreshToken(refreshToken){
    if(!refreshToken){
        return res.status(401).json({message: "No tokens provided, login or signup", success: false});
    }
    jwt.verify(refreshToken,process.env.SECRET_TOKEN, function(err, decoded){
        if(err){
            return res.status(401).json({message: "Invalid token, Sign up or log in", success:false})
        } 
        else if (decoded.role !== "user"){
                return res.status(401).json({message:"Unauthorized access", success: false})
        }
    })
}

export default userAuth