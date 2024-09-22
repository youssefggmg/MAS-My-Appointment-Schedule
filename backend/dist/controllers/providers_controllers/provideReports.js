"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProviderReport = exports.reportUser = exports.allRepports = void 0;
const user_1 = require("../../models/user");
const report_1 = require("../../models/report");
const http_status_codes_1 = require("http-status-codes");
const allRepports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerID = req.user.user._id;
        const reports = yield report_1.Report.find({ reporterId: providerID });
        if (!reports || reports.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'No reports found for this provider.' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ reports });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allRepports = allRepports;
const reportUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = req.user.user;
        const { userId, reason } = req.body;
        if (!reason) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Reason is required' });
        }
        const reportedUser = yield user_1.User.findById(userId);
        if (!reportedUser) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        const report = yield report_1.Report.create({
            reporterId: provider._id,
            reportedId: userId,
            reason,
            type: "provider",
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Report successfully created", report });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.reportUser = reportUser;
const removeProviderReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = req.user.user_id;
        const { reportID } = req.body;
        // Find the report by ID
        const report = yield report_1.Report.findOne({ _id: reportID });
        if (!report) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'Report not found' });
        }
        if (report.reporterId !== provider._id) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to delete this report' });
        }
        // Delete the report
        yield report_1.Report.findByIdAndDelete(reportID);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Report removed successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.removeProviderReport = removeProviderReport;
//# sourceMappingURL=provideReports.js.map