"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TopProducts_1 = __importDefault(require("../models/TopProducts"));
const router = express_1.default.Router();
// GET top products (always return 8 slots)
router.get("/", async (_req, res) => {
    try {
        let doc = await TopProducts_1.default.findOne();
        if (!doc) {
            doc = await TopProducts_1.default.create({ products: Array(8).fill(null) });
            console.log("Created default top-products document");
        }
        const out = [...doc.products];
        while (out.length < 8)
            out.push(null);
        res.json(out.slice(0, 8));
    }
    catch (err) {
        console.error("Error fetching top products:", err);
        res.status(500).json({ error: "Failed to fetch top products" });
    }
});
// PUT update top products (expect array length up to 8, with nulls allowed)
router.put("/", async (req, res) => {
    try {
        let incoming = req.body;
        if (!Array.isArray(incoming)) {
            return res.status(400).json({ error: "Body must be an array" });
        }
        incoming = incoming.slice(0, 8);
        while (incoming.length < 8)
            incoming.push(null);
        let doc = await TopProducts_1.default.findOne();
        if (!doc) {
            doc = new TopProducts_1.default({ products: incoming });
        }
        else {
            doc.products = incoming;
        }
        await doc.save();
        res.json(doc.products);
    }
    catch (err) {
        console.error("Error updating top products:", err);
        res.status(500).json({ error: "Failed to update top products" });
    }
});
exports.default = router;
