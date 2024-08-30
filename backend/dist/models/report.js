"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    reporterId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    type: { type: String, enum: ['provider', 'client'], required: true },
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.Report = (0, mongoose_1.model)('Report', reportSchema);
//# sourceMappingURL=report.js.map