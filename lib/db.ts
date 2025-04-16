// lib/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
