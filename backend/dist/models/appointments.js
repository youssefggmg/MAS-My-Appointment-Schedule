"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Provider', required: true },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});
exports.appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
