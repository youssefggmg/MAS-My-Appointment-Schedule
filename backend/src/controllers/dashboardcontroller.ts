import { Request, Response } from "express";
import { User } from "../models/user";
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import dbConnection from "../models/db";


interface IUser {
    _id: string,
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: 'user' | 'provider' | 'admin';
    createdAt?: Date;
    cancelledAppointments?: number;
}

export const allproviders = async (req: Request, res: Response) => {
    // I did not want to use any but nothing else worke 
    try {
        const providers: any = await User.find({
            role: "provider"
        })
        if (!providers) {
            res.status(StatusCodes.NOT_FOUND).json({ error: "sory we have no providers yet 😔😓" })
        }
        console.log(providers);
        const allServices = await service.find({
            providerId:{$in:providers.map((provider:any )=>{provider._id})},
            subscriptionActive :true
        })
        res.status(StatusCodes.OK).json({providers,allServices})
    } catch (err:any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
