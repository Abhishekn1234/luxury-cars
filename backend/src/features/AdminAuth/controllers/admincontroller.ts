import { Request, Response } from "express";
import { AdminService } from "../services/adminservice";
import { CustomRequest } from "../../../types/express";

const service = new AdminService();

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const admin = await service.register(name, email, password);
    res.status(201).json(admin);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await service.login(email, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProfile = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = "_id" in user ? user._id.toString() : user.id;

    const admin = await service.getAdminById(userId);
    res.json(admin);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};




