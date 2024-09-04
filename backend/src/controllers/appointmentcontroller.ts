import { appointment } from "../models/appointments"
import { User } from "../models/user"
import { service } from "../models/service"
import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index"


export const bookAppointment = async (req: Request, res: Response) => {
    try {
        const { providerId, note, serviceId } = req.body;
        const user = req.user.user;
        const theProvider = await user.findById(providerId)
        if (!theProvider) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: new BadRequestError("provider not found") });
        }
        if (theProvider.role !== "provider") {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: new BadRequestError("provider not found") });
        }
        const theService = await service.findById(serviceId)
        if (!theService) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: new BadRequestError("service not found") });
        }
        const theAppointment = await appointment.create({
            userId: user._id,
            providerId: providerId,
            note
        });
        return res.status(StatusCodes.CREATED).json({ appointment: theAppointment, message: "your appointment what created" });
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

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
