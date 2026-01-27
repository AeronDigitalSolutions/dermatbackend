import express from "express";
import Admin from "../models/admin";
import { createAdmin } from "../controllers/adminController";

const router = express.Router();

/* ================= CREATE ADMIN ================= */
// router.post("/", createAdmin);
router.post("/", (req, res) => {
  console.log("🔥 ADMIN ROUTE HIT");
  console.log("🔥 HEADERS:", req.headers);
  console.log("🔥 BODY:", req.body);

  res.status(200).json({ ok: true });
});

/* ================= LIST ADMINS ================= */
router.get("/", async (_req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Error fetching admins" });
  }
});

/* ================= UPDATE ADMIN ================= */
router.put("/:id", async (req, res) => {
  const { name, email, phone, role } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error while updating admin" });
  }
});

/* ================= DELETE ADMIN ================= */
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting admin" });
  }
});

export default router;
