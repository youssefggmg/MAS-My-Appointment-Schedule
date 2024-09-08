import  express  from "express";
import {bookAppointment,cancelAppointment} from "../controllers/appointmentcontroller"

const appointmetRouter = express.Router();
appointmetRouter.post("/book", bookAppointment);
appointmetRouter.patch("/book", cancelAppointment);

