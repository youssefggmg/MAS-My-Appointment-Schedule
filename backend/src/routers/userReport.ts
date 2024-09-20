import express  from "express";
import { tockenVirification } from "../middlewares/tockenVerification";
import { allMyReports,removeReport,reportProvider} from "../controllers/reportprovider"
import { isUser } from "../middlewares/isUser";


const reportRouter = express.Router();

reportRouter.route("/report/getll").get(tockenVirification,isUser,allMyReports);
reportRouter.route("/report/report").post(tockenVirification,isUser,reportProvider);
reportRouter.route("/report/remouveReport").delete(tockenVirification,isUser,removeReport);
