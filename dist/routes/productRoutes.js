"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Products_1 = __importDefault(require("../models/Products"));
const router = express_1.default.Router();
/** ================= CREATE PRODUCT ================= */
router.post("/", async (req, res) => {
    try {
        const product = new Products_1.default(Object.assign({}, req.body));
        await product.save();
        res.status(201).json(product);
    }
    catch (err) {
        console.error("Create product error:", err);
        res.status(500).json({ message: err.message });
    }
});
/** ================= GET ALL ================= */
router.get("/", async (_req, res) => {
    const products = await Products_1.default.find().sort({ createdAt: -1 });
    res.json(products);
});
/** ================= GET ONE ================= */
router.get("/:id", async (req, res) => {
    const product = await Products_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json(product);
});
/** ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
    const updated = await Products_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { new: true, runValidators: true });
    res.json(updated);
});
/** ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
    await Products_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});
/** ================= ADD REVIEW ================= */
router.post("/:id/reviews", async (req, res) => {
    const product = await Products_1.default.findById(req.params.id);
    if (!product)
        return res.status(404).json({ message: "Not found" });
    product.reviews.push(req.body);
    const total = product.reviews.reduce((a, r) => a + r.rating, 0);
    product.rating = total / product.reviews.length;
    await product.save();
    res.json(product);
});
exports.default = router;
