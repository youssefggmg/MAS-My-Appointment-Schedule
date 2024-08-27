import { model, Schema } from "mongoose";


const reportSchema = new Schema({
    reporterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportedId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    type: { type: String, enum: ['provider', 'client'], required: true },
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const Report = model('Report', reportSchema);