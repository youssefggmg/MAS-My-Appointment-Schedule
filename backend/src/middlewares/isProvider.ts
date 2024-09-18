import { Request,Response,NextFunction } from "express";
import {StatusCodes} from "http-status-codes"

export const isProvider = async (req:Request,res:Response,next:NextFunction) => {
    const {role} = req.user.user
    if(role !== 'provider'){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:'You are not a provider'})
    }
    next()
}
