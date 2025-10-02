import express from "express";
import LatestShort from "../models/latestshorts";

const router = express.Router();

// ➤ Helper to convert to embeddable URL
const getEmbedUrl = (platform: string, url: string) => {
  if (platform === "youtube") {
    return url.replace("shorts/", "embed/");
  }
  if (platform === "instagram") {
    // Convert Instagram reel to embeddable URL
    if (!url.endsWith("/")) url += "/";
    return `https://www.instagram.com/p/${url.split("/").filter(Boolean).pop()}/embed`;
  }
  return url;
};

// ➤ Create short
router.post("/", async (req, res) => {
  try {
    const { platform, videoUrl } = req.body;

    if (!platform || !videoUrl) {
      return res.status(400).json({ message: "Platform and videoUrl required" });
    }

    const newShort = new LatestShort({ platform, videoUrl });
    await newShort.save();

    res.status(201).json({
      ...newShort.toObject(),
      embedUrl: getEmbedUrl(platform, videoUrl),
    });
  } catch (error) {
    console.error("Error creating short:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ➤ Get all shorts
router.get("/", async (req, res) => {
  try {
    const shorts = await LatestShort.find().sort({ createdAt: -1 });

    const data = shorts.map((s) => ({
      ...s.toObject(),
      embedUrl: getEmbedUrl(s.platform, s.videoUrl),
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching shorts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ➤ Delete short
router.delete("/:id", async (req, res) => {
  try {
    const short = await LatestShort.findByIdAndDelete(req.params.id);
    if (!short) {
      return res.status(404).json({ message: "Short not found" });
    }
    res.json({ message: "Short deleted successfully" });
  } catch (error) {
    console.error("Error deleting short:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
