"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/* ================= SCHEMA ================= */
const B2BProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const B2BProductModel = mongoose_1.models.B2BProduct ||
    (0, mongoose_1.model)("B2BProduct", B2BProductSchema);
exports.default = B2BProductModel;
