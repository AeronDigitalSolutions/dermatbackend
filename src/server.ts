import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Routes
import authRoutes from "./routes/AuthRouter";
import userRoutes from "./routes/UserRouter";
import adminRoutes from "./routes/AdminRouter";
import categoryRoutes from "./routes/Category";
import clinicRoutes from "./routes/clinicRoutes";
import productRoutes from "./routes/productRoutes";
import appointmentRoutes from "./routes/appointmentsRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import editClinicRoutes from "./routes/EditClinicRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import offerRoutes from "./routes/offerRotes";
import doctorAdminRoutes from "./routes/admindoctorRoutes";
import serviceCategoryRoutes from "./routes/serviceCategoryRoutes";
import clinicCategoryRoutes from "./routes/clinicCategoryRoutes";
import topProductsRoute from "./routes/TopProducts";
import latestOfferRoutes from "./routes/latestofferRoutes";
import latestShortRoutes from "./routes/latestshortsRoutes";
import quizRoutes from "./routes/quizRoutes";
import treatmentShortsRoutes from "./routes/treatmentshortsRoutes";

dotenv.config();

const server = express();

// Middleware
server.use(cors());
server.use(express.json({ limit: "20mb" }));

// Static uploads
server.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API routes
server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/admins", adminRoutes);
server.use("/api/categories", categoryRoutes);
server.use("/api/clinics", clinicRoutes);
server.use("/api/products", productRoutes);
server.use("/api/appointments", appointmentRoutes);
server.use("/api/doctors", doctorRoutes);
server.use("/api/editclinics", editClinicRoutes);
server.use("/api/services", serviceRoutes);
server.use("/api/offers", offerRoutes);
server.use("/api/doctoradmin", doctorAdminRoutes);
server.use("/api/service-categories", serviceCategoryRoutes);
server.use("/api/clinic-categories", clinicCategoryRoutes);
server.use("/api/top-products", topProductsRoute);
server.use("/api/latest-offers", latestOfferRoutes);
server.use("/api/latest-shorts", latestShortRoutes);
server.use("/api/quiz", quizRoutes);
server.use("/api/treatment-shorts", treatmentShortsRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server ready on http://localhost:${PORT}`);
});
