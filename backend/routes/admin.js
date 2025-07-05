import multer from "multer"
import express from "express"
import upload from "../middleware/cloudinaryStorage.js"
import { login, getAdmin, logout, addProduct, getProduct, getProducts,restockProduct, deleteProduct} from "../controllers/admin.js"
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
adminRoutes.post('/adminLogin', login)
adminRoutes.get('/adminLogOut', logout)

//admin information request
adminRoutes.get("/adminInfo/:id", getAdmin)

//product CRUD requests
adminRoutes.get('/getProduct/:name',getProduct)
adminRoutes.get("/getProducts", getProducts)
adminRoutes.post('/newProduct',UploadMiddleware,addProduct)
adminRoutes.put('/restock',UploadMiddleware,restockProduct)
adminRoutes.delete('/deleteProduct', deleteProduct)

export default adminRoutes