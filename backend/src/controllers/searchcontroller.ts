import { Request, Response } from "express";
import { User } from "../models/user";
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import dbConnection from "../models/db";


export const searchByProviderName = async (req: Request, res: Response) => {
    try {
        const { name } = req.query
        const user: any = await User.findOne({
            name,
            role: "provider"
        })
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json(new NotFoundError("provider not found"))
        }
        const services = await service.find({ provider: user._id });
        res.status(StatusCodes.OK).json({ user, services });

    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const searchByserviceName = async (req: Request, res: Response) => {
    try {
        const { serviceName } = req.query;
        const theService: any = await service.findOne({
            name: serviceName
        })
        if (!theService) {
            res.status(StatusCodes.NOT_FOUND).json(new NotFoundError("service not found"))
        }
        const provider = User.find({ _id: theService.providerId })
        res.status(StatusCodes.OK).json({ provider, theService });
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const searchByCity = async (req: Request, res: Response) => {
    try {
        const { city } = req.params
        const services = await service.find({
            city
        })
        if (!services) {
            res.status(StatusCodes.NOT_FOUND).json(new NotFoundError("sorry we have no service in this city try another one 😓😓"))
        }
        const providers = await User.find({ _id: { $in: services.map((service: any) => { return service.providerId }) } })
        res.status(StatusCodes.OK).json({ providers, services })
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
export const searchByavailability = async (req: Request, res: Response) => {
    try {
        const { availability } = req.params
        const services = await service.find({ availability })
        if (!services) {
            res.status(StatusCodes.NOT_FOUND).json(new NotFoundError("sorry we have no availabil services"))
            }
            const providers ={
                _id: {$in : services.map((service:any)=>{service.providerId})}
            }
            res.status(StatusCodes.OK).json({services,providers})
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
