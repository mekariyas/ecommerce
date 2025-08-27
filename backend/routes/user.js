import express from "express";
import {signUp, signIn, logOut, getProducts, getProduct} from "../controllers/user.js"

const userRoutes = express.Router()

userRoutes.post("/signUp", signUp)

userRoutes.post("/signIn", signIn)

userRoutes.get("/products", getProducts)

userRoutes.get("/product/:name", getProduct)

userRoutes.get("/logOut", logOut)

export default userRoutes