"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchcontroller_1 = require("../controllers/searchcontroller");
const searchrout = express_1.default.Router();
searchrout.route("search/:name").get(searchcontroller_1.searchByProviderName);
searchrout.route("search/:city").get(searchcontroller_1.searchByCity);
searchrout.route("search/:availability").get(searchcontroller_1.searchByavailability);
searchrout.route("search/:availability").get(searchcontroller_1.searchByserviceName);
exports.default = searchrout;
//# sourceMappingURL=searshrouter.js.map