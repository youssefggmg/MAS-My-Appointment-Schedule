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
const userrout_1 = __importDefault(require("./routers/userrout"));
const userAppontmentrout_1 = __importDefault(require("./routers/userAppontmentrout"));
const becomeProviderRouter_1 = __importDefault(require("./routers/becomeProviderRouter"));
const serviceRouter_1 = __importDefault(require("./routers/provider/serviceRouter"));
const db_1 = __importDefault(require("./models/db"));
const appointments_1 = __importDefault(require("./routers/provider/appointments"));
const providerInfo_1 = __importDefault(require("./routers/providerInfo"));
const endsubscreption_1 = require("./cronejobs/endsubscreption");
const userReport_1 = __importDefault(require("./routers/userReport"));
const userReport_2 = __importDefault(require("./routers/userReport"));
const validatetoken_1 = require("./routers/validatetoken");
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
(0, db_1.default)();
dotenv_1.default.config();
const port = process.env.port || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.use("/api", authrouter_1.default);
app.use("/api", dashboardrout_1.default);
app.use("/api", searshrouter_1.default);
app.use("/api", userrout_1.default);
app.use("/api", userAppontmentrout_1.default);
app.use("/api", becomeProviderRouter_1.default);
app.use("/api", serviceRouter_1.default);
app.use("/api", appointments_1.default);
app.use("/api", userReport_1.default);
app.use("/api", userReport_2.default);
app.use("/api", validatetoken_1.validate);
app.use("/api", providerInfo_1.default);
endsubscreption_1.crone.start();
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map