import { Request, Response } from "express";
import Admin from "../models/admin";

/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req: Request, res: Response) => {

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
  } catch (error) {
    console.error("Create Admin Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
