import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set, database features will be disabled");
    return;
  }
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
