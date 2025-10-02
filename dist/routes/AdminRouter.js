"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const admin_1 = __importDefault(require("../models/admin"));
const router = express_1.default.Router();
// ✅ Create new admin
router.post('/', adminController_1.createAdmin);
// ✅ Get all admins
router.get('/', async (req, res) => {
    try {
        const admins = await admin_1.default.find().select('-password');
        res.status(200).json(admins);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching admins' });
    }
});
// ✅ Delete admin
router.delete('/:id', async (req, res) => {
    try {
        const admin = await admin_1.default.findByIdAndDelete(req.params.id);
        if (!admin)
            return res.status(404).json({ message: 'Admin not found' });
        res.json({ message: 'Admin deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while deleting admin' });
    }
});
// ✅ Update admin (including role)
router.put('/:id', async (req, res) => {
    const { name, email, number, role } = req.body;
    try {
        const updatedAdmin = await admin_1.default.findByIdAndUpdate(req.params.id, { name, email, number, role }, // ✅ now includes role
        { new: true, runValidators: true }).select("-password");
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({
            message: "Admin updated successfully",
            admin: updatedAdmin,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error while updating admin' });
    }
});
exports.default = router;
