import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey: string = process.env.jwtToken!;

const createtoken = async (user: any) => {
    const signtoken = jwt.sign({ user }, secretKey, { expiresIn: "1h" })
    return signtoken;
}

export {createtoken};