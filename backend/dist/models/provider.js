"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = void 0;
const mongoose_1 = require("mongoose");
const providerSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' }],
    subscriptionActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.provider = (0, mongoose_1.model)('Provider', providerSchema);
//# sourceMappingURL=provider.js.map