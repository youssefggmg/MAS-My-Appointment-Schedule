"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authrouter_1 = __importDefault(require("./routers/authrouter"));
dotenv_1.default.config();
const port = process.env.port || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authrouter_1.default);
app.listen(port, () => { console.log(`server is running on port ${port}`); });
