"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const clinicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secretkey");
        req.clinic = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
exports.clinicAuth = clinicAuth;
