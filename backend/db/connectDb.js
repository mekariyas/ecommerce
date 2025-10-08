import mongoose from "mongoose"

async function connectDb(){
    await mongoose.connect(process.env.MONGODB_ATLAS)
    console.log("connected to database")
}


export default connectDb