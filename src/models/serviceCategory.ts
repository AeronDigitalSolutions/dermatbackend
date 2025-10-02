import mongoose, { Document, Schema } from "mongoose";

export interface IServiceCategory extends Document {
  name: string;
  imageUrl: string; // Base64 string
}

const ServiceCategorySchema: Schema = new Schema<IServiceCategory>(
  {
    name: {
      type: String,
      required: [true, "Service category name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Service category image is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IServiceCategory>(
  "ServiceCategory",
  ServiceCategorySchema
);
