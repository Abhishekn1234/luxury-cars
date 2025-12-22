import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,                   // from .env
  port: Number(process.env.SMTP_PORT),          // convert to number
  secure: process.env.SMTP_PORT === "465",      // true for 465, false otherwise
  auth: {
    user: process.env.SMTP_USER,                // from .env
    pass: process.env.SMTP_PASS,                // from .env
  },
  tls: {
    rejectUnauthorized: false,                  // optional for dev environments
  },
});

export default transporter;

