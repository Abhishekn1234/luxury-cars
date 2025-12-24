import { IAdmin } from "../../features/AdminAuth/models/Admin"; // adjust path

declare global {
  namespace Express {
    interface Request {
      // your JWT payload
      user?: { id: string } | IAdmin;
    }
  }
}
