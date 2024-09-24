import { Schema, model } from "mongoose";


const UserSchema  = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    Image: {type:String, default:"https://res.cloudinary.com/dxbvwgxvf/image/upload/v1727192781/vevix4imnttkctlerm30.png"},
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    subscriptionActive: { type: Boolean, default: false },
    subscriptionEndDate: { type: Date, default: null },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    cancelledAppointments: { type: Number, default: 0 }
})

export const User = model("user", UserSchema);