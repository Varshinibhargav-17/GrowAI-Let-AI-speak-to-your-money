import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/route"; // Your NextAuth config

// GET Profile
export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE Profile
export async function PUT(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("Profile update request body:", body);
  console.log("Updating user with email:", session.user.email);

  const updated = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: body },
    { new: true }
  );

  console.log("Updated user data:", updated);
  return NextResponse.json(updated);
}
