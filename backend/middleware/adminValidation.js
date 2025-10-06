import { validationResult, matchedData } from "express-validator"

const validateLogin = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const userData = matchedData(req)
        req.body = {...req.body, email: userData.email, password:userData.password }       
        return next()    
    }
    
    return res.status(400).json({message: errors.array()[0].msg, success: false}) 
}


const validateProductAddition = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const productData = matchedData(req)
        req.body = {...req.body, name: productData.name, price: productData.price , brand: productData.price, description: productData.description, size: productData.size, stock: productData.stock, color: productData.color}
        return next()
    }

    return res.status(400).json({message: errors.array()[0].msg, success: false})
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

const validateProduct = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const productData = matchedData(req)

        req.params.name = productData.name
        return next()
    }
    return res.status(400).json({message: errors.array()[0], success:false})
}

const validateEdit = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const productData = matchedData(req)
        req.body = { ...req.body, name: productData.name, price: productData.price , brand: productData.price, description: productData.description, size: productData.size, stock: productData.stock, color: productData.color}
        return next()
    }

    return res.status(400).json({message: errors.array[0], success: false})
}

export { validateLogin, validateProductAddition, validateQuery, validateProduct, validateEdit }