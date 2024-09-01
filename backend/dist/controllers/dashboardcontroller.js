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
    // I did not want to use any but nothing else worke 
    try {
        const providers = yield user_1.User.find({
            role: "provider"
        });
        if (!providers) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "sory we have no providers yet 😔😓" });
        }
        console.log(providers);
        const allServices = yield service_1.service.find({
            providerId: { $in: providers.map((provider) => { provider._id; }) },
            subscriptionActive: true
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ providers, allServices });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allproviders = allproviders;
//# sourceMappingURL=dashboardcontroller.js.map