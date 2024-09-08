import { User } from "../models/user";
import { Report } from "../models/report";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";

export const reportProvider = async (req: Request, res: Response) => {
    try {
        const user = req.user.user;
        const { providerId, reason } = req.body;
        if (!reason) {
            res.status(StatusCodes.BAD_REQUEST).json(new BadRequestError('Reason is required'));
        }
        const report = Report.create({
            reporterId: user._id,
            reportedId: providerId,
            reason,
            type: "client",
        })
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }


}