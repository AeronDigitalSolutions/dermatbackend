"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/admindoctorRoutes.ts
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admindoctor_1 = __importDefault(require("../models/admindoctor"));
const router = express_1.default.Router();
// CREATE doctor (unchanged)
router.post("/", async (req, res) => {
    try {
        const { title, firstName, lastName, specialist, email, password } = req.body;
        if (!firstName || !lastName || !specialist || !email || !password)
            return res.status(400).json({ msg: "Please provide all required fields." });
        const existing = await admindoctor_1.default.findOne({ email: email.toLowerCase() });
        if (existing)
            return res.status(400).json({ msg: "Email already registered." });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const doctor = new admindoctor_1.default({
            title,
            firstName,
            lastName,
            specialist,
            email: email.toLowerCase(),
            password: hashed,
            createdByAdmin: true,
        });
        const saved = await doctor.save();
        res.status(201).json(saved);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
// GET doctors – FIXED: include old doctors
router.get("/", async (_req, res) => {
    try {
        const doctors = await admindoctor_1.default.find({
            $or: [
                { createdByAdmin: true },
                { createdByAdmin: { $exists: false } } // include old docs
            ]
        })
            .select("-password")
            .sort({ createdAt: -1 });
        res.json(doctors);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
// UPDATE doctor
router.put("/:id", async (req, res) => {
    try {
        const updateData = Object.assign({}, req.body);
        if (updateData.password) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        else {
            delete updateData.password;
        }
        const updated = await admindoctor_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select("-password");
        if (!updated)
            return res.status(404).json({ msg: "Doctor not found" });
        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
// DELETE doctor
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await admindoctor_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ msg: "Doctor not found" });
        res.json({ msg: "Doctor deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
exports.default = router;
