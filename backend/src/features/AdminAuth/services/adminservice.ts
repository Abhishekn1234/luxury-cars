import Admin, { IAdmin } from "../models/Admin";
import jwt from "jsonwebtoken";

export class AdminService {
  async register(name: string, email: string, password: string): Promise<IAdmin> {
    const existing = await Admin.findOne({ email });
    if (existing) throw new Error("Admin already exists");
    const admin = new Admin({ name, email, password });
    return admin.save();
  }

  async login(email: string, password: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Invalid credentials");

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    return { admin, token };
  }

  async getAdminById(id: string) {
    return Admin.findById(id).select("-password");
  }
}
