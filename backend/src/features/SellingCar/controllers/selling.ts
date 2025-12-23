// controllers/sellingController.ts
import { Request, Response } from "express";
import { createCar, ValidationError } from "../services/selling";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const submitCarForm = async (req: MulterRequest, res: Response) => {
  try {
    const data = req.body;

    // handle file upload if exists
    if (req.file) {
      data.vehicleImage = `/uploads/${req.file.filename}`;
    }

    const car = await createCar(data);

    return res.status(201).json({ success: true, car });
  } catch (err: any) {
    console.error(err);

    const status = err instanceof ValidationError ? err.status : 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({ success: false, message });
  }
};
