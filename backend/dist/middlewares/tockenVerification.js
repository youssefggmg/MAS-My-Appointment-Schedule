"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tockenVirification = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secritkey = process.env.jwtToken;
const tockenVirification = (req, res, next) => {
    try {
        // console.log("started")
        const { authorization } = req.headers;
        // console.log("token" + authorization);
        if (!authorization) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: new unauthenticated_1.default("no token provided ") });
        }
        const token = authorization.split(" ")[1];
        // console.log("the token " ,token);
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: new unauthenticated_1.default("no token provided ") });
        }
        const payload = jsonwebtoken_1.default.verify(token, secritkey);
        req.user = payload;
        // console.log("complaited token ");
        next();
    }
    catch (error) {
        // console.log(error.message);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
exports.tockenVirification = tockenVirification;
//# sourceMappingURL=tockenVerification.js.map