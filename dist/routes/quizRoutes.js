"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Quiz_1 = __importDefault(require("../models/Quiz"));
const router = express_1.default.Router();
function getErrorMessage(err) {
    if (err instanceof Error)
        return err.message;
    return String(err);
}
// Create
router.post("/", async (req, res) => {
    try {
        const quiz = new Quiz_1.default(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    }
    catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});
// Get by category
router.get("/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const quizzes = await Quiz_1.default.find({ category });
        res.json(quizzes);
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
});
// Update
router.put("/:id", async (req, res) => {
    try {
        const updated = await Quiz_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});
// Delete
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Quiz_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    }
    catch (err) {
        res.status(500).json({ error: getErrorMessage(err) });
    }
});
exports.default = router;
