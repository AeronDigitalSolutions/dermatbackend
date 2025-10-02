"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/serviceRoutes.ts
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("../models/services"));
const router = express_1.default.Router();
// GET all services for a clinic (query param)
router.get("/", async (req, res) => {
    const { clinic } = req.query;
    if (!clinic)
        return res.status(400).json({ message: "Clinic ID is required" });
    try {
        const services = await services_1.default.find({ clinic })
            .populate("categories") // populate category details
            .exec();
        res.json(services);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch services" });
    }
});
// GET all services for a clinic (path param alternative)
router.get("/clinic/:clinicId", async (req, res) => {
    const { clinicId } = req.params;
    try {
        const services = await services_1.default.find({ clinic: clinicId })
            .populate("categories")
            .exec();
        res.json(services);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch services" });
    }
});
// POST create service
router.post("/", async (req, res) => {
    try {
        const service = new services_1.default(req.body);
        await service.save();
        res.status(201).json(service);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create service" });
    }
});
// PUT update service
router.put("/:id", async (req, res) => {
    try {
        const updatedService = await services_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedService);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update service" });
    }
});
// DELETE service
router.delete("/:id", async (req, res) => {
    try {
        await services_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Service deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete service" });
    }
});
exports.default = router;
