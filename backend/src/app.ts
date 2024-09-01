import express from "express";
import dotenv from "dotenv";
import authrouter from "./routers/authrouter";
import dashboardrouter from "./routers/dashboardrout";
dotenv.config()

const port = process.env.port ||3000;

const app = express();
app.use(express.json());

app.use("/api/auth",authrouter);
app.use("/api/auth",dashboardrouter);


app.listen(port,()=>{console.log(`server is running on port ${port}`)});