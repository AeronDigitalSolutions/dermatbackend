import mongoose, { Schema, Document } from "mongoose";

export interface IClinic extends Document {
  name: string;
  mobile: string;
  whatsapp?: string;
  mapLink?: string;
  address: string;
  verified: boolean;
  trusted: boolean;
  image?: string; // Base64 string
}

const ClinicSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String },
    mapLink: { type: String },
    address: { type: String, required: true },
    verified: { type: Boolean, default: false },
    trusted: { type: Boolean, default: false },
    image: { type: String }, // base64 image
  },
  { timestamps: true }
);

// ✅ Fix: prevent OverwriteModelError
export default mongoose.models.Clinic ||
  mongoose.model<IClinic>("Clinic", ClinicSchema);
