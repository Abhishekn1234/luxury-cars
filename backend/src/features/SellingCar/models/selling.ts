import mongoose, { Schema, Document } from "mongoose";

export interface ISellingCar {
  type: string;
  name: string;
  mobile: string;
  email: string;
  houseName: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  post: string;
  address: string;
  vehicle: string;
  modelName: string;
  brand: string;
  registrationYear: string;
  odometer: string;
  ownership: string;
  noc: boolean;
  color: string;
  registration: string;
  insurance: string;
  transmission: string;
  manufacturingYear: string;
  fuelType: string;
  vehicleImage: string;
  isAgree: boolean;
}

const carSchema: Schema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  houseName: { type: String },
  state: { type: String },
  district: { type: String },
  city: { type: String },
  pincode: { type: String },
  post: { type: String },
  address: { type: String },
  vehicle: { type: String },
  modelName: { type: String },
  brand: { type: String },
  registrationYear: { type: String },
  odometer: { type: String },
  ownership: { type: String },
  noc: { type: Boolean, default: false },
  color: { type: String },
  registration: { type: String },
  insurance: { type: String },
  transmission: { type: String },
  manufacturingYear: { type: String },
  fuelType: { type: String },
  vehicleImage: { type: String }, // we can store image URL
  isAgree: { type: Boolean, default: false },
}, { timestamps: true });

export const Car = mongoose.model<ISellingCar>("SellingCar", carSchema);
