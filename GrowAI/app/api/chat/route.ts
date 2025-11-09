import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  let financialData: Record<string, unknown> = {};
  try {
    const body = await request.json();
    const { message } = body;
    financialData = body.financialData;

    console.log('🔧 Starting Gemini API call...');

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    // Type-safe access to financial data
    const income = financialData.income as number;
    const expenses = financialData.expenses as number;
    const investments = financialData.investments as number;

    // Create detailed prompt
    const prompt = `
    ROLE: You are GrowAI, an AI financial advisor. Provide specific, personalized financial advice.

    USER FINANCIAL DATA:
    - Monthly Income: ₹${income}
    - Monthly Expenses: ₹${expenses}
    - Monthly Savings: ₹${income - expenses}
    - Savings Rate: ${(((income - expenses) / income) * 100).toFixed(1)}%
    - Investments: ₹${investments || 0}
    ${financialData.debts ? `- Debts: ${Object.entries(financialData.debts as Record<string, { principal: number }>).map(([key, value]) => `${key}: ₹${value.principal}`).join(', ')}` : ''}

    USER QUESTION: ${message}

    INSTRUCTIONS:
    1. Analyze their EXACT numbers
    2. Provide SPECIFIC, actionable advice
    3. Use their actual amounts (₹${income}, ₹${expenses}, etc.)
    4. Be practical and helpful
    5. Keep response under 400 tokens
    6. Use bullet points or numbered lists if helpful

    RESPONSE FORMAT: Conversational but professional financial advice.
    `;

    console.log('🔧 Prompt created, calling Gemini...');

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini response received:', text.substring(0, 100) + '...');

    return NextResponse.json({
      success: true,
      response: text
    });

  } catch (error: unknown) {
    console.error('❌ Gemini API Error:', error);

    // Detailed error handling
    let errorMessage = 'Failed to get AI response';

    if (error instanceof Error) {
      if (error.message?.includes('API_KEY_INVALID')) {
        errorMessage = 'Invalid API key. Please check your Gemini API key.';
      } else if (error.message?.includes('quota')) {
        errorMessage = 'API quota exceeded. Please check your usage limits.';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      response: `I'm currently optimizing my financial analysis. Based on your income of ₹${financialData?.income || '75,000'}, focus on maintaining a healthy savings rate and building emergency funds.`
    }, { status: 500 });
  }
}