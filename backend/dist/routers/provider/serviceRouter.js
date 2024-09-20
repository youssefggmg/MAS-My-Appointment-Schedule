"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isProvider_1 = require("../../middlewares/isProvider");
const serviceValidator_1 = require("../../validators/serviceValidator");
const updateServiceValidator_1 = require("../../validators/updateServiceValidator");
const tockenVerification_1 = require("../../middlewares/tockenVerification");
const serviceController_1 = require("../../controllers/providers_controllers/serviceController");
const servicerouter = express_1.default.Router();
servicerouter.route("/service/create").post(tockenVerification_1.tockenVirification, isProvider_1.isProvider, serviceValidator_1.serviceValidator, serviceController_1.creatService);
servicerouter.route("/service/delete/:id").delete(tockenVerification_1.tockenVirification, isProvider_1.isProvider, serviceController_1.deleteservice);
servicerouter.route("/service/update/:id").delete(tockenVerification_1.tockenVirification, isProvider_1.isProvider, updateServiceValidator_1.updatedService, serviceController_1.updateServiceDetailes);
exports.default = servicerouter;
//# sourceMappingURL=serviceRouter.js.map