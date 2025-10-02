import express, { Request, Response } from "express";
import ServiceCategory from "../models/serviceCategory";

const router = express.Router();

// ✅ Create service category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ message: "Name and imageUrl are required" });
    }

    const category = new ServiceCategory({ name, imageUrl });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create service category", error: err });
  }
});

// ✅ Get all service categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await ServiceCategory.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch service categories", error: err });
  }
});

// ✅ Update service category
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;

    const category = await ServiceCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Service category not found" });

    category.name = name || category.name;
    category.imageUrl = imageUrl || category.imageUrl;

    const updated = await category.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service category", error: err });
  }
});

// ✅ Delete service category
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const category = await ServiceCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Service category not found" });

    res.json({ message: "Service category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service category", error: err });
  }
});

export default router;
