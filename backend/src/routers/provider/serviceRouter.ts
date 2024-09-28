import express from "express";
import { isProvider } from "../../middlewares/isProvider";
import { serviceValidator } from "../../validators/serviceValidator";
import { updatedService } from "../../validators/updateServiceValidator";
import { tockenVirification } from "../../middlewares/tockenVerification";
import { createService, deleteservice, updateServiceDetailes } from "../../controllers/providers_controllers/serviceController";

const servicerouter = express.Router();

servicerouter.route("/service/create").post(tockenVirification,isProvider,serviceValidator,createService);
servicerouter.route("/service/delete/:id").delete(tockenVirification,isProvider,deleteservice);
servicerouter.route("/service/update/:id").patch(tockenVirification,isProvider,updatedService,updateServiceDetailes);

export default servicerouter;
