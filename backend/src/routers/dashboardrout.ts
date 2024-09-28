import  express  from "express";
import { allproviders } from "../controllers/dashboardcontroller";
import { tockenVirification } from "../middlewares/tockenVerification";

const dashboardrouter = express.Router();

dashboardrouter.route("/dash").get(tockenVirification,allproviders)
export default dashboardrouter