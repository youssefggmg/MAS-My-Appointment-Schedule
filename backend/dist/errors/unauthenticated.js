"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class UnAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnAuthenticatedError";
        this.message = message;
        this.statusCode = http_status_codes_1.default.UNAUTHORIZED;
    }
}
exports.default = UnAuthenticatedError;
