"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// ✅ Middleware to check token
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
// ✅ GET /api/users/me — fetch logged in user's profile
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});
// Existing get all users
router.get("/", async (req, res) => {
    try {
        const users = await user_1.default.find({}, "-password");
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});
exports.default = router;
