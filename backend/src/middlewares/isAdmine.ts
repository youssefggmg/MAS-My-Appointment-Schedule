import { Request,Response,NextFunction } from "express";
import {StatusCodes} from "http-status-codes"

export const isAdmin = async (req:Request,res:Response,next:NextFunction) => {
    const {role} = req.user.user
    if(role !== 'admine'){
        return res.status(StatusCodes.FORBIDDEN).json({message:'You are not authorized to access this resource.'});
    }
    next();
}
