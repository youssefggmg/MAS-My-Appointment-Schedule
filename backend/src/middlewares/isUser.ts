import { Request,Response,NextFunction } from "express";
import {StatusCodes} from "http-status-codes"

export const isUser = async (req:Request,res:Response,next:NextFunction) => {
    const {role} = req.user.user
    if(role !== 'user'){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:'You are not authorized to access this resource'});
    }
    next();
}
