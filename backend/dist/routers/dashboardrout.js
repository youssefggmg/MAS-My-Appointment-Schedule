"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardcontroller_1 = require("../controllers/dashboardcontroller");
const tockenVerification_1 = require("../middlewares/tockenVerification");
const dashboardrouter = express_1.default.Router();
dashboardrouter.route("/dash").get(tockenVerification_1.tockenVirification, dashboardcontroller_1.allproviders);
exports.default = dashboardrouter;
//# sourceMappingURL=dashboardrout.js.map