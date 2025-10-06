import { body, param } from "express-validator"

const  logInValidate = [ 
    body('email').trim().escape().notEmpty().isEmail().withMessage("Valid Email is Required"), 
    body('password').trim().escape().notEmpty().withMessage('Password is required')
]

const addProductValidate = [
    body("name").trim().escape().notEmpty().withMessage("Name of product is required"),
    body("price").trim().escape().notEmpty().isInt().withMessage("Price is required and should be a number"),
    body("brand").trim().escape().notEmpty().withMessage("brand is required"),
    body("description").trim().escape().notEmpty().withMessage("Description is  required"),
    body("size").trim().escape().notEmpty().withMessage("size is required"),
    body("stock").trim().escape().notEmpty().isInt().withMessage("stock is required  and should be a number"),
    body("color").trim().escape().notEmpty().withMessage("color is required")
]

const getProductValidate = [
    param("name").trim().escape().notEmpty().withMessage("Product name is required")
]


const editProductValidate = [
    body("name").trim().escape().notEmpty().withMessage("Name of product is required"),
    body("price").trim().escape().notEmpty().isInt().withMessage("Price is required and should be a number"),
    body("brand").trim().escape().notEmpty().withMessage("brand is required"),
    body("description").trim().escape().notEmpty().withMessage("Description is  required"),
    body("size").trim().escape().notEmpty().withMessage("size is required"),
    body("stock").trim().escape().notEmpty().isInt().withMessage("stock is required  and should be a number"),
    body("color").trim().escape().notEmpty().withMessage("color is required")   
]

export { logInValidate, addProductValidate, getProductValidate, editProductValidate }