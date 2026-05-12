import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connected.");
  } catch (error) {
    console.log("❌ Database Connection Failed:", error);
    process.exit(1); // stop server if DB fails
  }
};