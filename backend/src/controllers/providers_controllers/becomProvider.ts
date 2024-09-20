import { User } from "../../models/user";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../../errors/index";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { Provider } from "../../models/providerinfo";

export const becomeProvider = async (req: Request, res: Response) => {
    try {
        const user = req.user.user
        // Calculate the new subscription end date (1 month from now)
        const currentDate = new Date();
        const subscriptionEndDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        const provider= await User.findByIdAndUpdate(
            user._id,
            {$set:{role:"provider",
                subscriptionEndDate,
                subscriptionStatus:true,
            }},
            { new: true }
        );
        res.status(StatusCodes.OK).json({message:`you have become a service ${user.name} provider`});
    } catch (err: any) {
        console.log(err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
    }
}

export const createProviderInfo = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { jobTitle, aboutMe, availability } = req.body;
        const user = req.user.user;

        // Ensure the user is authenticated
        if (!user) {
            throw new BadRequestError("User not authenticated");
        }

        // Create a new provider information document
        const providerInfo = await Provider.create({
            userId: user.user._id,
            jobTitle,
            aboutMe,
            availability
        });

        return res.status(StatusCodes.CREATED).json({
            message: "Provider info created successfully",
            providerInfo
        });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

export const updateProviderInfo = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { jobTitle, aboutMe, availability } = req.body;
        const user = req.user;

        if (!user) {
            throw new BadRequestError("User not authenticated");
        }

        const updatedProviderInfo = await Provider.findOneAndUpdate(
            { userId: user.user._id },
            { $set: { jobTitle, aboutMe, availability } },
            { new: true }
        );

        if (!updatedProviderInfo) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Provider info not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Provider info updated successfully",
            updatedProviderInfo
        });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};