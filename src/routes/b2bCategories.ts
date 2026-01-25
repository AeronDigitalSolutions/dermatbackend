import express, { Request, Response } from "express";
import B2BCategory from "../models/B2BCategory";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const category = await B2BCategory.create({ name, imageUrl });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= READ ALL ================= */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await B2BCategory.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await B2BCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await B2BCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
