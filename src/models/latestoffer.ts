import mongoose, { Schema, Document } from "mongoose";

export interface ILatestOffer extends Document {
  imageBase64: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LatestOfferSchema = new Schema<ILatestOffer>(
  {
    imageBase64: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILatestOffer>("LatestOffer", LatestOfferSchema);
