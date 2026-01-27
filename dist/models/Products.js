"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/** ================= REVIEW SCHEMA ================= */
const ReviewSchema = new mongoose_1.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
}, { _id: false });
/** ================= PRODUCT SCHEMA ================= */
const ProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const ProductModel = mongoose_1.models.Product ||
    (0, mongoose_1.model)("Product", ProductSchema);
exports.default = ProductModel;
