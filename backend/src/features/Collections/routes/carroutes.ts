import express from "express";
import * as carController from "../controllers/carcontrollers";

const router = express.Router();
import { upload } from "../../AdminAuth/middlewares/upload";
import { authMiddleware } from "../../AdminAuth/middlewares/auth";
router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.post("/", authMiddleware,upload.single("image"),carController.createCar);
router.put("/:id", authMiddleware,upload.single("image"),carController.updateCar);
router.delete("/:id", authMiddleware,carController.deleteCar);

// ⭐ Favorite
router.patch("/:id/favorite", carController.favoriteCar);

export default router;
