import mongoose, { Schema, model, models, HydratedDocument } from "mongoose";

/* ================= INTERFACE ================= */
export interface IB2BCategory {
  _id?: string;
  name: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type B2BCategoryDocument = HydratedDocument<IB2BCategory>;

/* ================= SCHEMA ================= */
const B2BCategorySchema = new Schema<B2BCategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

/* ================= MODEL ================= */
const B2BCategoryModel =
  (models.B2BCategory as mongoose.Model<B2BCategoryDocument>) ||
  model<B2BCategoryDocument>("B2BCategory", B2BCategorySchema);

export default B2BCategoryModel;
