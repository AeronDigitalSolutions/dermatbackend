"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const editClinic_1 = __importDefault(require("../models/editClinic"));
const router = express_1.default.Router();
// ✅ Get a single clinic by ID
router.get("/:id", async (req, res) => {
    try {
        const clinic = await editClinic_1.default.findById(req.params.id);
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.json(clinic);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// ✅ Update clinic by ID
router.put("/:id", async (req, res) => {
    try {
        const { name, mobile, whatsapp, mapLink, address, verified, trusted, image, } = req.body;
        const clinic = await editClinic_1.default.findByIdAndUpdate(req.params.id, { name, mobile, whatsapp, mapLink, address, verified, trusted, image }, { new: true, runValidators: true });
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found" });
        }
        res.json(clinic);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
