import mongoose, { Schema, Document } from "mongoose";

export interface IClinicCategory extends Document {
  categoryId: string;
  name: string;
  imageUrl: string;
  exploreImage?: string;
}

const ClinicCategorySchema: Schema = new Schema(
  {
    categoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    exploreImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IClinicCategory>(
  "ClinicCategory",
  ClinicCategorySchema
);
