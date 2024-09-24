import { Request, Response } from "express";
import { User } from "../models/user";
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import { ObjectId } from "mongoose";

// Interface for User
interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: 'user' | 'provider' | 'admin';
    createdAt?: Date;
    cancelledAppointments?: number;
}

interface IService {
    _id: ObjectId;
    providerId: ObjectId;
    name: string;
    description: string;
    workTime: string;
    city: string;
    availability: boolean;
    price: number;
    contactMethod: string;
}

export const allproviders = async (req: Request, res: Response) => {
    try {
        const providers: IUser[] = await User.find({
            role: "provider"
        });

        if (providers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Sorry, we have no providers yet 😔😓" });
        }

        const allServices: IService[] = await service.find({
            providerId: { $in: providers.map((provider) => provider._id) },
            availability: true // Fetch only available services
        }).populate('providerId', 'name email phoneNumber').lean();

        // Respond with both the providers and their services
        return res.status(StatusCodes.OK).json({ providers, allServices });
        
    } catch (err: any) {
        console.error("Error fetching providers or services:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
