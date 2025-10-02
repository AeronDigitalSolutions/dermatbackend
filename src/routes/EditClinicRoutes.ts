import express from "express";
import Clinic from "../models/editClinic";

const router = express.Router();

// ✅ Get a single clinic by ID
router.get("/:id", async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update clinic by ID
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      mobile,
      whatsapp,
      mapLink,
      address,
      verified,
      trusted,
      image,
    } = req.body;

    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      { name, mobile, whatsapp, mapLink, address, verified, trusted, image },
      { new: true, runValidators: true }
    );

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
