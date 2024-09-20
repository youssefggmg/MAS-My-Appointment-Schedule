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
const user_1 = require("../models/user");
const service_1 = require("../models/service");
const http_status_codes_1 = require("http-status-codes");
const allproviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all users with the 'provider' role
        const providers = yield user_1.User.find({
            role: "provider"
        });
        if (providers.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "Sorry, we have no providers yet 😔😓" });
        }
        // Find all services where providerId matches any of the provider IDs and the subscription is active
        const allServices = yield service_1.service.find({
            providerId: { $in: providers.map((provider) => provider._id) },
            subscriptionActive: true
        });
        // Respond with both the providers and their services
        return res.status(http_status_codes_1.StatusCodes.OK).json({ providers, allServices });
    }
    catch (err) {
        console.error("Error fetching providers or services:", err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allproviders = allproviders;
//# sourceMappingURL=dashboardcontroller.js.map