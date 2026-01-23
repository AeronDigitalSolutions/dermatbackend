import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IDoctor extends Document {
  title: string;
  firstName: string;
  lastName: string;
  specialist: string;
  email: string;
  password: string;
  description?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    specialist: {
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

    password: {
      type: String,
      required: true,
      select: false,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

/* ===== HASH PASSWORD ===== */
DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ===== COMPARE PASSWORD ===== */
DoctorSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IDoctor>("Doctor", DoctorSchema);
