"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const tockenVerification_1 = require("../middlewares/tockenVerification");
const uploudImage_1 = __importDefault(require("../middlewares/uploudImage"));
const userRouter = express_1.default.Router();
userRouter.route("/user/info").get(tockenVerification_1.tockenVirification, usercontroller_1.userinfo);
userRouter.route("/user/updateinfo").patch(tockenVerification_1.tockenVirification, uploudImage_1.default.single("file"), usercontroller_1.updateuserinfo);
exports.default = userRouter;
//# sourceMappingURL=userrout.js.map