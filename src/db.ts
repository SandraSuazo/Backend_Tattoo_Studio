import mongoose from "mongoose";
import { CONFIG } from "./core/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database");
  }
};
