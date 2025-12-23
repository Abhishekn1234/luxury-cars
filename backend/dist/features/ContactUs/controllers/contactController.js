"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMail = void 0;
const mail_1 = __importDefault(require("../../config/mail"));
const contact_1 = __importDefault(require("../models/contact")); // Import Mongoose model
const sendContactMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        // Save message to MongoDB
        const newMessage = yield contact_1.default.create({ firstName, lastName, email, message });
        // Optional: Send confirmation email
        if (process.env.SMTP_HOST) {
            yield mail_1.default.sendMail({
                from: `"Your Company" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Contact Form Submission Confirmation",
                html: `
          <h2>Hi ${firstName} ${lastName},</h2>
          <p>Thank you for reaching out! We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>Our team will contact you within 24 hours.</p>
        `,
            });
        }
        res.status(200).json({ success: true, message: "Message saved successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.sendContactMail = sendContactMail;
