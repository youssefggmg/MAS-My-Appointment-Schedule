import  express  from "express";
import {bookAppointment,cancelAppointment} from "../controllers/appointmentcontroller"

const appointmetRouter = express.Router();
appointmetRouter.post("/appointment/book", bookAppointment);
appointmetRouter.patch("/appointment/cancel", cancelAppointment);

export default appointmetRouter;