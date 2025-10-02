"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceCategory_1 = __importDefault(require("../models/serviceCategory"));
const router = express_1.default.Router();
// ✅ Create service category
router.post("/", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({ message: "Name and imageUrl are required" });
        }
        const category = new serviceCategory_1.default({ name, imageUrl });
        await category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create service category", error: err });
    }
});
// ✅ Get all service categories
router.get("/", async (_req, res) => {
    try {
        const categories = await serviceCategory_1.default.find().sort({ createdAt: -1 });
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch service categories", error: err });
    }
});
// ✅ Update service category
router.put("/:id", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const category = await serviceCategory_1.default.findById(req.params.id);
        if (!category)
            return res.status(404).json({ message: "Service category not found" });
        category.name = name || category.name;
        category.imageUrl = imageUrl || category.imageUrl;
        const updated = await category.save();
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update service category", error: err });
    }
});
// ✅ Delete service category
router.delete("/:id", async (req, res) => {
    try {
        const category = await serviceCategory_1.default.findByIdAndDelete(req.params.id);
        if (!category)
            return res.status(404).json({ message: "Service category not found" });
        res.json({ message: "Service category deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete service category", error: err });
    }
});
exports.default = router;
