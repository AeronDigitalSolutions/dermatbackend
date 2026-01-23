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
        const { userId, name, email, phone, password, accessLevel } = req.body;
        if (!userId || !name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingAdmin = await admin_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const normalizedRole = ["admin", "superadmin", "manager"].includes(accessLevel === null || accessLevel === void 0 ? void 0 : accessLevel.toLowerCase())
            ? accessLevel.toLowerCase()
            : "admin";
        const admin = await admin_1.default.create({
            empId: userId,
            name,
            email,
            phone,
            password,
            role: normalizedRole,
        });
        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                empId: admin.empId,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: admin.role,
            },
        });
    }
    catch (error) {
        console.error("Create Admin Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createAdmin = createAdmin;
