"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controllers/authcontroller");
const authValidators_1 = require("../validators/authValidators");
const authrouter = express_1.default.Router();
authrouter.route("/auth/signup").post(authValidators_1.regesterValidator, authcontroller_1.signup);
authrouter.route("/auth/signin").post(authValidators_1.logeInValidator, authcontroller_1.signin);
authrouter.route("/auth/forgetpassword").post(authcontroller_1.frgetPasswored);
authrouter.route("/auth/changepassword/:id").patch(authcontroller_1.changePasswored);
exports.default = authrouter;
//# sourceMappingURL=authrouter.js.map