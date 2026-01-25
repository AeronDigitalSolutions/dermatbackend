import mongoose, { Schema, model, models, HydratedDocument } from "mongoose";

/* ================= DOCUMENT TYPE ================= */
export interface IB2BProduct {
  _id?: string;

  /* ===== BASIC INFO ===== */
  sku: string;
  productName: string;
  category: string;
  subCategory: string;
  hsnCode: string;
  brandName: string;

  /* ===== PRICING ===== */
  packSize: string;
  pricePerUnit: number;
  bulkPriceTier: string;
  moq: number;
  stockAvailable: number;
  expiryDate: Date;

  /* ===== DESCRIPTION ===== */
  description: string;
  ingredients: string;
  usageInstructions: string;
  treatmentIndications: string;
  certifications: string;

  /* ===== MANUFACTURER & TAX ===== */
  manufacturerName: string;
  licenseNumber: string;
  mrp: number;
  discountedPrice: number;
  gst: number;
  taxIncluded: boolean;

  /* ===== MEDIA ===== */
  productImages: string;
  msds: string;
  customerReviews: string;
  relatedProducts: string;
  promotionalTags: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type B2BProductDocument = HydratedDocument<IB2BProduct>;

/* ================= SCHEMA ================= */
const B2BProductSchema = new Schema<B2BProductDocument>(
  {
    sku: { type: String, required: true, unique: true },

    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    hsnCode: { type: String },
    brandName: { type: String },

    packSize: { type: String },
    pricePerUnit: { type: Number },
    bulkPriceTier: { type: String },
    moq: { type: Number },
    stockAvailable: { type: Number },
    expiryDate: { type: Date },

    description: { type: String },
    ingredients: { type: String },
    usageInstructions: { type: String },
    treatmentIndications: { type: String },
    certifications: { type: String },

    manufacturerName: { type: String },
    licenseNumber: { type: String },
    mrp: { type: Number },
    discountedPrice: { type: Number },
    gst: { type: Number },
    taxIncluded: { type: Boolean, default: true },

    productImages: { type: String },
    msds: { type: String },
    customerReviews: { type: String },
    relatedProducts: { type: String },
    promotionalTags: { type: String },
  },
  { timestamps: true }
);

const B2BProductModel =
  (models.B2BProduct as mongoose.Model<B2BProductDocument>) ||
  model<B2BProductDocument>("B2BProduct", B2BProductSchema);

export default B2BProductModel;
