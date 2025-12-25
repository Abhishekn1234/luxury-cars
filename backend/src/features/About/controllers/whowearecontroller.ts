import { Request, Response } from "express";
import * as whoWeAreService from "../services/whoweareservices";
import { CustomRequest } from "../../../types/express";

export const addWhoWeAre = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const payload = {
      title: req.body.title,
      description: req.body.description,
      highlights: req.body.highlights
        ? JSON.parse(req.body.highlights)
        : [],
      isActive: req.body.isActive === "true",
      image: req.file ? req.file.filename : undefined,
    };

    const record = await whoWeAreService.addWhoWeAreService(payload);
    res.status(201).json(record);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to add Who We Are",
    });
  }
};
export const updateWhoWeAre = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const payload: any = {
      title: req.body.title,
      description: req.body.description,
      highlights: req.body.highlights
        ? JSON.parse(req.body.highlights)
        : [],
      isActive: req.body.isActive === "true",
    };

    // ✅ only overwrite image if new file uploaded
    if (req.file) {
      payload.image = req.file.filename;
    }

    const record = await whoWeAreService.updateWhoWeAreService(id, payload);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Who We Are",
    });
  }
};

export const getWhoWeAre = async (
  _: Request,
  res: Response
) => {
  try {
    const record = await whoWeAreService.getWhoWeAreService();
    res.status(200).json(record);
  } catch {
    res.status(500).json({
      message: "Failed to fetch Who We Are",
    });
  }
};
