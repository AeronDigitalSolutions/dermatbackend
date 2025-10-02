import mongoose, { Schema, model, models, HydratedDocument } from "mongoose";

/** Interfaces for plain data shapes */
export interface IReview {
  rating: number;
  comment: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string; // ✅ use MongoDB’s built-in ObjectId
  category: string;
  company: string;
  name: string;
  quantity: number;
  price: number;
  discountPrice: number;
  description: string;
  images: string[];
  reviews: IReview[];
  createdAt?: Date;
  updatedAt?: Date;
}

/** Mongoose Document type */
export type ProductDocument = HydratedDocument<IProduct>;

/** Subdocument schema for reviews */
const ReviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { _id: false }
);

/** Main product schema */
const ProductSchema = new Schema<ProductDocument>(
  {
    category: { type: String, required: true },
    company: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

/** Prevent model overwrite in dev/hot reload */
const ProductModel =
  (models.Product as mongoose.Model<ProductDocument>) ||
  model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
