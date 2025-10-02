// models/Category.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  id: string;       // custom ID like cat-1
  name: string;
  imageUrl: string; // base64 string
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    id: {
      type: String,
      required: [true, "Category ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
