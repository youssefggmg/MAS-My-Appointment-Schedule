import { Schema, model } from "mongoose";


const UserSchema  = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    cancelledAppointments: { type: Number, default: 0 }
})

export const User = model("User",UserSchema);