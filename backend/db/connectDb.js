import mongoose from "mongoose"

async function connectDb(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to database")
}


export default connectDb