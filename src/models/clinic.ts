// models/clinic.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IClinic extends Document {
  name: string;
  mobile: string;
  whatsapp?: string;
  mapLink?: string;
  address: string;
  verified: boolean;
  trusted: boolean;
  images: string[]; // ✅ multiple images
  email: string;
  password: string;
  category: mongoose.Types.ObjectId;
  comparePassword(candidate: string): Promise<boolean>;
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
    images: { type: [String], required: true }, // ✅ array of image URLs
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ClinicCategory",
      required: true,
    },
  },
  { timestamps: true }
);

ClinicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ClinicSchema.methods.comparePassword = async function (candidate: string) {
  return await bcrypt.compare(candidate, this.password);
};

export default mongoose.models.Clinic ||
  mongoose.model<IClinic>("Clinic", ClinicSchema);
