import express from 'express';
import { createAdmin } from "../controllers/adminController";
import Admin from '../models/admin';

const router = express.Router();

// ✅ Create new admin
router.post('/', createAdmin);

// ✅ Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

// ✅ Delete admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting admin' });
  }
});

// ✅ Update admin (including role)
router.put('/:id', async (req, res) => {
  const { name, email, number, role } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, number, role }, // ✅ now includes role
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating admin' });
  }
});

export default router;
