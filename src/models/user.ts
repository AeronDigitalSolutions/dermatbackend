import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  patientId: string;
  name: string;
  email: string;
  contactNo?: string;
  address?: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    patientId: {
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

    contactNo: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 hidden by default
    },
  },
  { timestamps: true }
);

/* ===== HASH PASSWORD ===== */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ===== COMPARE PASSWORD ===== */
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
