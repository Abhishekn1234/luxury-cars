import { Request, Response } from "express";
import * as carService from "../services/carservices";
import { CustomRequest } from "../../../types/express";

export const getCars = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const result = await carService.getAllCars(
    +page,
    +limit,
    String(search)
  );
  res.json(result);
};


export const getCar = async (req: Request, res: Response) => {
  const car = await carService.getCarById(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
};

export const createCar = async (req: CustomRequest, res: Response) => {
  const image = req.file?.filename;
  const car = await carService.createCar({
    ...req.body,
    image,
  });
  res.status(201).json(car);
};

export const updateCar = async (req: CustomRequest, res: Response) => {
  try {
    const updateData: any = { ...req.body };

    // ✅ If image uploaded, attach filename
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const car = await carService.updateCar(req.params.id, updateData);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Failed to update car" });
  }
};

export const deleteCar = async (req: CustomRequest, res: Response) => {
  const car = await carService.deleteCar(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json({ message: "Car deleted" });
};

// ⭐ Favorite toggle
export const favoriteCar = async (req: Request, res: Response) => {
  const car = await carService.toggleFavorite(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
};
