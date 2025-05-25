import {Schema, model} from "mongoose"

const userSchema = new Schema({
    fName:{
        type: String,
        required: true
    },
    lName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default: "user"
    }
}, {timestamps: true})

const User = model('User', userSchema)

export default User