import express from "express";
import { bookAppointment, cancelAppointment, allApoointmets } from "../controllers/appointmentcontroller";
import { tockenVirification } from "../middlewares/tockenVerification";
import { isUser } from "../middlewares/isUser";


const appointmetRouter = express.Router();
appointmetRouter.post("/appointment/book", tockenVirification,isUser, bookAppointment);
appointmetRouter.patch("/appointment/cancel/:id", tockenVirification,isUser, cancelAppointment);
appointmetRouter.get("/appointment/allApointments", tockenVirification,isUser, allApoointmets);

export default appointmetRouter;