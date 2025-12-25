import { Car, ISellingCar } from "../models/selling";
import { Error } from "mongoose";

export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400; // Bad Request
  }
}

// Utility function to validate email
const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Utility function to validate mobile number (India example)
const isValidMobile = (mobile: string) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile);
};

export const createCar = async (data: Partial<ISellingCar>) => {
  // Basic required fields validation
  const requiredFields = [
    "type", "name", "mobile", "email", "vehicle", "modelName", "brand", "ownership", "transmission", "fuelType", "isAgree"
  ];

  for (const field of requiredFields) {
    if (!data[field as keyof ISellingCar] || data[field as keyof ISellingCar] === "") {
      throw new ValidationError(`${field} is required`);
    }
  }

  // Email validation
  if (!isValidEmail(data.email!)) {
    throw new ValidationError("Invalid email format");
  }

  // Mobile validation
  if (!isValidMobile(data.mobile!)) {
    throw new ValidationError("Invalid mobile number format");
  }

  // Odometer should be a number if provided
  if (data.odometer && isNaN(Number(data.odometer))) {
    throw new ValidationError("Odometer must be a number");
  }

  // Registration Year and Manufacturing Year should be valid dates if provided
  if (data.registrationYear && isNaN(Date.parse(data.registrationYear))) {
    throw new ValidationError("Invalid registration year");
  }
  if (data.manufacturingYear && isNaN(Date.parse(data.manufacturingYear))) {
    throw new ValidationError("Invalid manufacturing year");
  }

  // Check if email or mobile already exists
  const existingCar = await Car.findOne({
    $or: [{ email: data.email }, { mobile: data.mobile }],
  });

  if (existingCar) {
    if (existingCar.email === data.email) {
      throw new ValidationError("Email already exists");
    }
    if (existingCar.mobile === data.mobile) {
      throw new ValidationError("Mobile number already exists");
    }
  }

  // Save new car
  const car = new Car(data);
  return car.save();
};

export const getAllSellingCarsService = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Car.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Car.countDocuments(),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};