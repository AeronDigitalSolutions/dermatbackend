"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSignup = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(3).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(3).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};
exports.validateLogin = validateLogin;
