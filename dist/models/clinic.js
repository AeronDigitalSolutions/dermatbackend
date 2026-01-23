"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DoctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    specialization: { type: String, required: true },
}, { _id: false });
const ClinicSchema = new mongoose_1.Schema({
    cuc: { type: String, required: true, unique: true },
    clinicName: { type: String, required: true },
    clinicType: String,
    ownerName: String,
    website: String,
    dermaCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ClinicCategory",
        required: true,
    },
    clinicLogo: String,
    bannerImage: String,
    specialOffers: [String],
    rateCard: [String],
    photos: [String],
    videos: [String],
    certifications: [String],
    doctors: [DoctorSchema],
    address: { type: String, required: true },
    city: String,
    services: String,
    sector: String,
    pincode: String,
    mapLink: String,
    contactNumber: String,
    whatsapp: String,
    email: { type: String, required: true },
    workingHours: String,
    licenseNo: String,
    experience: String,
    treatmentsAvailable: String,
    availableServices: String,
    consultationFee: String,
    bookingMode: String,
    clinicDescription: String,
    instagram: String,
    linkedin: String,
    facebook: String,
    standardPlanLink: String,
    clinicStatus: { type: String, default: "Open" },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Clinic ||
    mongoose_1.default.model("Clinic", ClinicSchema);
