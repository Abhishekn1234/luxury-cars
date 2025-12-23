"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST, // from .env
    port: Number(process.env.SMTP_PORT), // convert to number
    secure: process.env.SMTP_PORT === "465", // true for 465, false otherwise
    auth: {
        user: process.env.SMTP_USER, // from .env
        pass: process.env.SMTP_PASS, // from .env
    },
    tls: {
        rejectUnauthorized: false, // optional for dev environments
    },
});
exports.default = transporter;
