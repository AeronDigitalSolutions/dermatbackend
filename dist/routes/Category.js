"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/categoryRoutes.ts
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../models/Category"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const categories = await Category_1.default.find({}, "id name imageUrl exploreImage").lean();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const { name, imageUrl, exploreImage } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({ message: "name and imageUrl are required" });
        }
        const last = await Category_1.default.findOne({}).sort({ createdAt: -1 }).lean();
        let newId = "cat-1";
        if (last && last.id) {
            const lastNum = parseInt(last.id.split("-")[1], 10);
            newId = `cat-${lastNum + 1}`;
        }
        const category = new Category_1.default({ id: newId, name, imageUrl, exploreImage });
        await category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { name, imageUrl, exploreImage } = req.body;
        const updated = await Category_1.default.findOneAndUpdate({ id: req.params.id }, { name, imageUrl, exploreImage }, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Not found" });
        res.json(updated);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Category_1.default.findOneAndDelete({ id: req.params.id });
        if (!deleted)
            return res.status(404).json({ message: "Not found" });
        res.json({ message: "Category deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
