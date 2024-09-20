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
exports.reportProvider = void 0;
const report_1 = require("../models/report");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const reportProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.user;
        const { providerId, reason } = req.body;
        if (!reason) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new index_1.BadRequestError('Reason is required'));
        }
        const report = report_1.Report.create({
            reporterId: user._id,
            reportedId: providerId,
            reason,
            type: "client",
        });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.reportProvider = reportProvider;
//# sourceMappingURL=reportprovider.js.map