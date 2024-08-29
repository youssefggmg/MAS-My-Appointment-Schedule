import express from "express"
import { signin, signup, changePasswored, frgetPasswored } from "../controllers/authcontroller"
import { logeInValidator, regesterValidator } from "../validators/authValidators"


const authrouter = express.Router();

authrouter.route("/signup").post(regesterValidator, signup);
authrouter.route("/signin").post(logeInValidator, signin);
authrouter.route("/forgetpassword").post(frgetPasswored);
authrouter.route("/changepassword/:id").post(changePasswored);

export default authrouter;