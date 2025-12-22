import { Request, Response } from "express";
import transporter from "../../config/mail";
import ContactMessage from "../models/contact"; // Import Mongoose model

export const sendContactMail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Save message to MongoDB
    const newMessage = await ContactMessage.create({ firstName, lastName, email, message });

    // Optional: Send confirmation email
    if (process.env.SMTP_HOST) {
      await transporter.sendMail({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

