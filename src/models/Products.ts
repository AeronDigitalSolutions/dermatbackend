import mongoose, { Schema, model, models, HydratedDocument } from "mongoose";

/** ================= REVIEW INTERFACE ================= */
export interface IReview {
  rating: number;
  comment: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/** ================= PRODUCT INTERFACE ================= */
export interface IProduct {
  _id?: string;

  /* ===== BASIC INFO ===== */
  productSKU: string;
  productName: string;
  category: string;
  // subCategory: string; ❌ removed logically
  brandName: string;

  /* ===== DESCRIPTION ===== */
  description: string;
  ingredients: string;
  targetConcerns: string;
  usageInstructions: string;
  benefits: string;
  certifications: string;

  /* ===== PRICING ===== */
  netQuantity: string;
  mrpPrice: number;
  discountedPrice: number;
  discountPercent: number;
  taxIncluded: boolean;

  /* ===== COMPLIANCE ===== */
  expiryDate: Date;
  manufacturerName: string;
  licenseNumber: string;
  packagingType: string;

  /* ===== MEDIA ===== */
  productImages: string[];
  productShortVideo?: string;
  howToUseVideo?: string;

  /* ===== META ===== */
  gender: string;
  skinHairType: string;
  barcode: string;
  productURL?: string;

  /* ===== SYSTEM CONTROLLED ===== */
  rating: number;
  shippingTime: string;
  returnPolicy: string;
  availabilityStatus: string;
  stockStatus: string;
  activeStatus: boolean;
  buyNow: boolean;
  checkAvailability: boolean;
  dermatologistRecommended: boolean;

  reviews: IReview[];

  createdAt?: Date;
  updatedAt?: Date;
}

/** ================= REVIEW SCHEMA ================= */
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

/** ================= PRODUCT SCHEMA ================= */
const ProductSchema = new Schema<ProductDocument>(
  {
    productSKU: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    // subCategory: { type: String }, ❌ intentionally disabled
    brandName: { type: String },

    description: { type: String },
    ingredients: { type: String },
    targetConcerns: { type: String },
    usageInstructions: { type: String },
    benefits: { type: String },
    certifications: { type: String },

    netQuantity: { type: String },
    mrpPrice: { type: Number },
    discountedPrice: { type: Number },
    discountPercent: { type: Number },
    taxIncluded: { type: Boolean, default: true },

    expiryDate: { type: Date },
    manufacturerName: { type: String },
    licenseNumber: { type: String },
    packagingType: { type: String },

    productImages: { type: [String], default: [] },
    productShortVideo: { type: String },
    howToUseVideo: { type: String },

    gender: { type: String, default: "Unisex" },
    skinHairType: { type: String },
    barcode: { type: String },
    productURL: { type: String },

    rating: { type: Number, default: 0 },
    shippingTime: { type: String, default: "5-7 Business Days" },
    returnPolicy: { type: String, default: "No Return Policy" },
    availabilityStatus: { type: String, default: "Available" },
    stockStatus: { type: String, default: "In Stock" },
    activeStatus: { type: Boolean, default: true },
    buyNow: { type: Boolean, default: true },
    checkAvailability: { type: Boolean, default: true },
    dermatologistRecommended: { type: Boolean, default: false },

    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

export type ProductDocument = HydratedDocument<IProduct>;

const ProductModel =
  (models.Product as mongoose.Model<ProductDocument>) ||
  model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
