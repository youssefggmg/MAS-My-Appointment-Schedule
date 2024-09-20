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
exports.updateProviderInfo = exports.createProviderInfo = exports.becomeProvider = void 0;
const user_1 = require("../../models/user");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../../errors/index");
const express_validator_1 = require("express-validator");
const providerinfo_1 = require("../../models/providerinfo");
const becomeProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.user;
        // Calculate the new subscription end date (1 month from now)
        const currentDate = new Date();
        const subscriptionEndDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        const provider = yield user_1.User.findByIdAndUpdate(user._id, { $set: { role: "provider",
                subscriptionEndDate,
                subscriptionStatus: true,
            } }, { new: true });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: `you have become a service ${user.name} provider` });
    }
    catch (err) {
        console.log(err.message);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error" });
    }
});
exports.becomeProvider = becomeProvider;
const createProviderInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        const { jobTitle, aboutMe, availability } = req.body;
        const user = req.user.user;
        // Ensure the user is authenticated
        if (!user) {
            throw new index_1.BadRequestError("User not authenticated");
        }
        // Create a new provider information document
        const providerInfo = yield providerinfo_1.Provider.create({
            userId: user.user._id,
            jobTitle,
            aboutMe,
            availability
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Provider info created successfully",
            providerInfo
        });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.createProviderInfo = createProviderInfo;
const updateProviderInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        const { jobTitle, aboutMe, availability } = req.body;
        const user = req.user;
        if (!user) {
            throw new index_1.BadRequestError("User not authenticated");
        }
        const updatedProviderInfo = yield providerinfo_1.Provider.findOneAndUpdate({ userId: user.user._id }, { $set: { jobTitle, aboutMe, availability } }, { new: true });
        if (!updatedProviderInfo) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "Provider info not found"
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Provider info updated successfully",
            updatedProviderInfo
        });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.updateProviderInfo = updateProviderInfo;
//# sourceMappingURL=becomProvider.js.map