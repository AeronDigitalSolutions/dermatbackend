import express, { Request, Response } from "express";
import Clinic from "../models/clinic";
import ClinicCategory from "../models/clinicCategory";

const router = express.Router();

/* ================= CREATE CLINIC ================= */
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      cuc,
      clinicName,
      dermaCategory,
      address,
      email,
      doctors,
      ...rest
    } = req.body;

    if (!cuc || !clinicName || !dermaCategory || !address || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const categoryExists = await ClinicCategory.findById(dermaCategory);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid clinic category" });
    }

    const exists = await Clinic.findOne({ cuc });
    if (exists) {
      return res.status(400).json({ message: "Clinic already exists" });
    }

    const clinic = await Clinic.create({
      cuc,
      clinicName,
      dermaCategory,
      address,
      email,
      doctors,
      ...rest, // UI-only fields are safely ignored
    });

    res.status(201).json({
      message: "Clinic created successfully",
      clinic,
    });
  } catch (err: any) {
    console.error("Create clinic error:", err);
    res.status(500).json({
      message: "Failed to create clinic",
      error: err.message,
    });
  }
});

/* ================= GET ALL CLINICS ================= */
router.get("/", async (_req, res) => {
  try {
    const clinics = await Clinic.find().populate("dermaCategory", "name");
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clinics" });
  }
});

/* ================= GET SINGLE CLINIC ================= */
router.get("/:id", async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate(
      "dermaCategory",
      "name"
    );

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clinic" });
  }
});

/* ================= UPDATE CLINIC ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("dermaCategory", "name");

    if (!updated) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update clinic" });
  }
});

/* ================= DELETE CLINIC ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Clinic.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Clinic not found" });
    }
    res.json({ message: "Clinic deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete clinic" });
  }
});

export default router;
