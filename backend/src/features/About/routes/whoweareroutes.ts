import express from "express";
import * as controller from "../controllers/whowearecontroller";
import { upload } from "../../AdminAuth/middlewares/upload";
import { authMiddleware } from "../../AdminAuth/middlewares/auth";

const router = express.Router();

/* Public */
router.get("/", controller.getWhoWeAre);

/* Admin */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  controller.addWhoWeAre
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  controller.updateWhoWeAre
);

export default router;
