"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
/* ================= CREATE USER ================= */
router.post("/", async (req, res) => {
    try {
        const { patientId, name, email, contactNo, address } = req.body;
        if (!patientId || !name || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const exists = await user_1.default.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await user_1.default.create({
            patientId,
            name,
            email,
            contactNo,
            address,
        });
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (err) {
        console.error("Create user error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
/* ================= GET ALL USERS ================= */
router.get("/", async (_req, res) => {
    try {
        const users = await user_1.default.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (_a) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});
/* ================= DELETE USER ================= */
router.delete("/:id", async (req, res) => {
    try {
        const user = await user_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (_a) {
        res.status(500).json({ message: "Delete failed" });
    }
});
exports.default = router;
