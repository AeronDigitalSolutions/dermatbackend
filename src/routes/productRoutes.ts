import express, { Request, Response } from "express";
import Product from "../models/Products";

const router = express.Router();

/** CREATE PRODUCT */
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      company,
      name,
      quantity,
      price,
      discountPrice,
      description,
      images,
    } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const newProduct = new Product({
      category,
      company,
      name,
      quantity,
      price,
      discountPrice,
      description,
      images,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err: any) {
    console.error("Create product error:", err);
    res.status(500).json({
      message: "Failed to create product.",
      error: err.message,
    });
  }
});

/** READ ALL PRODUCTS */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    const filter: any = {};

    if (categoryId && categoryId !== "all") {
      filter.category = categoryId;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch products.",
      error: err.message,
    });
  }
});

/** READ ONE PRODUCT BY _id */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to fetch product.",
      error: err.message,
    });
  }
});

/** UPDATE PRODUCT BY _id */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to update product.",
      error: err.message,
    });
  }
});

/** DELETE PRODUCT BY _id */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to delete product.",
      error: err.message,
    });
  }
});

/** ADD REVIEW TO PRODUCT */
router.post("/:id/reviews", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment, user } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const newReview = {
      rating,
      comment,
      user: user || "Anonymous",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json(product.reviews); // return updated reviews
  } catch (err: any) {
    console.error("Error adding review:", err);
    res.status(500).json({
      message: "Failed to add review.",
      error: err.message,
    });
  }
});

export default router;
