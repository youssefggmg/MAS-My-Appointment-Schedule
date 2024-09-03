"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authrouter_1 = __importDefault(require("./routers/authrouter"));
const dashboardrout_1 = __importDefault(require("./routers/dashboardrout"));
const searshrouter_1 = __importDefault(require("./routers/searshrouter"));
const db_1 = __importDefault(require("./models/db"));
const userrout_1 = __importDefault(require("./routers/userrout"));
(0, db_1.default)();
dotenv_1.default.config();
const port = process.env.port || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", authrouter_1.default);
app.use("/api", dashboardrout_1.default);
app.use("/api", searshrouter_1.default);
app.use("/api", userrout_1.default);
app.listen(port, () => { console.log(`server is running on port ${port}`); });
//# sourceMappingURL=app.js.map