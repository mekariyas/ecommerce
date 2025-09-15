import express from "express";
import {signUp, signIn, logOut, placeOrder,getProducts, getProduct, refresh} from "../controllers/user.js"
import userAuth from "../middleware/userAuth.js"

const userRoutes = express.Router()

userRoutes.post("/signUp", signUp)

userRoutes.post("/signIn", signIn)

userRoutes.get("/refresh", refresh)

userRoutes.get("/products", getProducts)

userRoutes.get("/product/:name", userAuth, getProduct)

userRoutes.get("/logOut", logOut)

userRoutes.post("/placeOrder", userAuth,placeOrder)

export default userRoutes