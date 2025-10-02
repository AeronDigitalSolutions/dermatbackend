// models/Service.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  serviceName: string;
  clinic: mongoose.Types.ObjectId; // ✅ linked to clinic
  categories: mongoose.Types.ObjectId[];
  images: string[];
  description: string;
  price: number;
  discountedPrice?: number;
}

const ServiceSchema: Schema = new Schema(
  {
    serviceName: { type: String, required: true },
    clinic: { type: Schema.Types.ObjectId, ref: "Clinic", required: true }, // ✅ added
    categories: [
      { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true },
    ],
    images: { type: [String], required: true }, // Base64 strings
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", ServiceSchema);
