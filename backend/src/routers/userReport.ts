import express  from "express";
import { tockenVirification } from "../middlewares/tockenVerification";
import { allMyReports,removeReport,reportProvider} from "../controllers/reportprovider"
import { isUser } from "../middlewares/isUser";


const providerReportRout = express.Router();

providerReportRout.route("/report/getll").get(tockenVirification,isUser,allMyReports);
providerReportRout.route("/report/report").post(tockenVirification,isUser,reportProvider);
providerReportRout.route("/report/remouveReport").delete(tockenVirification,isUser,removeReport);

export default providerReportRout