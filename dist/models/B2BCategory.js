"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/* ================= SCHEMA ================= */
const B2BCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });
/* ================= MODEL ================= */
const B2BCategoryModel = mongoose_1.models.B2BCategory ||
    (0, mongoose_1.model)("B2BCategory", B2BCategorySchema);
exports.default = B2BCategoryModel;
