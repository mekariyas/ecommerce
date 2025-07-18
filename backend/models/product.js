import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    description:{
        type: String,
        maxLength: 500,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    size:{
        type: [String],
        required: true
    },
    color:{
        type: [String],
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Product = model("Product", productSchema)

export default Product