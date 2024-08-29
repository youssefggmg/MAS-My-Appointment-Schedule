import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dblink: string = process.env.dbLink!;


const dbConnection = async ()=>{
    try {
        await mongoose.connect(dblink)
        console.log("db conected sucsesfully");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection