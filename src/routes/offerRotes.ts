import express, { Request, Response } from "express";
import Offer from "../models/offer";

const router = express.Router();

// GET ALL OFFERS
router.get("/", async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch offers", error: err });
  }
});

// ADD NEW OFFER (Base64)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ message: "Image is required" });

    const newOffer = new Offer({ imageBase64 });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ message: "Failed to add offer", error: err });
  }
});

// DELETE OFFER
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete offer", error: err });
  }
});

export default router;
