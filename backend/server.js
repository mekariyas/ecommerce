import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"


const app = express()
//allow access to environment variables
dotenv.config()

//allow json parsing for incoming requests
app.use(express.json())

await connectDb().catch((err)=>{console.log(err.message)})

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on localhost:${process.env.PORT}`)
})