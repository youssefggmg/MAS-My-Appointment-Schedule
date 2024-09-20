import { Schema, model } from "mongoose";

const ProviderSchema = new Schema({
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    jobTitle: { type: String, required: true }, // Job title of the provider
    aboutMe: { type: String, required: true }, // Provider's "About Me" section
    availability: { type: Boolean, default: true }, // Whether the provider is available or not
    createdAt: { type: Date, default: Date.now }
});

// Export the model
export const Provider = model("Provider", ProviderSchema);
