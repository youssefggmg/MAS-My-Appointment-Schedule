import express from "express"
import { signin, signup, changePasswored, frgetPasswored } from "../controllers/authcontroller"
import { logeInValidator, regesterValidator } from "../validators/authValidators"



const authrouter = express.Router();

authrouter.route("/auth/signup").post(regesterValidator, signup);
authrouter.route("/auth/signin").post(logeInValidator, signin);
authrouter.route("/auth/forgetpassword").post(frgetPasswored);
authrouter.route("/auth/changepassword/:id").patch(changePasswored);


export default authrouter;