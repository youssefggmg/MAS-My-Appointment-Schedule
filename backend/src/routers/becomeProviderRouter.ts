import express from "express";
import { isUser } from "../middlewares/isUser";
import { tockenVirification } from "../middlewares/tockenVerification";
import { becomeProvider } from "../controllers/providers_controllers/becomProvider";

const becomeProviderRouter = express.Router();

becomeProviderRouter.route("/User/activate").patch(tockenVirification,isUser,becomeProvider);

export default becomeProviderRouter