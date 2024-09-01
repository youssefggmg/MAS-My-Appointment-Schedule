"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswored = exports.frgetPasswored = exports.signin = exports.signup = void 0;
const hachPassword_1 = require("../utils/hachPassword");
const compairpasswored_1 = require("../utils/compairpasswored");
const jwt_1 = require("../utils/jwt");
const user_1 = require("../models/user");
const db_1 = __importDefault(require("../models/db"));
const http_status_codes_1 = require("http-status-codes");
const passworedResetmailer_1 = __importDefault(require("../mailer/passworedResetmailer"));
const index_1 = require("../errors/index");
const express_validator_1 = require("express-validator");
(0, db_1.default)();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error.array() });
        }
        const hashedPassword = yield (0, hachPassword_1.hashPassword)(password);
        const user = yield user_1.User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });
        const token = yield (0, jwt_1.createtoken)(user);
        console.log(token);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ token: token });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error.array() });
        }
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: new index_1.BadRequestError("something is wrong try again") });
        }
        const Match = yield (0, compairpasswored_1.compairPassword)(password, user.password);
        if (!Match) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: new index_1.BadRequestError("something is wrong try again") });
        }
        const token = yield (0, jwt_1.createtoken)(user);
        res.status(http_status_codes_1.StatusCodes.OK).json({ token });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.signin = signin;
const frgetPasswored = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.User.findOne({ email });
    // console.log(user);
    const userId = user._id;
    const userEmail = user.email;
    console.log(userEmail);
    const link = `api/auth/reset/${userId}`;
    (0, passworedResetmailer_1.default)(userEmail, "passwored reset", link);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "password reset link sent to your email" });
});
exports.frgetPasswored = frgetPasswored;
const changePasswored = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const { id } = req.params;
        const user = yield user_1.User.findById({
            _id: id
        });
        const hashedPassword = yield (0, hachPassword_1.hashPassword)(password);
        user.password = hashedPassword;
        yield user.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "password changed successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.changePasswored = changePasswored;
//# sourceMappingURL=authcontroller.js.map