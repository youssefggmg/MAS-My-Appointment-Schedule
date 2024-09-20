import express from "express";
import { tockenVirification } from "../../middlewares/tockenVerification";
import { allRepports, reportUser, removeProviderReport } from "../../controllers/providers_controllers/provideReports";
import { isProvider } from "../../middlewares/isProvider";

const reportRouter = express.Router();

// Route to get all reports made by the provider
reportRouter.route("/report/getll").get(tockenVirification, isProvider, allRepports);

// Route to allow the provider to report a user
reportRouter.route("/report/report").post(tockenVirification, isProvider, reportUser);

// Route to allow the provider to remove their own report
reportRouter.route("/report/remouveReport").delete(tockenVirification, isProvider, removeProviderReport);

export default reportRouter;
