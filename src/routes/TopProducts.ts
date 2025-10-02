import express, { Request, Response } from "express";
import TopProductModel, { Product as TopSlot } from "../models/TopProducts";

const router = express.Router();

// GET top products (always return 8 slots)
router.get("/", async (_req: Request, res: Response) => {
  try {
    let doc = await TopProductModel.findOne();
    if (!doc) {
      doc = await TopProductModel.create({ products: Array(8).fill(null) });
      console.log("Created default top-products document");
    }

    const out = [...doc.products];
    while (out.length < 8) out.push(null);
    res.json(out.slice(0, 8));
  } catch (err) {
    console.error("Error fetching top products:", err);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

// PUT update top products (expect array length up to 8, with nulls allowed)
router.put("/", async (req: Request, res: Response) => {
  try {
    let incoming = req.body as (TopSlot | null)[];

    if (!Array.isArray(incoming)) {
      return res.status(400).json({ error: "Body must be an array" });
    }

    incoming = incoming.slice(0, 8);
    while (incoming.length < 8) incoming.push(null);

    let doc = await TopProductModel.findOne();
    if (!doc) {
      doc = new TopProductModel({ products: incoming });
    } else {
      doc.products = incoming;
    }

    await doc.save();
    res.json(doc.products);
  } catch (err) {
    console.error("Error updating top products:", err);
    res.status(500).json({ error: "Failed to update top products" });
  }
});

export default router;
