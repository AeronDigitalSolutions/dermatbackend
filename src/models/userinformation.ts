import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
  type: "Home" | "Work" | "Other";
  address: string;
}

export interface IUserProfile extends Document {
  _id: string; // MongoDB automatically generates this
  email: string;
  name: string;
  age: number;
  image: string;
  addresses: IAddress[];
}

const addressSchema = new Schema<IAddress>({
  type: { type: String, enum: ["Home", "Work", "Other"], required: true },
  address: { type: String, required: true },
});

const userProfileSchema = new Schema<IUserProfile>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true, default: 0 },
    image: { type: String, required: true, default: "" },
    addresses: { type: [addressSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IUserProfile>("UserProfile", userProfileSchema);
