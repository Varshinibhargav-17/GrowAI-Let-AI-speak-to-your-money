import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    console.log("Connecting to MongoDB with URI:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    throw err;
  }
}
