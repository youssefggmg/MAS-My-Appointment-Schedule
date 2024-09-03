import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated"
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import { ExpressValidator } from "express-validator";
dotenv.config();

const secritkey: string = process.env.jwtToken!;


export const tockenVirification = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("started")
        // console.log(secritkey);
        
        
        const { authorization } = req.headers!;
        // console.log("token" + authorization);
        if (!authorization) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: new UnAuthenticatedError("no token provided ") });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: new UnAuthenticatedError("no token provided ") });
        }
        const payload = jwt.verify(token, secritkey as string ) as JwtPayload;
        req.user = payload;
        // console.log(payload);
        
        next();
    } catch (error: any) {
        // console.log(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message});
    }
}
