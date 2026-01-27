"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const B2BCategory_1 = __importDefault(require("../models/B2BCategory"));
const router = express_1.default.Router();
/* ================= CREATE ================= */
router.post("/", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({ message: "Name and image are required" });
        }
        const category = await B2BCategory_1.default.create({ name, imageUrl });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/* ================= READ ALL ================= */
router.get("/", async (_req, res) => {
    try {
        const categories = await B2BCategory_1.default.find().sort({ createdAt: -1 });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
    try {
        const updated = await B2BCategory_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await B2BCategory_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
