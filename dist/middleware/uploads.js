"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define upload directory
const uploadPath = path_1.default.join(process.cwd(), "uploads");
// Ensure uploads folder exists
fs_1.default.mkdirSync(uploadPath, { recursive: true });
// Multer storage config
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadPath);
    },
    filename: function (_req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
});
exports.default = upload;
