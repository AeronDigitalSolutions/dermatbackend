import express, { Request, Response } from "express";
import Product from "../models/Products";

const router = express.Router();

/** ================= CREATE PRODUCT ================= */
router.post("/", async (req: Request, res: Response) => {
  try {
    const product = new Product({
      ...req.body,
      // subCategory: undefined ❌ ignored intentionally
    });

    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    console.error("Create product error:", err);
    res.status(500).json({ message: err.message });
  }
});

/** ================= GET ALL ================= */
router.get("/", async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/** ================= GET ONE ================= */
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

/** ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      // subCategory: undefined ❌ ignored intentionally
    },
    { new: true, runValidators: true }
  );
  res.json(updated);
});

/** ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/** ================= ADD REVIEW ================= */
router.post("/:id/reviews", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  product.reviews.push(req.body);

  const total = product.reviews.reduce((a, r) => a + r.rating, 0);
  product.rating = total / product.reviews.length;

  await product.save();
  res.json(product);
});

export default router;
