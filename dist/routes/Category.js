"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/categoryRoutes.ts
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../models/Category"));
const router = express_1.default.Router();
// ✅ Get all categories
router.get("/", async (_req, res) => {
    try {
        const categories = await Category_1.default.find({}, "id name imageUrl").lean();
        const validCategories = categories.filter((cat) => cat.id && cat.id.trim() !== "");
        res.json(validCategories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// ✅ Create a new category (auto-generate ID)
router.post("/", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res
                .status(400)
                .json({ message: "name and imageUrl are required" });
        }
        // Find latest cat-X
        const lastCategory = await Category_1.default.findOne({})
            .sort({ createdAt: -1 })
            .lean();
        let newId = "cat-1";
        if (lastCategory && lastCategory.id) {
            const lastNum = parseInt(lastCategory.id.split("-")[1], 10);
            newId = `cat-${lastNum + 1}`;
        }
        const category = new Category_1.default({ id: newId, name, imageUrl });
        await category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// ✅ Update category
router.put("/:id", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const updated = await Category_1.default.findOneAndUpdate({ id: req.params.id }, { name, imageUrl }, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Category not found" });
        res.json(updated);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// ✅ Delete category
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Category_1.default.findOneAndDelete({ id: req.params.id });
        if (!deleted)
            return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
