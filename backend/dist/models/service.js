"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    workTime: { type: String, required: true },
    availability: { type: Boolean, default: true },
    price: { type: Number, required: true },
    contactMethod: { type: String, required: true }
});
exports.service = (0, mongoose_1.model)('Service', serviceSchema);
//# sourceMappingURL=service.js.map