import multer from "multer"
import express from "express"
import upload from "../middleware/cloudinaryStorage.js"
import { query } from "express-validator"
import adminAuth from "../middleware/adminAuth.js"

import { refresh,login, getAdmin, logout, addProduct, getProduct, getProducts,restockProduct, deleteProduct, getOrders, getOrder} from "../controllers/admin.js"

import { logInValidate, addProductValidate, getProductValidate, editProductValidate } from "../middleware/adminInputValidation.js"
import { validateLogin, validateProductAddition, validateQuery, validateProduct, validateEdit } from "../middleware/adminValidation.js"

import createAdmin from "../controllers/createAdmin.js"

const uploadFile = upload.single('shoes')

const UploadMiddleware = function(req, res,next){
    uploadFile(req, res, function(err){
        if(err instanceof multer.MulterError){
            console.log(err)
            return res.status(500).json({message:err.message,success:false})
        }
        else if(err){
            console.log(err)
            return res.status(500).json({message: err.message, success: false})
        }
        next()
    })
}

const adminRoutes = express.Router()

//backend admin create request
adminRoutes.post('/adminCreate', createAdmin)

//Admin login and logout requests
adminRoutes.post('/adminLogin', logInValidate, validateLogin,login)
adminRoutes.get('/adminLogOut',logout)
adminRoutes.get("/refresh", refresh)
//admin information request

adminRoutes.use(adminAuth)
adminRoutes.get("/adminInfo/:id",getAdmin)

//product CRUD requests
adminRoutes.get('/getProduct/:name', getProductValidate, validateProduct,getProduct)
adminRoutes.get("/getProducts",query(["page", "skip"]).trim().notEmpty().escape(),validateQuery,getProducts)
adminRoutes.post('/newProduct',UploadMiddleware,addProductValidate,validateProductAddition,addProduct)
adminRoutes.put('/restock',UploadMiddleware,editProductValidate, validateEdit,restockProduct)
adminRoutes.delete('/deleteProduct', deleteProduct)


adminRoutes.get("/orders",query(["page", "skip"]).trim().notEmpty().escape(),validateQuery,getOrders)
adminRoutes.get("/order/:orderId", getOrder)
export default adminRoutes