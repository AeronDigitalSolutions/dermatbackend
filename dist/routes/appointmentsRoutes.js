"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/appointmentRoutes.ts
const express_1 = __importDefault(require("express"));
const appointments_1 = __importDefault(require("../models/appointments"));
const router = express_1.default.Router();
// CREATE appointment
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, date, doctor } = req.body;
        if (!firstName || !lastName || !date || !doctor) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newAppointment = new appointments_1.default({
            firstName,
            lastName,
            date,
            doctor,
        });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
// GET all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await appointments_1.default.find().sort({ date: 1 });
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
// GET one appointment by ID
router.get("/:id", async (req, res) => {
    try {
        const appointment = await appointments_1.default.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
// UPDATE appointment
router.put("/:id", async (req, res) => {
    try {
        const { firstName, lastName, date, doctor } = req.body;
        const updatedAppointment = await appointments_1.default.findByIdAndUpdate(req.params.id, { firstName, lastName, date, doctor }, { new: true, runValidators: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(updatedAppointment);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
// DELETE appointment
router.delete("/:id", async (req, res) => {
    try {
        const deletedAppointment = await appointments_1.default.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.default = router;
