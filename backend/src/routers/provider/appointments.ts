import express from "express";
import { isProvider } from "../../middlewares/isProvider";
import { tockenVirification } from "../../middlewares/tockenVerification";
import { accepteAppointment, allApointments, cancellAppointment } from "../../controllers/providers_controllers/providerAppointments";
import validateAppointment from "../../validators/appontmentValidator";



const providerAppointmentsRoutere = express.Router();
providerAppointmentsRoutere.route("/appointment/all").get(tockenVirification,isProvider,allApointments);
providerAppointmentsRoutere.route("/appointment/accept").patch(tockenVirification,isProvider,validateAppointment,accepteAppointment);
providerAppointmentsRoutere.route("/appointment/cancell").patch(tockenVirification,isProvider,validateAppointment,cancellAppointment);

export default providerAppointmentsRoutere;
