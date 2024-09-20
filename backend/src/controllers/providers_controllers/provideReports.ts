import { Request, Response } from "express";
import { User } from "../../models/user";
import { validationResult } from "express-validator";
import { Report } from "../../models/report";
import { StatusCodes } from "http-status-codes";


export const allRepports = async (req: Request, res: Response) => {
    try {
        const providerID = req.user.user._id;
        const reports = await Report.find({ reporterId: providerID });
        if (!reports || reports.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No reports found for this provider.' });
        }
        res.status(StatusCodes.OK).json({ reports });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}

export const newreport = async (req: Request, res: Response) => {
    try {
        const providerID = req.user.user._id;
        
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}