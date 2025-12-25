import { Schema, model, Document } from "mongoose";

export interface IServiceItem {
  title: string;
  description: string;
  points: string[];
  icon?: string;
}

export interface IServices extends Document {
  services: IServiceItem[];
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceItemSchema = new Schema<IServiceItem>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    points: { type: [String], required: true },
    icon: { type: String },
  },
  { _id: false }
);

const ServicesSchema = new Schema<IServices>(
  {
    services: {
      type: [ServiceItemSchema],
      required: true,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<IServices>("Services", ServicesSchema);
