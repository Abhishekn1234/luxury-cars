import { Router } from "express";
import { registerAdmin, loginAdmin, getProfile } from "../controllers/admincontroller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected route
router.get("/profile", authMiddleware, getProfile);

export default router;
