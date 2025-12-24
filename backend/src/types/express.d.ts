import { Request } from "express";
import { IAdmin } from "../../features/AdminAuth/models/Admin";

// Extend Express Request with a generic user type
export interface CustomRequest extends Request {
  user?: { id: string } | IAdmin;
}
