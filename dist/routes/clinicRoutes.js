"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/clinics.ts
const express_1 = __importDefault(require("express"));
const clinic_1 = __importDefault(require("../models/clinic"));
const clinicCategory_1 = __importDefault(require("../models/clinicCategory"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// ✅ Create Clinic
router.post("/", async (req, res) => {
    try {
        const { name, mobile, whatsapp, mapLink, address, verified, trusted, images, email, password, category, } = req.body;
        if (!images || !images.length) {
            return res.status(400).json({ message: "At least one image is required." });
        }
        if (!email || !password) {
            return res.status(400).json({ message: "Email & password are required." });
        }
        if (!category) {
            return res.status(400).json({ message: "Clinic category is required." });
        }
        const categoryExists = await clinicCategory_1.default.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Invalid clinic category." });
        }
        const clinicExists = await clinic_1.default.findOne({ email });
        if (clinicExists) {
            return res.status(400).json({ message: "Email already exists." });
        }
        const newClinic = new clinic_1.default({
            name,
            mobile,
            whatsapp,
            mapLink,
            address,
            verified,
            trusted,
            images,
            email,
            password,
            category,
        });
        await newClinic.save();
        res.status(201).json({ message: "Clinic created successfully", clinic: newClinic });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create clinic.", error: err });
    }
});
// ✅ Clinic Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email & password are required." });
        }
        const clinic = await clinic_1.default.findOne({ email });
        if (!clinic)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await clinic.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        const token = jsonwebtoken_1.default.sign({ id: clinic._id, role: "clinic" }, process.env.JWT_SECRET || "secretkey", { expiresIn: "7d" });
        res.status(200).json({
            message: "Clinic login successful",
            token,
            clinic: { id: clinic._id, name: clinic.name, email: clinic.email },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed", error: err });
    }
});
// ✅ Get all clinics
router.get("/", async (_req, res) => {
    try {
        const clinics = await clinic_1.default.find()
            .select("-password")
            .populate("category", "name");
        res.status(200).json(clinics);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch clinics.", error: err });
    }
});
// ✅ Get single clinic
router.get("/:id", async (req, res) => {
    try {
        const clinic = await clinic_1.default.findById(req.params.id)
            .select("-password")
            .populate("category", "name");
        if (!clinic)
            return res.status(404).json({ message: "Clinic not found" });
        res.status(200).json(clinic);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch clinic.", error: err });
    }
});
// ✅ Update clinic
router.put("/:id", async (req, res) => {
    try {
        const { name, mobile, whatsapp, mapLink, address, verified, trusted, images, category, } = req.body;
        if (category) {
            const categoryExists = await clinicCategory_1.default.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ message: "Invalid clinic category." });
            }
        }
        const updatedClinic = await clinic_1.default.findByIdAndUpdate(req.params.id, { name, mobile, whatsapp, mapLink, address, verified, trusted, images, category }, { new: true })
            .select("-password")
            .populate("category", "name");
        if (!updatedClinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.status(200).json(updatedClinic);
    }
    catch (err) {
        console.error("Update clinic error:", err);
        res.status(500).json({ message: "Failed to update clinic.", error: err });
    }
});
// ✅ Delete clinic
router.delete("/:id", async (req, res) => {
    try {
        const deletedClinic = await clinic_1.default.findByIdAndDelete(req.params.id);
        if (!deletedClinic)
            return res.status(404).json({ message: "Clinic not found" });
        res.status(200).json({ message: "Clinic deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete clinic.", error: err });
    }
});
exports.default = router;
