import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// ✅ Use the latest Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    console.log("Starting chat request...");

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not set");
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    await connectDB();
    console.log("DB connected");

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      console.log("Unauthorized: No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    console.log("User found:", user ? "Yes" : "No");

    const { message } = await req.json();
    console.log("Message received:", message);

    const profileSummary = user
      ? `
      Financial Profile Type: ${user.financialProfileType || "Not specified"}
      Income Pattern: ${user.incomePattern || "N/A"}
      Financial Focus: ${user.financialFocus || "N/A"}
      Career Stage: ${user.careerStage || "N/A"}
    `
      : "No financial profile available.";

    const prompt = `
You are FinCoach, a friendly AI financial assistant for Indian users.
You analyze financial profiles and provide personalized insights.

Profile:
${profileSummary}

User says: "${message}"

Respond helpfully with actionable insights and next steps.
If information is missing, give practical general suggestions.
    `;

    console.log("Generating content with Gemini...");

    // ✅ Use correct model & call structure for v1beta API
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const result = await model.generateContent(prompt);

    const reply =
      result?.response?.text() || "Sorry, I couldn’t process that.";
    console.log("Reply generated:", reply);

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    return NextResponse.json(
      { error: "Chat failed", details: error.message },
      { status: 500 }
    );
  }
}
