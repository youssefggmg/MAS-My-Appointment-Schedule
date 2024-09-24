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
exports.allproviders = void 0;
const service_1 = require("../models/service");
const http_status_codes_1 = require("http-status-codes");
// Controller to fetch all services with provider info
const allproviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all available services with populated provider info
        const allServices = yield service_1.service.find({ availability: true })
            .populate({
            path: 'providerId', // Populate provider info
            select: 'name email phoneNumber Image' // Only select necessary fields
        })
            .lean();
        if (allServices.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No available services found" });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ services: allServices });
    }
    catch (err) {
        console.error("Error fetching services or providers:", err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allproviders = allproviders;
//# sourceMappingURL=dashboardcontroller.js.map