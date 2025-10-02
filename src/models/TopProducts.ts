import mongoose, { Schema, Document } from "mongoose";

export interface Product {
  _id: string;
  name: string;
  category?: string;
  company?: string;
  price?: number | string;
  discountPrice?: number | string;
  image?: string; // Base64 or URL
}

export interface TopProductsDoc extends Document {
  products: (Product | null)[];
}

const TopProductsSchema = new Schema<TopProductsDoc>(
  {
    products: {
      type: [Schema.Types.Mixed], // allow objects or null
      default: Array(8).fill(null)
    }
  },
  { minimize: false, timestamps: true }
);

export default mongoose.model<TopProductsDoc>("TopProduct", TopProductsSchema);
