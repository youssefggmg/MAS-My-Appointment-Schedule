"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controllers/authcontroller");
const authValidators_1 = require("../validators/authValidators");
const authrouter = express_1.default.Router();
authrouter.route("/signup").post(authValidators_1.regesterValidator, authcontroller_1.signup);
authrouter.route("/signin").post(authValidators_1.logeInValidator, authcontroller_1.signin);
authrouter.route("/forgetpassword").post(authcontroller_1.frgetPasswored);
authrouter.route("/changepassword/:id").post(authcontroller_1.changePasswored);
exports.default = authrouter;
