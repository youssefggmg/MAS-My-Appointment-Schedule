import express from "express";
import { isUser } from "../middlewares/isUser";
import { tockenVirification } from "../middlewares/tockenVerification";
import { becomeProvider,createProviderInfo,updateProviderInfo } from "../controllers/providers_controllers/becomProvider";
import {createProviderValidation,updateProviderValidation} from "../validators/validateProviderinfo"
import { isProvider } from "../middlewares/isProvider";

const becomeProviderRouter = express.Router();

becomeProviderRouter.route("/User/activate").patch(tockenVirification,isUser,becomeProvider);
becomeProviderRouter.route("/User/providerinfo").post(tockenVirification,isProvider,createProviderValidation,createProviderInfo);
becomeProviderRouter.route("/User/providerinfo").patch(tockenVirification,isProvider,updateProviderValidation,updateProviderInfo);


export default becomeProviderRouter