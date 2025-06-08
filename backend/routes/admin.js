import express from "express"
import multer from "multer"
import path from 'node:path'


import { login, addProduct, getProduct, restockProduct, deleteProduct, logout} from "../controllers/admin.js"
import createAdmin from "../controllers/createAdmin.js"

const storage = multer.diskStorage({
    destination:function(req, file,cb){
        cb(null, './uploads/shoe-items')
    },
    filename: function(req, file,cb){
        cb(null, path.basename(file.originalname))
    }
})

const upload = multer({ storage: storage})

const adminRoutes = express.Router()

//backend admin create request
adminRoutes.post('/adminCreate', createAdmin)

//login and logout requests
adminRoutes.get('/adminLogin', login)
adminRoutes.get('/adminLogOut', logout)

//admin-product CRUD requests
adminRoutes.get('/getProduct',getProduct)
adminRoutes.post('/newProduct',upload.single('shoes'),addProduct)
adminRoutes.put('/restock', upload.single('shoes'),restockProduct)
adminRoutes.delete('/deleteProduct', deleteProduct)

export default adminRoutes