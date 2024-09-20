import cron from "node-cron";
import { User } from "../models/user";
import { StatusCodes } from "http-status-codes";

// Function to update users whose subscriptions have ended
const updateExpiredSubscriptions = async () => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Find users whose subscriptionEndDate is less than or equal to the current date
        const expiredUsers = await User.find({
            subscriptionEndDate: { $lte: currentDate }
        });

        if (expiredUsers.length > 0) {
            // Update the role or status of expired users
            await User.updateMany(
                { subscriptionEndDate: { $lte: currentDate } },
                { $set: { role: "user", subscriptionActive: false } } // Reset role and subscription status
            );

            console.log(`Updated ${expiredUsers.length} users to inactive status.`);
        } else {
            console.log("No expired subscriptions found.");
        }
    } catch (err) {
        console.error("Error updating expired subscriptions:", err);
    }
};

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", () => {
    console.log("Checking for expired subscriptions...");
    updateExpiredSubscriptions();
});