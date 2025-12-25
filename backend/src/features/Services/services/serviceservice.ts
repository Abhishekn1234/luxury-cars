import { Request, Response } from "express";
import Services from "../models/services";
import { ITestDrive }  from "../models/testdrive";
import TestDrive from "../models/testdrive";
/**
 * CREATE Services
 */
export const createServices = async (req: any, res: Response) => {
  try {
    let services = req.body.services;
    if (typeof services === "string") {
      services = JSON.parse(services);
    }

    const record = await Services.create({
      services,
      isActive: req.body.isActive !== "false",
      image: req.file?.filename,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create services" });
  }
};

/**
 * UPDATE Services BY ID
 */
export const updateServices = async (req: any, res: Response) => {
  try {
    let services = req.body.services;
    if (typeof services === "string") {
      services = JSON.parse(services);
    }

    const updated = await Services.findByIdAndUpdate(
      req.params.id,
      {
        services,
        isActive: req.body.isActive !== "false",
        image: req.file?.filename,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Services not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update services" });
  }
};

/**
 * GET ALL SERVICES
 */
export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/**
 * DELETE BY ID
 */
export const deleteServices = async (req: Request, res: Response) => {
  try {
    const deleted = await Services.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Services not found" });
    }
    res.json({ message: "Services deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete services" });
  }
};


export const createTestDrive = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, car } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !car) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check for duplicate (same email + car)
    const existing = await TestDrive.findOne({ email, car });
    if (existing) {
      return res.status(400).json({ message: "You have already scheduled a test drive for this car." });
    }

    const testDrive = await TestDrive.create({ firstName, lastName, email, phone, car });

    res.status(201).json(testDrive);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
export const getAllTestDrives = async () => {
  return await TestDrive.find()
    .populate("car", "name model price image")
    .sort({ createdAt: -1 });
};

export const getTestDriveById = async (id: string) => {
  return await TestDrive.findById(id).populate("car");
};

export const updateTestDriveStatus = async (
  id: string,
  status: ITestDrive["status"]
) => {
  return await TestDrive.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const deleteTestDrive = async (id: string) => {
  return await TestDrive.findByIdAndDelete(id);
};
