import { Request, Response } from "express";
import Admin from "../models/admin";

/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, phone, password, accessLevel } = req.body;

    if (!userId || !name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const normalizedRole = ["admin", "superadmin", "manager"].includes(
      accessLevel?.toLowerCase()
    )
      ? accessLevel.toLowerCase()
      : "admin";

    const admin = await Admin.create({
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
  } catch (error) {
    console.error("Create Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
