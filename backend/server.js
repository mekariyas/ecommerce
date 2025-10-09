import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDb from "./db/connectDb.js"
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js"
import helmet from "helmet"
import { rateLimit } from "express-rate-limit"

//allow access to environment variables
dotenv.config()


const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: "Too many requests, please try again later",
    statusCode: 429
})

app.use(helmet())

//allow json parsing for incoming requests
app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: process.env.FRONT_END_ORIGIN,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))


await connectDb().catch((err)=>{console.log(err.message)})

app.use(limiter)

//admin route middleware
app.use('/admin',adminRoutes)

//user route middleware
app.use('/user',userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})