// src/controllers/sendContactMail.ts
import { Request, Response } from "express";
import ContactMessage from "../models/contact"; // Mongoose model
import { sendSimpleMessage } from "../../config/mail";
import dotenv from "dotenv";

dotenv.config();

// Controller to handle contact form submissions
export const sendContactMail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // 1️⃣ Save message to MongoDB
    const newMessage = await ContactMessage.create({ firstName, lastName, email, message });

    // 2️⃣ Send confirmation via Formspree
    try {
      await sendSimpleMessage({
        from: `${firstName} ${lastName}`, // Name of sender
        to: email,                        // Recipient is the user
        subject: "Contact Form Submission Confirmation",
        text: `Hi ${firstName} ${lastName},\n\nThank you for reaching out! We have received your message:\n\n${message}\n\nOur team will contact you within 24 hours.`,
        html: `
          <h2>Hi ${firstName} ${lastName},</h2>
          <p>Thank you for reaching out! We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>Our team will contact you within 24 hours.</p>
        `,
      });
    } catch (mailErr) {
      console.warn(
        "Formspree warning: Email may not have been sent. Check your form settings or sandbox restrictions.",
        mailErr
      );
    }

    return res.status(200).json({
      success: true,
      message: "Message saved successfully (Formspree may have sent the email)",
    });
  } catch (err: any) {
    console.error("Error in sendContactMail:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

