"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isUser_1 = require("../middlewares/isUser");
const tockenVerification_1 = require("../middlewares/tockenVerification");
const becomProvider_1 = require("../controllers/providers_controllers/becomProvider");
const becomeProviderRouter = express_1.default.Router();
becomeProviderRouter.route("/User/activate").patch(tockenVerification_1.tockenVirification, isUser_1.isUser, becomProvider_1.becomeProvider);
exports.default = becomeProviderRouter;
//# sourceMappingURL=becomeProviderRouter.js.map