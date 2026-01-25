import express, { Request, Response } from "express";
import B2BProduct from "../models/B2BProduct";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      sku,
      productName,
      category,
      subCategory,
      hsnCode,
      brandName,

      packSize,
      pricePerUnit,
      bulkPriceTier,
      moq,
      stockAvailable,
      expiryDate,

      description,
      ingredients,
      usageInstructions,
      treatmentIndications,
      certifications,

      manufacturerName,
      licenseNumber,
      mrp,
      discountedPrice,
      gst,
      taxIncluded,

      productImages,
      msds,
      customerReviews,
      relatedProducts,
      promotionalTags,
    } = req.body;

    const product = new B2BProduct({
      sku,
      productName,
      category,
      subCategory,
      hsnCode,
      brandName,

      packSize,
      pricePerUnit,
      bulkPriceTier,
      moq,
      stockAvailable,
      expiryDate,

      description,
      ingredients,
      usageInstructions,
      treatmentIndications,
      certifications,

      manufacturerName,
      licenseNumber,
      mrp,
      discountedPrice,
      gst,
      taxIncluded,

      productImages,
      msds,
      customerReviews,
      relatedProducts,
      promotionalTags,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    console.error("B2B create error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= LIST ================= */
router.get("/", async (_req, res) => {
  const products = await B2BProduct.find().sort({ createdAt: -1 });
  res.json(products);
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  await B2BProduct.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
