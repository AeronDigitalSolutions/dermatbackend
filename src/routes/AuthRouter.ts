// routes/authRoutes.ts
import { Router } from "express";
import {
  adminSignup,
  adminLogin,
  userSignup,
  userLogin,
} from "../controllers/AuthController";

const router = Router();

// ------------------ ADMIN ROUTES ------------------
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);

// ------------------ USER ROUTES ------------------
router.post("/user/signup", userSignup);
router.post("/user/login", userLogin);

export default router; // ✅ important for Express
