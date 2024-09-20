import { Request, Response } from "express";
import { User } from "../models/user";
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";

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

// Interface for Service
interface IService {
    _id: string;
    providerId: string;
    serviceName: string;
    subscriptionActive: boolean;
}

export const allproviders = async (req: Request, res: Response) => {
    try {
        // Find all users with the 'provider' role
        const providers: IUser[] = await User.find({
            role: "provider"
        });

        if (providers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Sorry, we have no providers yet 😔😓" });
        }

        // Find all services where providerId matches any of the provider IDs and the subscription is active
        const allServices: IService[] = await service.find({
            providerId: { $in: providers.map((provider) => provider._id) },
            subscriptionActive: true
        });

        // Respond with both the providers and their services
        return res.status(StatusCodes.OK).json({ providers, allServices });
        
    } catch (err: any) {
        console.error("Error fetching providers or services:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
