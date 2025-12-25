import { Router } from "express";
import {
 
  getServices,
  deleteServices,
  updateServices,
  createServices,
} from "../services/serviceservice";
import {upload} from "../../AdminAuth/middlewares/upload"; // multer middleware
import { authMiddleware } from "../../AdminAuth/middlewares/auth";
// import adminAuth from "../middleware/adminAuth"; // optional
import * as controller from "../services/serviceservice";
const router = Router();

/**
 * Public
 */
router.get("/", getServices);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createServices
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateServices
);

router.delete("/:id", authMiddleware, deleteServices);

router.post("/testdrive", controller.createTestDrive);
router.get("/testdrive", controller.getAllTestDrives);
router.get("/testdrive/:id", controller.getTestDriveById);

router.delete("/testdrive/:id/delete", controller.deleteTestDrive);
export default router;
