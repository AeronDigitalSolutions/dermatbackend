"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = __importDefault(require("../models/doctor"));
const router = express_1.default.Router();
/* ================= CREATE DOCTOR ================= */
router.post("/", async (req, res) => {
    try {
        const { title, firstName, lastName, specialist, email, password, description, } = req.body;
        if (!title || !firstName || !lastName || !specialist || !email || !password) {
            return res.status(400).json({ message: "All required fields missing" });
        }
        const exists = await doctor_1.default.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const doctor = new doctor_1.default({
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
/* ================= LIST DOCTORS ================= */
router.get("/", async (_req, res) => {
    try {
        const doctors = await doctor_1.default.find()
            .select("-password")
            .sort({ createdAt: -1 });
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
/* ================= UPDATE DOCTOR ================= */
router.put("/:id", async (req, res) => {
    try {
        const updatedDoctor = await doctor_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select("-password");
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({
            message: "Doctor updated successfully",
            doctor: updatedDoctor,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
/* ================= DELETE DOCTOR ================= */
router.delete("/:id", async (req, res) => {
    try {
        const deletedDoctor = await doctor_1.default.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
