import mongoose,{ model, Schema} from "mongoose"
import User from './user.js'
import Product from './product.js'

const orderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   orderList:[{
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type: Number,
        required: true,
        min:1
    }
   }], 
    address:{
        type: String,
        required: true
    },
    Total:{
        type: Number,
        required: true
    }
},{timestamps: true})

const Order = model("Order", orderSchema)

export default Order