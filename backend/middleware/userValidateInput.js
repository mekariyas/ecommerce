import { body, validationResult } from "express-validator"


//signup - firstname, lastname, email, password

//sign-in - email, password

//place order - order - address

const signUpValidate= [
    body('email').escape().trim().notEmpty().isEmail().withMessage("Valid Email is Required"), 
    body('password').escape().trim().notEmpty().isLength({min:5}).withMessage('Password is required'), 
    body('firstName').escape().trim().notEmpty().withMessage('first name is required'), 
    body('lastName').escape().trim().notEmpty().withMessage('last name is required')
] 

const  logInValidate = [ 
    body('email').trim().escape().notEmpty().isEmail().withMessage("Valid Email is Required"), 
    body('password').trim().escape().notEmpty().withMessage('Password is required')
]

const orderValidate = [
    body("order.*.amount").trim().escape().notEmpty().withMessage("amount is required"),
    body("order.*.size").trim().escape().notEmpty().withMessage("size is required"),
    body("address.city").trim().escape().notEmpty().withMessage("city is required"),
    body("address.subCity").trim().escape().notEmpty().withMessage("subCity is required"),
    body("address.streetName").trim().escape().notEmpty().withMessage("streetName is required"),
    body("address.houseNumber").trim().escape().notEmpty().withMessage("houseNumber is required"),
    body("address.phoneNumber").trim().escape().notEmpty().withMessage("phoneNumber is required"),
]
export {signUpValidate, logInValidate, orderValidate }
