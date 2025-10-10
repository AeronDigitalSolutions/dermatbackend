import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  address: {
    type: string;
    address: string;
  };
  paymentStatus?: "pending" | "success" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile", // name of your user model
      required: true,
    },
    products: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: {
        type: String,
        enum: ["Home", "Work", "Other"],
        required: true,
      },
      address: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
