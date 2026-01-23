import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  empId: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "admin" | "superadmin" | "manager";
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    empId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 hidden by default
    },

    role: {
      type: String,
      enum: ["admin", "superadmin", "manager"],
      default: "admin",
    },
  },
  { timestamps: true }
);

/* ===== HASH PASSWORD ===== */
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ===== COMPARE PASSWORD ===== */
adminSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IAdmin>("Admin", adminSchema);
