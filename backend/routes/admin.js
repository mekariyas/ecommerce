import express from " express"
import multer from "multer"
import path from 'node:path'

import { login, addProduct, getProduct, restockProduct, deleteProduct, logout} from "../controllers/admin.js"

const storage = multer.diskStorage({
    destination:function(req, file,cb){
        cb(null, '../uploads/shoe-items')
    },
    filename: function(req, file,cb){
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + Date.now().toLocaleString() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage})

const adminRoutes = express.Router()

//login and logout requests
adminRoutes.get('/adminLogin', login)
adminRoutes.get('/adminLogOut', logout)

//admin-product CRUD requests
adminRoutes.get('/getProduct',getProduct)
adminRoutes.post('/newProduct',multer.single('shoes'),addProduct)
adminRoutes.put('/restock', restockProduct)
adminRoutes.delete('/deleteProduct', deleteProduct)

export default adminRoutes