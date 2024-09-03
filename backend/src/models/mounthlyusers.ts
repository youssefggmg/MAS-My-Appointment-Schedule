import { Schema, model } from 'mongoose';

const MonthlyUserStatsSchema = new Schema({
    month: { type: String, required: true }, // e.g., "2024-08"
    year: { type: Number, required: true },
    totalUsers: { type: Number, default: 0 },
    totalProviders: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export const MonthlyUserStats = model('MonthlyUserStats', MonthlyUserStatsSchema);
