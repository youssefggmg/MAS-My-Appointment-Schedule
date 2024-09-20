"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isProvider_1 = require("../../middlewares/isProvider");
const tockenVerification_1 = require("../../middlewares/tockenVerification");
const providerAppointments_1 = require("../../controllers/providers_controllers/providerAppointments");
const appontmentValidator_1 = __importDefault(require("../../validators/appontmentValidator"));
const providerAppointmentsRoutere = express_1.default.Router();
providerAppointmentsRoutere.route("/appointment/all").get(tockenVerification_1.tockenVirification, isProvider_1.isProvider, providerAppointments_1.allApointments);
providerAppointmentsRoutere.route("/appointment/accept").patch(tockenVerification_1.tockenVirification, isProvider_1.isProvider, appontmentValidator_1.default, providerAppointments_1.accepteAppointment);
providerAppointmentsRoutere.route("/appointment/cancell").patch(tockenVerification_1.tockenVirification, isProvider_1.isProvider, appontmentValidator_1.default, providerAppointments_1.cancellAppointment);
exports.default = providerAppointmentsRoutere;
//# sourceMappingURL=appointments.js.map