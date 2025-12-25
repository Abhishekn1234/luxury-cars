import mongoose, { Schema, Document } from "mongoose";

export interface ICar{
  name: string;
  model: string;
  year: number;
  price: number;
  description:string;
  mileage: string;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  theme:string;
  condition: "Excellent" | "Good" | "Fair";
  featured: boolean;
  isFavorite: boolean;
}

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: String, required: true },
    fuelType: { type: String, required: true },
    description:{type:String},
    theme:{type:String},
    transmission: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair"],
      default: "Good",
    },
    featured: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICar>("Car", carSchema);
