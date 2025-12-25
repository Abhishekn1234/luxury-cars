import { Router } from "express";
import { getAllContacts, sendContactMail } from "../controllers/contactController";

const router = Router();

router.post("/contact", sendContactMail);
router.get("/", getAllContacts);
export default router;
