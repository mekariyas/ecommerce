import { validationResult, matchedData } from "express-validator"

const validateSignUp = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const userData = matchedData(req)
        
        req.body = { ...req.body ,firstName: userData.firstName, lastName:userData.lastName, email: userData.email, password: userData.password}
        return next()
    }
    return res.status(400).json({errors: errors.array()[0].msg, success:false})
}



const validateLogin = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const userData = matchedData(req)
        
        req.userData = {email: userData.email, password:userData.password}       
        return next()    
    }
    return res.status(400).json({message: errors.array()[0].msg, success:false})
    
}

const validateQuery = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const queryData = matchedData(req)
        req.queryData = {page: queryData.page, skip:queryData.skip}
        return next()
    }

    return res.status(400).json({message: errors.array()[0], success:false})
}


const validateOrder = (req, res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty){ 
        return next()
    }
    return res.status(400).json({message: errors.array()[0], success:false})
}
export { validateSignUp, validateLogin, validateQuery, validateOrder } 