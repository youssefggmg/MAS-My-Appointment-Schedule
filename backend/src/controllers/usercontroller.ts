import { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/hachPassword";



export const userinfo = async (req: Request, res: Response) => {
    try {
        const user = req.user.user;
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json(new UnAuthenticatedError('Please login first'));
        }
        const userinfo = await User.findOne({
            _id: user._id
        })
        res.status(StatusCodes.OK).json(userinfo);
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
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json(new BadRequestError("Invalid input"));
        }

        if (user.user.role !== "user") {
            return res.status(StatusCodes.FORBIDDEN).json(new UnAuthenticatedError("You are not authorized to update user info"));
        }

        const { name, password, phoneNumber }: any = req.body;
        console.log(req.body);
        
        const updateFields: any = {};

        // Optional: Only add fields to update if they are provided222
        if (name) updateFields.name = name;
        if (password) {
            const Newpassword = await hashPassword(password);
            updateFields.password = Newpassword;
        }
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;

        // Check if a file is provided and update Image field if it exists
        if (req.file) {
            const Image: any = req.file.path;
            updateFields.Image = Image;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { $set: updateFields },
            { new: true }
        );
        console.log(updatedUser);

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json({ message: "User info updated successfully", updatedUser });
    } catch (err: any) {
        console.log(err, "hjkashdka");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

