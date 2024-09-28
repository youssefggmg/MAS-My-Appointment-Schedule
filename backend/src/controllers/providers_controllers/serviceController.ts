import { Request, Response } from "express";
import { service } from "../../models/service";
import { User } from "../../models/user";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";

// post

export const createService = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        const { name, workTime, description, city, price, contactMethod } = req.body;
        const providerId = req.user.user._id;

        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid data", errors: errors.array() });
        }

        const newService = await service.create({
            providerId,
            name,
            description,
            workTime,
            city,
            price,
            contactMethod,
        });

        await User.findByIdAndUpdate(providerId, {
            $push: { services: newService._id }
        });

        res.status(StatusCodes.CREATED).json({ message: "Service created successfully", newService });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

// patch
export const updateServiceDetailes = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        const { name, workTime, description, city, availability, price, contactMethod } = req.body;
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid data", errors: errors });
        }
        const serviceId = req.params.id;
        const updatedService = await service.findByIdAndUpdate(
            serviceId,
            {
                $set: {
                    name,
                    workTime,
                    description,
                    city,
                    availability,
                    price,
                    contactMethod
                }
            },
            { new: true }
        );
        res.status(StatusCodes.OK).json({ message: "Service updated successfully", updatedService });
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

// delete 

export const deleteservice= async (req:Request,res:Response) => {
    try {
        const serviceId = req.params.id;
        const providerID =req.user.user._id;
        console.log(providerID);
        const Service = await service.findById(serviceId);
        if (!Service) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Service not found" });
            }
            if (!Service.providerId.equals(providerID)) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to delete this service" });
            }

        const deletedService = await service.findByIdAndDelete(serviceId);
        res.status(StatusCodes.OK).json({ message: "Service deleted successfully", deletedService });
    } catch (err:any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
