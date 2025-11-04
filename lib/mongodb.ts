import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fincoach";

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGO_URI in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    console.log("Connecting to MongoDB with URI:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    throw err;
  }
}
