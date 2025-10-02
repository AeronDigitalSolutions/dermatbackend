// routes/categoryRoutes.ts
import express, { Request, Response } from "express";
import Category from "../models/Category";

const router = express.Router();

// ✅ Get all categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find({}, "id name imageUrl").lean();
    const validCategories = categories.filter(
      (cat) => cat.id && cat.id.trim() !== ""
    );
    res.json(validCategories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Create a new category (auto-generate ID)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl) {
      return res
        .status(400)
        .json({ message: "name and imageUrl are required" });
    }

    // Find latest cat-X
    const lastCategory = await Category.findOne({})
      .sort({ createdAt: -1 })
      .lean();

    let newId = "cat-1";
    if (lastCategory && lastCategory.id) {
      const lastNum = parseInt(lastCategory.id.split("-")[1], 10);
      newId = `cat-${lastNum + 1}`;
    }

    const category = new Category({ id: newId, name, imageUrl });
    await category.save();

    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update category
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;
    const updated = await Category.findOneAndUpdate(
      { id: req.params.id },
      { name, imageUrl },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete category
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
