"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = exports.adminLogin = exports.adminSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../models/admin"));
const user_1 = __importDefault(require("../models/user"));
// Helper function to generate JWT
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
    });
};
// ------------------ ADMIN SIGNUP ------------------
const adminSignup = async (req, res) => {
    try {
        const { empId, name, email, number, password, role } = req.body;
        if (!email || !password || !empId) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        const existing = await admin_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // ✅ allow setting role if provided, default "admin"
        const newAdmin = await admin_1.default.create({
            empId,
            name,
            email,
            number,
            password,
            role: role === "superadmin" ? "superadmin" : "admin",
        });
        const token = generateToken(newAdmin._id.toString(), newAdmin.role);
        res.status(201).json({
            message: "Admin signup successful",
            token,
            role: newAdmin.role, // ✅ include role
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role,
            },
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Admin signup failed", error: err.message });
    }
};
exports.adminSignup = adminSignup;
// ------------------ ADMIN LOGIN ------------------
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_1.default.findOne({ email });
        if (!admin)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await admin.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        const token = generateToken(admin._id.toString(), admin.role);
        res.json({
            message: `${admin.role} login successful`,
            token,
            role: admin.role, // ✅ include role
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
exports.adminLogin = adminLogin;
// ------------------ USER SIGNUP ------------------
const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const existing = await user_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const newUser = await user_1.default.create({ name, email, password });
        const token = generateToken(newUser._id.toString(), "user");
        res.status(201).json({
            message: "User signup successful",
            token,
            role: "user", // ✅ include role
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    }
    catch (err) {
        res.status(500).json({ message: "User signup failed", error: err.message });
    }
};
exports.userSignup = userSignup;
// ------------------ USER LOGIN ------------------
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        const token = generateToken(user._id.toString(), "user");
        res.json({
            message: "User login successful",
            token,
            role: "user", // ✅ include role
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
exports.userLogin = userLogin;
