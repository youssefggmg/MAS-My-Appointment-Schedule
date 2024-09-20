"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellAppointment = exports.accepteAppointment = exports.allApointments = void 0;
const user_1 = require("../../models/user");
const appointments_1 = require("../../models/appointments");
const index_1 = require("../../errors/index");
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const appointmentAcceptedmail_1 = require("../../mailer/appointmentAcceptedmail");
const appointmentCancelmail_1 = require("../../mailer/appointmentCancelmail");
// all appointments of the provider 
const allApointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerID = req.user.user._id;
        const allAppointment = yield appointments_1.appointment.find({
            provider: providerID
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(allAppointment);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allApointments = allApointments;
const accepteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const providerID = req.user.user._id;
        const appointmentID = req.params.id;
        const { notes, date } = req.body;
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        const Appointment = yield appointments_1.appointment.findById({
            _id: appointmentID
        });
        if (!Appointment) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError('Appointment not found') });
        }
        if ((Appointment === null || Appointment === void 0 ? void 0 : Appointment.providerId) !== providerID) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: new index_1.UnAuthenticatedError('You are not authorized to accept this appointment') });
        }
        const accepted = yield appointments_1.appointment.findByIdAndUpdate(appointmentID, {
            $set: {
                status: 'accepted',
                notes,
                date
            }
        }, { new: true });
        const clientID = Appointment.userId;
        const client = yield user_1.User.findById(clientID);
        const provider = yield user_1.User.findById(providerID);
        const clientMail = client === null || client === void 0 ? void 0 : client.email;
        const clientName = client === null || client === void 0 ? void 0 : client.name;
        const providerName = provider === null || provider === void 0 ? void 0 : provider.name;
        (0, appointmentAcceptedmail_1.acceptedMail)(clientMail, "appointment accepted", providerName, date, clientName);
        res.status(http_status_codes_1.StatusCodes.OK).json(accepted);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.accepteAppointment = accepteAppointment;
const cancellAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const providerID = req.user.user._id;
        const appointmentID = req.params.id;
        const { notes, date } = req.body;
        const Appointment = yield appointments_1.appointment.findById({
            _id: appointmentID
        });
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        if (!Appointment) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError('Appointment not found') });
        }
        if ((Appointment === null || Appointment === void 0 ? void 0 : Appointment.providerId) !== providerID) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: new index_1.UnAuthenticatedError('You are not authorized to accept this appointment') });
        }
        const cancelled = yield appointments_1.appointment.findByIdAndUpdate(appointmentID, {
            $set: {
                status: 'cancelled',
                notes,
            }
        }, { new: true });
        const clientID = Appointment.userId;
        const client = yield user_1.User.findById(clientID);
        const provider = yield user_1.User.findById(providerID);
        const clientMail = client === null || client === void 0 ? void 0 : client.email;
        const clientName = client === null || client === void 0 ? void 0 : client.name;
        const providerName = provider === null || provider === void 0 ? void 0 : provider.name;
        (0, appointmentCancelmail_1.sendCancelationEmail)(clientMail, "appointment cancelled", providerName, date, clientName);
        res.status(http_status_codes_1.StatusCodes.OK).json(cancelled);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.cancellAppointment = cancellAppointment;
//# sourceMappingURL=providerAppointments.js.map