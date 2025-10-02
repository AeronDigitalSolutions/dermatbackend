// src/models/admindoctor.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDoctor extends Document {
  title?: string;
  firstName: string;
  lastName: string;
  specialist: string;
  email: string;
  password: string;
  createdByAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema(
  {
    title: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialist: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdByAdmin: { type: Boolean, default: true }, // ✅ add this
  },
  { timestamps: true }
);

const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
