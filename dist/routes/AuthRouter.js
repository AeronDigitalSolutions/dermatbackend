"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/authRoutes.ts
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
// ------------------ ADMIN ROUTES ------------------
router.post("/admin/signup", AuthController_1.adminSignup);
router.post("/admin/login", AuthController_1.adminLogin);
// ------------------ USER ROUTES ------------------
router.post("/user/signup", AuthController_1.userSignup);
router.post("/user/login", AuthController_1.userLogin);
exports.default = router; // ✅ important for Express
