import { Request, Response } from "express";
import { User } from "../../models/user";
import { appointment } from "../../models/appointments";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../../errors/index";
import { StatusCodes } from "http-status-codes";
import { acceptedMail } from "../../mailer/appointmentAcceptedmail";




// all appointments of the provider 


export const allApointments = async (req: Request, res: Response) => {
    try {
        const providerID = req.user.user._id;
        const allAppointment = await appointment.find({
            provider: providerID
        });
        res.status(StatusCodes.OK).json(allAppointment);
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const accepteAppointment = async (req: Request, res: Response) => {
    try {
        const providerID = req.user.user._id;
        const appointmentID = req.params.id;
        const { notes, date } = req.body
        const Appointment = await appointment.findById({
            _id: appointmentID
        });
        if (!Appointment) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: new NotFoundError('Appointment not found') });
        }
        if (Appointment?.providerId !== providerID) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: new UnAuthenticatedError('You are not authorized to accept this appointment') });
        }
        const accepted = await appointment.findByIdAndUpdate(
            appointmentID,
            {
                $set:
                {
                    status: 'accepted',
                    notes,
                    date
                }
            },
            { new: true }
        )
        const clientID= Appointment.userId
        const client = await User.findById(clientID)
        const provider = await User.findById(providerID)
        const clientMail = client?.email!;
        const clientName = client?.name!;
        const providerName= provider?.name!;

        acceptedMail(clientMail,"appointment accepted",providerName,date,clientName);
        res.status(StatusCodes.OK).json(accepted);
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const cancellAppointment = async (req: Request, res: Response) => {
    try {
        const providerID = req.user.user._id;
        const appointmentID = req.params.id;
        const { notes, date } = req.body
        const Appointment = await appointment.findById({
            _id: appointmentID
        });
        if (!Appointment) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: new NotFoundError('Appointment not found') });
        }
        if (Appointment?.providerId !== providerID) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: new UnAuthenticatedError('You are not authorized to accept this appointment') });
        }
        const cancelled = await appointment.findByIdAndUpdate(
            appointmentID,
            {
                $set:
                {
                    status: 'cancelled',
                    notes,
                }
            },
            { new: true }
        )
        res.status(StatusCodes.OK).json(cancelled);

    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
