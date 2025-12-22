import mongoose, { Schema, Document } from "mongoose";

interface IContact{
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: Date;
}

const contactSchema: Schema<IContact> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model<IContact>("ContactMessage", contactSchema);

export default ContactMessage;
