import { appointment } from "../models/appointments"
import { User } from "../models/user"
import { service } from "../models/service"
import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index"



export const bookAppointment = async (req: Request, res: Response) => {
    try {
        const { providerId, serviceId } = req.body;
        const user = req.user?.user; 
        if (!providerId || !serviceId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "providerId and serviceId are required" });
        }

        const theProvider = await User.findById(providerId);
        
        if (!theProvider || theProvider.role !== "provider") {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Provider not found or invalid role" });
        }

        const theService = await service.findById(serviceId);
        if (!theService) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Service not found" });
        }

        const theAppointment = await appointment.create({
            userId: user._id,
            providerId: providerId,
            serviceId: serviceId,
        });

        return res.status(StatusCodes.CREATED).json({ appointment: theAppointment, message: "Your appointment was created" });

    } catch (err: any) {
        console.error(err); // Consider replacing with proper logger in production
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error", details: err.message });
    }
};


export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const user = req.user.user;
        const theAppointment = await appointment.findById(appointmentId);
        const theUser = await User.findById(user._id);
        // nocapp means number numberOfCancelledAppointments
        const nocapp: any = { cancelledAppointments: user.cancelledAppointments++ };
        if (nocapp > 3) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: new NotFoundError("you have reatched you limet you cannot cancella nother appointment") });
        }

        const status = { status: "cancelled" }
        if (!theAppointment) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: new NotFoundError("appointment not found") });
        }
        const cancel = await appointment.findByIdAndUpdate({ _id: appointmentId }, { $set: status })
        const Cuser = await User.findByIdAndUpdate({ _id: user._id }, { $set: nocapp })
        return res.status(StatusCodes.OK).json({ message: "appointment cancelled" });
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const allAppointments = async (req: Request, res: Response) => {
    try {
        const userID = req.user.user._id;

        // Populate the provider (for the image) and service information
        const allAppointments = await appointment.find({
            userId: userID
        })
        .populate({
            path: 'providerId', 
            select: 'Image', 
        })
        .populate({
            path: 'serviceId', 
            select: 'name description price', 
        });

        return res.status(StatusCodes.OK).json({ allAppointments });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
