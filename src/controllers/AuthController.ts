import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import User from "../models/user";

// Helper function to generate JWT
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
};

// ------------------ ADMIN SIGNUP ------------------
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { empId, name, email, number, password, role } = req.body;

    if (!email || !password || !empId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ allow setting role if provided, default "admin"
    const newAdmin = await Admin.create({
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
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Admin signup failed", error: err.message });
  }
};

// ------------------ ADMIN LOGIN ------------------
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
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
  } catch (err: any) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ------------------ USER SIGNUP ------------------
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({ name, email, password });

    const token = generateToken(newUser._id.toString(), "user");

    res.status(201).json({
      message: "User signup successful",
      token,
      role: "user", // ✅ include role
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err: any) {
    res.status(500).json({ message: "User signup failed", error: err.message });
  }
};

// ------------------ USER LOGIN ------------------
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
  } catch (err: any) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
