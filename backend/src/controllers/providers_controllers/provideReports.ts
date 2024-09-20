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

export const reportUser = async (req: Request, res: Response) => {
    try {
        const provider = req.user.user;
        const { userId, reason } = req.body;

        if (!reason) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Reason is required' });
        }

        const reportedUser = await User.findById(userId);
        if (!reportedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }


        const report = await Report.create({
            reporterId: provider._id,
            reportedId: userId,
            reason,
            type: "provider",
        });

        res.status(StatusCodes.OK).json({ message: "Report successfully created", report });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

export const removeProviderReport = async (req: Request, res: Response) => {
    try {
        const provider = req.user.user_id
        const { reportID } = req.body;

        // Find the report by ID
        const report = await Report.findOne({ _id: reportID });

        if (!report) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Report not found' });
        }

        if (report.reporterId !== provider._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to delete this report' });
        }

        // Delete the report
        await Report.findByIdAndDelete(reportID);

        res.status(StatusCodes.OK).json({ message: 'Report removed successfully' });
    } catch (err: any) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};