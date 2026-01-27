"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const B2BProduct_1 = __importDefault(require("../models/B2BProduct"));
const router = express_1.default.Router();
/* ================= CREATE ================= */
router.post("/", async (req, res) => {
    try {
        const { sku, productName, category, subCategory, hsnCode, brandName, packSize, pricePerUnit, bulkPriceTier, moq, stockAvailable, expiryDate, description, ingredients, usageInstructions, treatmentIndications, certifications, manufacturerName, licenseNumber, mrp, discountedPrice, gst, taxIncluded, productImages, msds, customerReviews, relatedProducts, promotionalTags, } = req.body;
        const product = new B2BProduct_1.default({
            sku,
            productName,
            category,
            subCategory,
            hsnCode,
            brandName,
            packSize,
            pricePerUnit,
            bulkPriceTier,
            moq,
            stockAvailable,
            expiryDate,
            description,
            ingredients,
            usageInstructions,
            treatmentIndications,
            certifications,
            manufacturerName,
            licenseNumber,
            mrp,
            discountedPrice,
            gst,
            taxIncluded,
            productImages,
            msds,
            customerReviews,
            relatedProducts,
            promotionalTags,
        });
        await product.save();
        res.status(201).json(product);
    }
    catch (err) {
        console.error("B2B create error:", err);
        res.status(500).json({ message: err.message });
    }
});
/* ================= LIST ================= */
router.get("/", async (_req, res) => {
    const products = await B2BProduct_1.default.find().sort({ createdAt: -1 });
    res.json(products);
});
/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
    await B2BProduct_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});
exports.default = router;
