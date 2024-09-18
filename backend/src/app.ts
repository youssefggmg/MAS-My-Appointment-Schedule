import express from "express";
import dotenv from "dotenv";
import authrouter from "./routers/authrouter";
import dashboardrouter from "./routers/dashboardrout";
import searchrout from "./routers/searshrouter";
import userRouter from "./routers/userrout";
import appointmetRouter from "./routers/userAppontmentrout";
import becomeProviderRouter from "./routers/becomeProviderRouter";
import servicerouter from "./routers/provider/serviceRouter";
import dbConnection from "./models/db";
dbConnection();
dotenv.config()

const port = process.env.port ||3000;

const app = express();
app.use(express.json());

app.use("/api",authrouter);
app.use("/api",dashboardrouter);
app.use("/api",searchrout);
app.use("/api",userRouter);
app.use("/api",appointmetRouter);
app.use("/api",becomeProviderRouter);
app.use("/api",servicerouter);



app.listen(port,()=>{console.log(`server is running on port ${port}`)});