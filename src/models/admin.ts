import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  empId: string;
  name: string;
  email: string;
  number: string;
  password: string;
  role: "admin" | "superadmin"; // 👈 important
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    empId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" }, // 👈 default
  },
  { timestamps: true }
);

// Hash password before save
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
adminSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IAdmin>("Admin", adminSchema);
