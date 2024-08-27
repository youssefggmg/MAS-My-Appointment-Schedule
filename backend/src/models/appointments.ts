import { model, Schema } from "mongoose";


const appointmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export const appointment = model('Appointment', appointmentSchema);