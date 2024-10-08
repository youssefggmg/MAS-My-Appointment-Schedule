"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'canceled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});
exports.appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
//# sourceMappingURL=appointments.js.map