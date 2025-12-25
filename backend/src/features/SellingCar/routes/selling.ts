import express from "express";
import { getAllSellingCars, submitCarForm } from "../controllers/selling";
import multer from "multer";
import path from "path";

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("vehicleImage"), submitCarForm);
router.get("/", getAllSellingCars);
export default router;
