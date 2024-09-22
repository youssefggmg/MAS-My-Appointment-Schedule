import express from "express"
import {Request,Response} from "express"

import { tockenVirification } from "../middlewares/tockenVerification"

const validate=express.Router();

validate.route("/validate").get(tockenVirification,(req:Request,res:Response)=>{
    res.json({message:"token is valid",user:req.user.user})
})
