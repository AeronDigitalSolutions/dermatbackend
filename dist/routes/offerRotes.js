"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offer_1 = __importDefault(require("../models/offer"));
const router = express_1.default.Router();
// GET ALL OFFERS
router.get("/", async (req, res) => {
    try {
        const offers = await offer_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(offers);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch offers", error: err });
    }
});
// ADD NEW OFFER (Base64)
router.post("/", async (req, res) => {
    try {
        const { imageBase64 } = req.body;
        if (!imageBase64)
            return res.status(400).json({ message: "Image is required" });
        const newOffer = new offer_1.default({ imageBase64 });
        await newOffer.save();
        res.status(201).json(newOffer);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to add offer", error: err });
    }
});
// DELETE OFFER
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await offer_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Offer not found" });
        res.status(200).json({ message: "Offer deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete offer", error: err });
    }
});
exports.default = router;
