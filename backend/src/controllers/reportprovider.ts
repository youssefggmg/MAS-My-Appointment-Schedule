import { User } from "../models/user";
import { Report } from "../models/report";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";




export const allMyReports = async (req: Request, res: Response) => {
    try {
        const userID = req.user.user;
        const reports = await Report.find({ reporterId: userID });
        res.status(StatusCodes.OK).json(reports);
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

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

export const removeReport = async (req: Request, res: Response) => {
    try {
        const user = req.user.user;
        const { reportID } = req.body;
        const report = await Report.findOne({
            _id: reportID,
        })
        if (!report) {
            res.status(StatusCodes.NOT_FOUND).json(new NotFoundError('Report not found'))
        }
        if (report?.reporterId !== user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({error:'You are not authorized to delete this report'});
        }
        const removeReport = await Report.findByIdAndDelete(
            reportID
        )
        res.status(StatusCodes.OK).json({message: 'Report removed successfully'})
    } catch (err: any) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}