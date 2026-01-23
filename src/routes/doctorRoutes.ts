import express from "express";
import Doctor from "../models/doctor";

const router = express.Router();

/* ================= CREATE DOCTOR ================= */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      specialist,
      email,
      password,
      description,
    } = req.body;

    if (!title || !firstName || !lastName || !specialist || !email || !password) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const exists = await Doctor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const doctor = new Doctor({
      title,
      firstName,
      lastName,
      specialist,
      email,
      password,
      description,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ================= LIST DOCTORS ================= */
router.get("/", async (_req, res) => {
  try {
    const doctors = await Doctor.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ================= UPDATE DOCTOR ================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ================= DELETE DOCTOR ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
