import { User } from "../../models/user";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../../errors/index";
import mongoose from "mongoose";

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