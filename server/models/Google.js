// Mongoose model for Google Trends

import mongoose from "mongoose";

const googleSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    searches: Number,
    url: String,
    image: String,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("google_trends", googleSchema);
