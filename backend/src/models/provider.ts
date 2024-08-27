import { model, Schema } from "mongoose"

const providerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    subscriptionActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const provider = model('Provider', providerSchema);