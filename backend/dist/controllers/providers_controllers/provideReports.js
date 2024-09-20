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
exports.newreport = exports.allRepports = void 0;
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
const newreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerID = req.user.user._id;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.newreport = newreport;
//# sourceMappingURL=provideReports.js.map