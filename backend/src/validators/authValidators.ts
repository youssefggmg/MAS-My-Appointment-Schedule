import {body} from "express-validator"

export const regesterValidator = [
    body("name").not().isEmpty().withMessage({error:"you most have a name"}),
    body("email").isEmail().not().isEmpty().withMessage({error:"youmust enter a valide email"}),
    body("password").notEmpty().isLength({min:6}).withMessage({error:"passwored must be 6 charecters at leat"}),
    body("phoneNumber").notEmpty().isString().isLength({min:10 , max:10}).withMessage({error:"please enter a valide phone number"})
]

export const logeInValidator =[
    body("email").isEmail().not().isEmpty().withMessage({error:"youmust enter email"}),
    body("password").isLength({min:6}).not().isEmpty().withMessage({error: "password must be 6 charecters at leat"})
]
