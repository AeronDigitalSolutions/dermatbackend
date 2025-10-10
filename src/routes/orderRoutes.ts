import express from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import UserProfile from "../models/userinformation";

const router = express.Router();

/** ✅ Create new order */
router.post("/", async (req, res) => {
  try {
    const { userId, products, totalAmount, address } = req.body;

    if (!userId || !products || !totalAmount || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await UserProfile.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      userId,
      products,
      totalAmount,
      address,
      paymentStatus: "success",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err: any) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});

/** ✅ USER: Get orders for logged-in user */
/** ✅ USER: Get orders for logged-in user */
router.get("/my", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ message: "User ID missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err: any) {
    console.error("❌ Error fetching orders:", err.message);
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

/** ✅ ADMIN: Get all orders (from all users) */
router.get("/all", async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err: any) {
    console.error("❌ Error fetching all orders:", err.message);
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
});

/** ✅ ADMIN: Update order status */
router.put("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    (order as any).status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err: any) {
    console.error("❌ Error updating order status:", err.message);
    res.status(500).json({ message: "Failed to update order status", error: err.message });
  }
});

export default router;
