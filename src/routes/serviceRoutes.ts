// routes/serviceRoutes.ts
import express from "express";
import Service, { IService } from "../models/services";

const router = express.Router();

// GET all services for a clinic (query param)
router.get("/", async (req, res) => {
  const { clinic } = req.query;

  if (!clinic) return res.status(400).json({ message: "Clinic ID is required" });

  try {
    const services: IService[] = await Service.find({ clinic })
      .populate("categories") // populate category details
      .exec();

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// GET all services for a clinic (path param alternative)
router.get("/clinic/:clinicId", async (req, res) => {
  const { clinicId } = req.params;
  try {
    const services: IService[] = await Service.find({ clinic: clinicId })
      .populate("categories")
      .exec();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// POST create service
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create service" });
  }
});

// PUT update service
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update service" });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete service" });
  }
});

export default router;
