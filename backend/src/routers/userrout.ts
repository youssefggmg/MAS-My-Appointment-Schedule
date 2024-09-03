import express  from "express";
import {updateuserinfo,userinfo } from "../controllers/usercontroller";
import { tockenVirification } from "../middlewares/tockenVerification";
import { infovalidator } from "../validators/updateinfoValidator";

const userRouter = express.Router();
userRouter.route("/user/info").get(tockenVirification,userinfo);
userRouter.route("/user/updateinfo").patch(tockenVirification,infovalidator,updateuserinfo);

export default userRouter