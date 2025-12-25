import mongoose, { Schema, Document } from "mongoose";

export interface IWhoWeAre extends Document {
  title: string;
  description: string;
  highlights: string[];
  image?: string;
  isActive: boolean;
}

const whoWeAreSchema = new Schema<IWhoWeAre>(
  {
    title: {
      type: String,
      required: true,
      default: "Who We Are",
    },

    description: {
      type: String,
      required: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    image: {
      type: String, // image filename or URL
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWhoWeAre>(
  "WhoWeAre",
  whoWeAreSchema
);