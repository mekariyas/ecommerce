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
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        color: [{type:String, required: true}],
        size: [{type:String, required: true}],
        quantity:{ type: Number, required: true, min: 1},
        total: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true})

const Order = model("Order", orderSchema)

export default Order