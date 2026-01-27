import express from "express";
import User from "../models/user";

const router = express.Router();

/* ================= CREATE USER ================= */
router.post("/", async (req, res) => {
  try {
    const {
      patientId,
      name,
      email,
      contactNo,
      address,
      password, // ✅ NEW
    } = req.body;

    // ✅ STRICT VALIDATION
    if (!patientId || !name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      patientId,
      name,
      email,
      contactNo,
      address,
      password, // ✅ REQUIRED & HASHED BY MODEL
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        patientId: user.patientId,
        name: user.name,
        email: user.email,
        contactNo: user.contactNo,
        address: user.address,
      },
    });
  } catch (err: any) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ================= DELETE USER ================= */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
