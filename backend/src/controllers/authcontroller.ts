import { Request, Response } from "express";
import { hashPassword } from "../utils/hachPassword";
import { compairPassword } from "../utils/compairpasswored";
import { createtoken } from "../utils/jwt";
import { User } from "../models/user";
import dbConnection from "../models/db";
import Statuscodes from "http-status-codes";
import sendmail from "../mailer/passworedResetmailer";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index";
import { validationResult } from "express-validator";


dbConnection();


export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(Statuscodes.BAD_REQUEST).json({ error: error.array() })
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });
        const token = await createtoken(user);
        console.log(token);
        
        res.status(Statuscodes.CREATED).json({ token: token })
    } catch (err: any) {
        console.log(err)
        res.status(Statuscodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(Statuscodes.BAD_REQUEST).json({ error: error.array() })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(Statuscodes.BAD_REQUEST).json({ error: new BadRequestError("something is wrong try again") });
        }
        const Match = await compairPassword(password, user.password);
        if (!Match) {
            return res.status(Statuscodes.BAD_REQUEST).json({ error: new BadRequestError("something is wrong try again") });
        }
        const token = await createtoken(user);
        res.status(Statuscodes.OK).json({ token })
    } catch (err: any) {
        console.log(err)
        res.status(Statuscodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

export const frgetPasswored = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user: any = await User.findOne({ email });
    // console.log(user);
    
    const userId: string = user._id;
    const userEmail: string = user.email;
    console.log(userEmail);
    
    const link: string = `api/auth/reset/${userId}`;
    sendmail(userEmail, "passwored reset", link)
    return res.status(Statuscodes.OK).json({ message: "password reset link sent to your email" });

}

export const changePasswored = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const { id } = req.params;
        const user: any = await User.findById({
            _id: id
        });
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword!;
        await user.save();
        res.status(Statuscodes.OK).json({ message: "password changed successfully" })
    } catch (err: any) {
        console.log(err)
        res.status(Statuscodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}
