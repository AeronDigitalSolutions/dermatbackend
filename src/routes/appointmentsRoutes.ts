// routes/appointmentRoutes.ts
import express, { Request, Response } from "express";
import Appointment from "../models/appointments";

const router = express.Router();

// CREATE appointment
router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, date, doctor } = req.body;

    if (!firstName || !lastName || !date || !doctor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      firstName,
      lastName,
      date,
      doctor,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET all appointments
router.get("/", async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET one appointment by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// UPDATE appointment
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, date, doctor } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, date, doctor },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// DELETE appointment
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
