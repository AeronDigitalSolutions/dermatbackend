import { Request, Response } from "express";
import Admin from "../models/admin";

/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { empId, name, email, phone, password, accessLevel } = req.body;

    // ✅ STRICT VALIDATION
    if (!empId || !name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingAdmin = await Admin.findOne({
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

    const admin = await Admin.create({
      empId, // ✅ FROM FRONTEND
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role,
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
  } catch (error: any) {
    console.error("Create Admin Error:", error);
console.log("REQ BODY:", req.body);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Admin with same email or ID already exists",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};
