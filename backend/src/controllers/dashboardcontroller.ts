import { Request,Response } from "express";
import { User } from "../models/user";
import { provider } from "../models/provider";
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import dbConnection from "../models/db";

const allproviders = async (req:Request,res:Response) => {
    const providers = await User.find({
        role: "provider"
    }) 
    if(!providers){
        res.status(StatusCodes.NOT_FOUND).json({error:"sory we have no providers yet 😔😓"})
    }
    const provider = await User.findOne({
        
    })
}