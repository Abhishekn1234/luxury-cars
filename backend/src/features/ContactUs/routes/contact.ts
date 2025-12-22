import { Router } from "express";
import { sendContactMail } from "../controllers/contactController";

const router = Router();

router.post("/contact", sendContactMail);

export default router;
