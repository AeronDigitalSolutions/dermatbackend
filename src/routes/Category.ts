// routes/categoryRoutes.ts
import express, { Request, Response } from "express";
import Category from "../models/Category";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const categories = await Category.find({}, "id name imageUrl exploreImage").lean();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, imageUrl, exploreImage } = req.body;
    if (!name || !imageUrl) {
      return res.status(400).json({ message: "name and imageUrl are required" });
    }

    const last = await Category.findOne({}).sort({ createdAt: -1 }).lean();
    let newId = "cat-1";
    if (last && last.id) {
      const lastNum = parseInt(last.id.split("-")[1], 10);
      newId = `cat-${lastNum + 1}`;
    }

    const category = new Category({ id: newId, name, imageUrl, exploreImage });
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, imageUrl, exploreImage } = req.body;
    const updated = await Category.findOneAndUpdate(
      { id: req.params.id },
      { name, imageUrl, exploreImage },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Category deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
