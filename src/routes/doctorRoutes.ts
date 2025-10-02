import express from "express";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor";

const router = express.Router();

// JWT secret (use .env in real projects)
const JWT_SECRET = "your_secret_key";

// ✅ Register Doctor
router.post("/", async (req, res) => {
  try {
    const { title, firstName, lastName, specialist, email, password } = req.body;

    if (!title || !firstName || !lastName || !specialist || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newDoctor = new Doctor({ title, firstName, lastName, specialist, email, password });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Login Doctor
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: doctor._id, role: "doctor" }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        specialist: doctor.specialist,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get All Doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update Doctor
router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Delete Doctor
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
