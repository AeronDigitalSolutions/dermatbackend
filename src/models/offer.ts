import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  imageBase64: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    imageBase64: { type: String, required: true }, // Store image as Base64 string
  },
  { timestamps: true }
);

export default mongoose.model<IOffer>("Offer", OfferSchema);
