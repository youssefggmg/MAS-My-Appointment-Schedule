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
exports.allAppointments = exports.cancelAppointment = exports.bookAppointment = void 0;
const appointments_1 = require("../models/appointments");
const user_1 = require("../models/user");
const service_1 = require("../models/service");
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const bookAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { providerId, serviceId } = req.body;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user;
        if (!providerId || !serviceId) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "providerId and serviceId are required" });
        }
        const theProvider = yield user_1.User.findById(providerId);
        if (!theProvider || theProvider.role !== "provider") {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Provider not found or invalid role" });
        }
        const theService = yield service_1.service.findById(serviceId);
        if (!theService) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Service not found" });
        }
        const theAppointment = yield appointments_1.appointment.create({
            userId: user._id,
            providerId: providerId,
            serviceId: serviceId,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ appointment: theAppointment, message: "Your appointment was created" });
    }
    catch (err) {
        console.error(err); // Consider replacing with proper logger in production
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error", details: err.message });
    }
});
exports.bookAppointment = bookAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentId } = req.params;
        const user = req.user.user;
        const theAppointment = yield appointments_1.appointment.findById(appointmentId);
        const theUser = yield user_1.User.findById(user._id);
        // nocapp means number numberOfCancelledAppointments
        const nocapp = { cancelledAppointments: user.cancelledAppointments++ };
        if (nocapp > 3) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError("you have reatched you limet you cannot cancella nother appointment") });
        }
        const status = { status: "cancelled" };
        if (!theAppointment) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: new index_1.NotFoundError("appointment not found") });
        }
        const cancel = yield appointments_1.appointment.findByIdAndUpdate({ _id: appointmentId }, { $set: status });
        const Cuser = yield user_1.User.findByIdAndUpdate({ _id: user._id }, { $set: nocapp });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "appointment cancelled" });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.cancelAppointment = cancelAppointment;
const allAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.user._id;
        // Populate the provider (for the image) and service information
        const allAppointments = yield appointments_1.appointment.find({
            userId: userID
        })
            .populate({
            path: 'providerId',
            select: 'Image',
        })
            .populate({
            path: 'serviceId',
            select: 'name description price',
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ allAppointments });
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.allAppointments = allAppointments;
//# sourceMappingURL=appointmentcontroller.js.map