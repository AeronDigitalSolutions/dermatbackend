"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clinic_1 = __importDefault(require("../models/clinic"));
const clinicCategory_1 = __importDefault(require("../models/clinicCategory"));
const router = express_1.default.Router();
/* ================= CREATE CLINIC ================= */
router.post("/", async (req, res) => {
    try {
        const _a = req.body, { cuc, clinicName, dermaCategory, address, email, doctors } = _a, rest = __rest(_a, ["cuc", "clinicName", "dermaCategory", "address", "email", "doctors"]);
        if (!cuc || !clinicName || !dermaCategory || !address || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const categoryExists = await clinicCategory_1.default.findById(dermaCategory);
        if (!categoryExists) {
            return res.status(400).json({ message: "Invalid clinic category" });
        }
        const exists = await clinic_1.default.findOne({ cuc });
        if (exists) {
            return res.status(400).json({ message: "Clinic already exists" });
        }
        const clinic = await clinic_1.default.create(Object.assign({ cuc,
            clinicName,
            dermaCategory,
            address,
            email,
            doctors }, rest));
        res.status(201).json({
            message: "Clinic created successfully",
            clinic,
        });
    }
    catch (err) {
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
        const clinics = await clinic_1.default.find().populate("dermaCategory", "name");
        res.json(clinics);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch clinics" });
    }
});
/* ================= GET SINGLE CLINIC ================= */
router.get("/:id", async (req, res) => {
    try {
        const clinic = await clinic_1.default.findById(req.params.id).populate("dermaCategory", "name");
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.json(clinic);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch clinic" });
    }
});
/* ================= UPDATE CLINIC ================= */
router.put("/:id", async (req, res) => {
    try {
        const updated = await clinic_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("dermaCategory", "name");
        if (!updated) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update clinic" });
    }
});
/* ================= DELETE CLINIC ================= */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await clinic_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.json({ message: "Clinic deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete clinic" });
    }
});
exports.default = router;
