import express from "express";
import ClinicCategory from "../models/clinicCategory";

const router = express.Router();

// Create new category
router.post("/", async (req, res) => {
  try {
    const { categoryId, name, imageUrl } = req.body;
    if (!categoryId || !name || !imageUrl) {
      return res.status(400).json({ message: "Category ID, Name and Image are required" });
    }

    const existing = await ClinicCategory.findOne({ categoryId });
    if (existing) {
      return res.status(400).json({ message: "Category ID must be unique" });
    }

    const category = new ClinicCategory({ categoryId, name, imageUrl });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating clinic category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all categories
router.get("/", async (_req, res) => {
  try {
    const categories = await ClinicCategory.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const { categoryId, name, imageUrl } = req.body;

    if (!categoryId || !name || !imageUrl) {
      return res.status(400).json({ message: "Category ID, Name, and Image are required" });
    }

    // Ensure categoryId stays unique (ignore current doc)
    const existing = await ClinicCategory.findOne({ categoryId, _id: { $ne: req.params.id } });
    if (existing) {
      return res.status(400).json({ message: "Category ID must be unique" });
    }

    const updated = await ClinicCategory.findByIdAndUpdate(
      req.params.id,
      { categoryId, name, imageUrl },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating clinic category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ClinicCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting clinic category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
