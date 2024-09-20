import {body} from "express-validator";


export const infovalidator =[
    body("phoneNumber").optional().notEmpty().isString().isLength({min:10 , max:10}).withMessage({error:"please enter a valide phone number"})
]