import express from "express";
import { query } from "express-validator"
import {signUp, signIn, logOut, placeOrder,getProducts, getProduct, refresh} from "../controllers/user.js"
import { signUpValidate, logInValidate, orderValidate } from "../middleware/userValidateInput.js";
import { validateSignUp,validateLogin, validateQuery, validateOrder } from "../middleware/userValidation.js";
import userAuth from "../middleware/userAuth.js"

const userRoutes = express.Router()

userRoutes.post("/signUp", signUpValidate,validateSignUp,signUp)

userRoutes.post("/signIn",logInValidate,validateLogin, signIn)

userRoutes.get("/refresh", refresh)

userRoutes.get("/products", query(["page", "skip"]).trim().notEmpty().escape(),validateQuery,getProducts)

userRoutes.get("/product/:name", userAuth, getProduct)

userRoutes.get("/logOut", logOut)

userRoutes.post("/placeOrder", userAuth, orderValidate, validateOrder,placeOrder)

export default userRoutes