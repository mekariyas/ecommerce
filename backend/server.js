import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js"

const app = express()
//allow access to environment variables
dotenv.config()

//allow json parsing for incoming requests
app.use(express.json())

app.use(cors())

await connectDb().catch((err)=>{console.log(err.message)})

app.use('/admin',adminRoutes)
app.use('/user',userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})