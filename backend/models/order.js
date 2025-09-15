import mongoose,{ model, Schema} from "mongoose"
import User from './user.js'
import Product from './product.js'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    address:{
            city:{
                type: String,
                required: true
            },
            subCity:{ type: String, required: true},
            streetName: {type: String, required: true},
            houseNumber: {type: String, required: true},
            phoneNumber: {
                type: String, required:true
            }
        },
    OrderList:[{
        product:{type: Schema.Types.ObjectId,ref: "Product"},
        name: {type:String, required: true},
        brand: {type:String, required: true},
        amount:{type: Number, required: true, min: 1},
        price: {type: Number,required: true},
        color: [{type:String, required: true}],
        size: [{type:String, required: true}],
        image: {type: String, required: true}
    }],
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["Pending", "Delivered","Shipped","cancelled"],
        default: "Pending"
    }
}, { timestamps: true})

const Order = model("Order", orderSchema)

export default Order