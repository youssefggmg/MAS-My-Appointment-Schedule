"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    Image: { type: String, default: "https://res.cloudinary.com/dxbvwgxvf/image/upload/v1727192781/vevix4imnttkctlerm30.png" },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' }],
    subscriptionActive: { type: Boolean, default: false },
    subscriptionEndDate: { type: Date, default: null },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    cancelledAppointments: { type: Number, default: 0 }
});
exports.User = (0, mongoose_1.model)("user", UserSchema);
//# sourceMappingURL=user.js.map