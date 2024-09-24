import { Request, Response } from "express";
import { User } from "../models/user"; 
import { service } from "../models/service";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongoose";

// Interface for User
interface IUser {
    _id: ObjectId; 
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    Image: string;
    role?: 'user' | 'provider' | 'admin';
    createdAt?: Date;
    cancelledAppointments?: number;
}

// Interface for Service
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

// Controller to fetch all services with provider info
export const allproviders = async (req: Request, res: Response) => {
    try {
        // Fetch all available services with populated provider info
        const allServices: IService[] = await service.find({ availability: true })
            .populate({
                path: 'providerId', // Populate provider info
                select: 'name email phoneNumber Image' // Only select necessary fields
            })
            .lean();

        if (allServices.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "No available services found" });
        }

        return res.status(StatusCodes.OK).json({ services: allServices });
        
    } catch (err: any) {
        console.error("Error fetching services or providers:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
