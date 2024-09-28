import  express  from "express";
import { getProviderInfo } from "../controllers/providerinfo";
import { tockenVirification } from "../middlewares/tockenVerification";

const providerInfo = express.Router();

providerInfo.route("/provider/:id").get(tockenVirification,getProviderInfo);
export default providerInfo;