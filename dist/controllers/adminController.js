"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const admin_1 = __importDefault(require("../models/admin"));
/* ================= CREATE ADMIN ================= */
const createAdmin = async (req, res) => {
    try {
        console.log("🔥 RAW REQ BODY:", req.body);
        let { empId, name, email, phone, password, accessLevel } = req.body;
        // ✅ ALWAYS generate empId on backend
        if (!empId) {
            empId = `ADM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
        // ✅ REQUIRED FIELDS
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingAdmin = await admin_1.default.findOne({
            $or: [{ email }, { empId }],
        });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin with same email or ID already exists",
            });
        }
        const role = ["admin", "superadmin", "manager"].includes(accessLevel)
            ? accessLevel
            : "admin";
        const admin = await admin_1.default.create({
            empId,
            name,
            email: email.toLowerCase(),
            phone,
            password,
            role,
        });
        return res.status(201).json({
            message: "Admin created successfully",
            admin,
        });
    }
    catch (error) {
        console.error("Create Admin Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.createAdmin = createAdmin;
