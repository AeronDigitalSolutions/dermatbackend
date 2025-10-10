import express from "express";
import UserProfile from "../models/userinformation";

const router = express.Router();

/** ✅ GET user by email */
router.get("/:email", async (req, res) => {
  try {
    const user = await UserProfile.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    console.error("❌ Error fetching user:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** ✅ GET user by ID */
router.get("/id/:id", async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    console.error("❌ Error fetching user by ID:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** ✅ POST create or update user profile */
router.post("/", async (req, res) => {
  try {
    const { email, name, age, image, addresses } = req.body;

    let user = await UserProfile.findOne({ email });

    if (user) {
      user.name = name;
      user.age = age;
      user.image = image;
      user.addresses = addresses;
      await user.save();
    } else {
      user = new UserProfile({ email, name, age, image, addresses });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err: any) {
    console.error("❌ Error saving profile:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
