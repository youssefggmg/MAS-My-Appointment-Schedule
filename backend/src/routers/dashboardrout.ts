import  express  from "express";
import { allproviders } from "../controllers/dashboardcontroller";

const dashboardrouter = express.Router();

dashboardrouter.route("/dash").get(allproviders)
export default dashboardrouter