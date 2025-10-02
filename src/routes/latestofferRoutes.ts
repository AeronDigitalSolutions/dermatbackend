import express, { Request, Response } from "express";
import LatestOffer from "../models/latestoffer";

const router = express.Router();

// GET ALL LATEST OFFERS
router.get("/", async (req: Request, res: Response) => {
  try {
    const offers = await LatestOffer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch latest offers", error: err });
  }
});

// CREATE LATEST OFFER
router.post("/", async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ message: "Image is required" });

    const newOffer = new LatestOffer({ imageBase64 });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ message: "Failed to create latest offer", error: err });
  }
});

// UPDATE LATEST OFFER
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ message: "Image is required" });

    const updatedOffer = await LatestOffer.findByIdAndUpdate(req.params.id, { imageBase64 }, { new: true });
    if (!updatedOffer) return res.status(404).json({ message: "Latest offer not found" });

    res.json(updatedOffer);
  } catch (err) {
    res.status(500).json({ message: "Failed to update latest offer", error: err });
  }
});

// DELETE LATEST OFFER
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await LatestOffer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Latest offer not found" });
    res.json({ message: "Latest offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete latest offer", error: err });
  }
});

export default router;
