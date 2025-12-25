import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITestDrive extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  car: Types.ObjectId;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const testDriveSchema = new Schema<ITestDrive>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TestDrive = mongoose.model<ITestDrive>(
  "TestDrive",
  testDriveSchema
);

export default TestDrive;
