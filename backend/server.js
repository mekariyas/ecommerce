import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js"

//allow access to environment variables
dotenv.config()

const app = express()


//allow json parsing for incoming requests
app.use(express.json())

app.use(cors())

await connectDb().catch((err)=>{console.log(err.message)})

//Static files
// app.use(express.static("uploads/shoe-items"))

//admin route middleware
app.use('/admin',adminRoutes)

//user route middleware
app.use('/user',userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})