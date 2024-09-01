import express from "express";
import dotenv from "dotenv";
import authrouter from "./routers/authrouter";
import dashboardrouter from "./routers/dashboardrout";
import searchrout from "./routers/searshrouter";
dotenv.config()

const port = process.env.port ||3000;

const app = express();
app.use(express.json());

app.use("/api/auth",authrouter);
app.use("/api/auth",dashboardrouter);
app.use("/api/auth",searchrout);


app.listen(port,()=>{console.log(`server is running on port ${port}`)});