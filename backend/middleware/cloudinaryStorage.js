import path from "node:path"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "shoes_store",
        public_id: (req, file)=>{ 
            const fileName = path.parse(file.originalname).name;
            const uniqueSuffix = Date.now()
            return `${fileName}-${uniqueSuffix}`
        },
    }
})

const upload = multer({storage: storage})


export default upload