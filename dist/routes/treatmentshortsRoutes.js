"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const treatmentshorts_1 = __importDefault(require("../models/treatmentshorts"));
const router = express_1.default.Router();
// ➤ Helper to convert to embeddable URL
const getEmbedUrl = (platform, url) => {
    if (platform === "youtube") {
        return url.replace("shorts/", "embed/");
    }
    if (platform === "instagram") {
        if (!url.endsWith("/"))
            url += "/";
        return `https://www.instagram.com/p/${url.split("/").filter(Boolean).pop()}/embed`;
    }
    return url;
};
// ➤ Create treatment short
router.post("/", async (req, res) => {
    try {
        const { platform, videoUrl } = req.body;
        if (!platform || !videoUrl) {
            return res.status(400).json({ message: "Platform and videoUrl required" });
        }
        const newShort = new treatmentshorts_1.default({ platform, videoUrl });
        await newShort.save();
        res.status(201).json(Object.assign(Object.assign({}, newShort.toObject()), { embedUrl: getEmbedUrl(platform, videoUrl) }));
    }
    catch (error) {
        console.error("Error creating treatment short:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// ➤ Get all treatment shorts
router.get("/", async (req, res) => {
    try {
        const shorts = await treatmentshorts_1.default.find().sort({ createdAt: -1 });
        const data = shorts.map((s) => (Object.assign(Object.assign({}, s.toObject()), { embedUrl: getEmbedUrl(s.platform, s.videoUrl) })));
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching treatment shorts:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// ➤ Delete treatment short
router.delete("/:id", async (req, res) => {
    try {
        const short = await treatmentshorts_1.default.findByIdAndDelete(req.params.id);
        if (!short) {
            return res.status(404).json({ message: "Short not found" });
        }
        res.json({ message: "Treatment short deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting treatment short:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
