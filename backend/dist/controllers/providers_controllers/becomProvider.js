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
exports.becomeProvider = void 0;
const user_1 = require("../../models/user");
const http_status_codes_1 = require("http-status-codes");
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
//# sourceMappingURL=becomProvider.js.map