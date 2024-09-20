"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    Image: { type: String, default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' }],
    subscriptionActive: { type: Boolean, default: false },
    subscriptionEndDate: { type: Date, default: null },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    cancelledAppointments: { type: Number, default: 0 }
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.js.map