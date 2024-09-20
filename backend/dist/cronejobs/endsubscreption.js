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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const user_1 = require("../models/user");
// Function to update users whose subscriptions have ended
const updateExpiredSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current date
        const currentDate = new Date();
        // Find users whose subscriptionEndDate is less than or equal to the current date
        const expiredUsers = yield user_1.User.find({
            subscriptionEndDate: { $lte: currentDate }
        });
        if (expiredUsers.length > 0) {
            // Update the role or status of expired users
            yield user_1.User.updateMany({ subscriptionEndDate: { $lte: currentDate } }, { $set: { role: "user", subscriptionActive: false } } // Reset role and subscription status
            );
            console.log(`Updated ${expiredUsers.length} users to inactive status.`);
        }
        else {
            console.log("No expired subscriptions found.");
        }
    }
    catch (err) {
        console.error("Error updating expired subscriptions:", err);
    }
});
// Schedule the job to run every day at midnight
node_cron_1.default.schedule("0 0 * * *", () => {
    console.log("Checking for expired subscriptions...");
    updateExpiredSubscriptions();
});
//# sourceMappingURL=endsubscreption.js.map