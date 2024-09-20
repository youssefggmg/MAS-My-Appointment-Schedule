"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isUser_1 = require("../middlewares/isUser");
const tockenVerification_1 = require("../middlewares/tockenVerification");
const becomProvider_1 = require("../controllers/providers_controllers/becomProvider");
const validateProviderinfo_1 = require("../validators/validateProviderinfo");
const isProvider_1 = require("../middlewares/isProvider");
const becomeProviderRouter = express_1.default.Router();
becomeProviderRouter.route("/User/activate").patch(tockenVerification_1.tockenVirification, isUser_1.isUser, becomProvider_1.becomeProvider);
becomeProviderRouter.route("/User/providerinfo").post(tockenVerification_1.tockenVirification, isProvider_1.isProvider, validateProviderinfo_1.createProviderValidation, becomProvider_1.createProviderInfo);
becomeProviderRouter.route("/User/providerinfo").patch(tockenVerification_1.tockenVirification, isProvider_1.isProvider, validateProviderinfo_1.updateProviderValidation, becomProvider_1.updateProviderInfo);
exports.default = becomeProviderRouter;
//# sourceMappingURL=becomeProviderRouter.js.map