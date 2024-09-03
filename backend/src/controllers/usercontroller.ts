import { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";



export const userinfo = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json(new UnAuthenticatedError('Please login first'));
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const updateuserinfo = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        // Ensure req.user exists
        if (!user || !user.user) {
            return res.status(StatusCodes.UNAUTHORIZED).json(new UnAuthenticatedError("User not authenticated"));
        }

        const userID: string = user.user._id;
        console.log("got the userid");
        
        const errors = validationResult(req);

        if (user.user.role !== "user") {
            return res.status(StatusCodes.FORBIDDEN).json(new UnAuthenticatedError("You are not authorized to update user info"));
        }

        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json(new BadRequestError("Invalid input"));
        }

        const updateData: any = req.body 
        

        // Update the user document with the provided fields
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { $set: updateData },
            { new: true }
        );
        console.log("UPDAYED");
        

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json({ message: "User info updated successfully", updatedUser });
    } catch (err: any) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

