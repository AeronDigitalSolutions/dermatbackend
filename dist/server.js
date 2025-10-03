"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
// Routes
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
const Category_1 = __importDefault(require("./routes/Category"));
const clinicRoutes_1 = __importDefault(require("./routes/clinicRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const appointmentsRoutes_1 = __importDefault(require("./routes/appointmentsRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const EditClinicRoutes_1 = __importDefault(require("./routes/EditClinicRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const offerRotes_1 = __importDefault(require("./routes/offerRotes"));
const admindoctorRoutes_1 = __importDefault(require("./routes/admindoctorRoutes"));
const serviceCategoryRoutes_1 = __importDefault(require("./routes/serviceCategoryRoutes"));
const clinicCategoryRoutes_1 = __importDefault(require("./routes/clinicCategoryRoutes"));
const TopProducts_1 = __importDefault(require("./routes/TopProducts"));
const latestofferRoutes_1 = __importDefault(require("./routes/latestofferRoutes"));
const latestshortsRoutes_1 = __importDefault(require("./routes/latestshortsRoutes"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const treatmentshortsRoutes_1 = __importDefault(require("./routes/treatmentshortsRoutes"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// -------------------- MIDDLEWARE --------------------
server.use((0, cors_1.default)({
    origin: "https://drdermatwebsite.vercel.app", // Replace with your actual Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
server.use(express_1.default.json({ limit: "20mb" }));
// -------------------- STATIC FILES --------------------
server.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// -------------------- ROOT ROUTE --------------------
server.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});
// -------------------- API ROUTES --------------------
server.use("/api/auth", AuthRouter_1.default);
server.use("/api/users", UserRouter_1.default);
server.use("/api/admins", AdminRouter_1.default);
server.use("/api/categories", Category_1.default);
server.use("/api/clinics", clinicRoutes_1.default);
server.use("/api/products", productRoutes_1.default);
server.use("/api/appointments", appointmentsRoutes_1.default);
server.use("/api/doctors", doctorRoutes_1.default);
server.use("/api/editclinics", EditClinicRoutes_1.default);
server.use("/api/services", serviceRoutes_1.default);
server.use("/api/offers", offerRotes_1.default);
server.use("/api/doctoradmin", admindoctorRoutes_1.default);
server.use("/api/service-categories", serviceCategoryRoutes_1.default);
server.use("/api/clinic-categories", clinicCategoryRoutes_1.default);
server.use("/api/top-products", TopProducts_1.default);
server.use("/api/latest-offers", latestofferRoutes_1.default);
server.use("/api/latest-shorts", latestshortsRoutes_1.default);
server.use("/api/quiz", quizRoutes_1.default);
server.use("/api/treatment-shorts", treatmentshortsRoutes_1.default);
// -------------------- MONGODB CONNECTION --------------------
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}`);
});
