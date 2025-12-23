// controllers/sellingController.ts
import { Request, Response } from "express";
import { createCar, ValidationError } from "../services/selling";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const submitCarForm = async (req: MulterRequest, res: Response) => {
  try {
    const data = req.body;

    // Handle booleans
    data.noc = data.noc === 'true';
    data.isAgree = data.isAgree === 'true';

    // Handle numbers
    if (data.odometer) data.odometer = Number(data.odometer);

    // Handle file upload if exists
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ success: false, message: "Invalid image type" });
      }
      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ success: false, message: "Image too large" });
      }
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

