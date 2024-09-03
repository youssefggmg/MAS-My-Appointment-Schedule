"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyUserStats = void 0;
const mongoose_1 = require("mongoose");
const MonthlyUserStatsSchema = new mongoose_1.Schema({
    month: { type: String, required: true }, // e.g., "2024-08"
    year: { type: Number, required: true },
    totalUsers: { type: Number, default: 0 },
    totalProviders: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
exports.MonthlyUserStats = (0, mongoose_1.model)('MonthlyUserStats', MonthlyUserStatsSchema);
//# sourceMappingURL=mounthlyusers.js.map