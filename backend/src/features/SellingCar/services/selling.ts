import { Car, ICar } from "../models/selling";
import { Error } from "mongoose";
export class ValidationError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400; // Bad Request
  }
}

export const createCar = async (data: Partial<ICar>) => {
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

  // If validation passes, create a new car
  const car = new Car(data);
  return car.save();
};
