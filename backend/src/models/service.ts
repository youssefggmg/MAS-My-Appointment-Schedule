import { model, Schema } from "mongoose";

const serviceSchema = new Schema({
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    workTime: { type: String, required: true },
    availability: { type: Boolean, default: true },
    price: { type: Number, required: true },
    contactMethod: { type: String, required: true }
});

export const service  = model('Service', serviceSchema);