import { NextResponse } from 'next/server';

// Dynamic chatbot response generator
function generateChatbotResponse(message: string, financialData: any): string {
  const lowerMessage = message.toLowerCase();

  // Calculate key metrics
  const monthlyIncome = financialData?.income?.monthly || 0;
  const monthlyExpenses = Object.values(financialData?.expenses || {}).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  const emergencyFund = financialData?.investments?.emergency_fund || 0;
  const totalInvestments = Object.values(financialData?.investments || {}).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);

  // Conversational responses based on user input
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm GrowAI, your AI financial advisor. I can see you have ₹${monthlyIncome.toLocaleString()} monthly income and ₹${monthlyExpenses.toLocaleString()} in expenses. Your savings rate is ${savingsRate.toFixed(1)}%. How can I help you with your finances today?`;
  }

  if (lowerMessage.includes('how are you') || lowerMessage.includes('what\'s up')) {
    return `I'm doing great, thanks for asking! I'm here to help you optimize your finances. With your current setup, I notice some opportunities for improvement. What specific financial goal would you like to focus on?`;
  }

  if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
    return `You're welcome! I'm always here to help you make the most of your ₹${monthlyIncome.toLocaleString()} income. Remember, small consistent steps lead to big financial gains. Feel free to ask me anything else!`;
  }

  // Savings related questions
  if (lowerMessage.includes('save') || lowerMessage.includes('saving') || lowerMessage.includes('savings')) {
    if (savingsRate < 20) {
      return `Your current savings rate is ${savingsRate.toFixed(1)}%, which is a solid start! To reach the recommended 20%, you'd need to save ₹${(monthlyIncome * 0.2).toLocaleString()} per month. Consider cutting back on dining out or entertainment expenses. What category do you think you could reduce?`;
    } else {
      return `Excellent! Your ${savingsRate.toFixed(1)}% savings rate is above average. You're doing great at building wealth. Have you considered investing some of these savings? I can give you specific recommendations based on your ₹${totalInvestments.toLocaleString()} current investments.`;
    }
  }

  // Investment related questions
  if (lowerMessage.includes('invest') || lowerMessage.includes('investment') || lowerMessage.includes('mutual fund') || lowerMessage.includes('sip')) {
    if (totalInvestments < monthlyIncome * 6) {
      return `You currently have ₹${totalInvestments.toLocaleString()} invested, which covers about ${(totalInvestments / monthlyIncome).toFixed(1)} months of income. For better security, aim for 6-12x your income. A good starting point would be a SIP of ₹${Math.min(5000, monthlyIncome * 0.1).toLocaleString()} in diversified equity funds. What type of investment are you most interested in - stocks, mutual funds, or something else?`;
    } else {
      return `Your investment portfolio of ₹${totalInvestments.toLocaleString()} looks substantial! That's great financial planning. Consider reviewing your asset allocation - maybe add some international exposure or increase your debt allocation for stability. What are your long-term financial goals?`;
    }
  }

  // Emergency fund questions
  if (lowerMessage.includes('emergency') || lowerMessage.includes('emergency fund')) {
    const targetEmergency = monthlyExpenses * 6;
    if (emergencyFund < targetEmergency) {
      return `Your emergency fund covers ${(emergencyFund / monthlyExpenses).toFixed(1)} months of expenses. The target is 6 months (₹${targetEmergency.toLocaleString()}). You're ${(targetEmergency - emergencyFund).toLocaleString()} away from your goal. How much can you set aside monthly to build this up?`;
    } else {
      return `Fantastic! Your emergency fund of ₹${emergencyFund.toLocaleString()} provides excellent financial security. This covers ${(emergencyFund / monthlyExpenses).toFixed(1)} months of expenses. Keep maintaining it as your expenses change. What other financial goals are you working towards?`;
    }
  }

  // Budget questions
  if (lowerMessage.includes('budget') || lowerMessage.includes('expense') || lowerMessage.includes('spend')) {
    return `Looking at your finances: ₹${monthlyIncome.toLocaleString()} income vs ₹${monthlyExpenses.toLocaleString()} expenses gives you a ${savingsRate.toFixed(1)}% savings rate. The 50/30/20 rule suggests: 50% needs (₹${(monthlyIncome * 0.5).toLocaleString()}), 30% wants (₹${(monthlyIncome * 0.3).toLocaleString()}), 20% savings (₹${(monthlyIncome * 0.2).toLocaleString()}). Which expense category would you like to optimize first?`;
  }

  // Tax questions
  if (lowerMessage.includes('tax') || lowerMessage.includes('taxes')) {
    const annualIncome = monthlyIncome * 12;
    let taxEstimate = 0;
    if (annualIncome > 500000) {
      taxEstimate = Math.round((annualIncome - 500000) * 0.2);
    }
    return `For ₹${annualIncome.toLocaleString()} annual income, your estimated tax is about ₹${taxEstimate.toLocaleString()}. You could reduce this with tax-saving investments like ELSS (₹1.5L limit), PPF, or home loan interest. With your current investments of ₹${totalInvestments.toLocaleString()}, you might have room for more tax-efficient options. Would you like specific recommendations?`;
  }

  // General financial advice
  if (lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('tip')) {
    return `Based on your ₹${monthlyIncome.toLocaleString()} income and ${savingsRate.toFixed(1)}% savings rate, here are my top recommendations: 1) Build emergency fund to 6 months expenses, 2) Increase savings to 20%, 3) Start systematic investing. Your emergency fund of ₹${emergencyFund.toLocaleString()} and investments of ₹${totalInvestments.toLocaleString()} are good starts. What area would you like to focus on first?`;
  }

  // Default conversational response
  return `I understand you're asking about "${message}". Based on your financial data (₹${monthlyIncome.toLocaleString()} income, ₹${monthlyExpenses.toLocaleString()} expenses, ${savingsRate.toFixed(1)}% savings rate), I can provide personalized advice. Could you be more specific about what you'd like help with - savings, investments, budgeting, taxes, or emergency funds?`;
}

// List of reliable models for text generation and financial advice
const MODELS = [
  'google/flan-t5-large', // Best for instruction following
  'google/flan-t5-base',  // Good balance of quality and speed
  'google/flan-t5-small', // Fast and reliable fallback
  'microsoft/DialoGPT-large', // Conversational fallback
  'facebook/blenderbot-400M-distill' // Last resort
];

export async function POST(request: Request) {
  try {
    const { message, financialData } = await request.json();

    // Enhanced prompt for better financial advice
    const prompt = `You are GrowAI, a professional financial advisor for Indian users. Analyze this financial data and provide personalized advice.

FINANCIAL DATA:
${JSON.stringify(financialData, null, 2)}

USER QUESTION: ${message}

Provide concise, specific financial advice using the actual numbers from their data. Focus on actionable steps and be encouraging. Keep response under 150 words.`;

    let lastError;

    // Try multiple models
    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`);

        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_new_tokens: 200,
                temperature: 0.6,
                do_sample: true,
                return_full_text: false
              },
              options: {
                wait_for_model: true,
                use_cache: false
              }
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const aiResponse = result[0]?.generated_text ||
                            result.generated_text ||
                            "I've analyzed your finances. Based on your numbers, consider reviewing your expense categories to identify savings opportunities.";

          return NextResponse.json({
            success: true,
            response: aiResponse
          });
        }

        lastError = `Model ${model} returned status: ${response.status}`;
        console.log(`Model ${model} failed: ${response.status}`);

      } catch (error) {
        lastError = error;
        console.log(`Model ${model} error:`, error);
        continue; // Try next model
      }
    }

    // If all models fail, return a dynamic chatbot response
    const chatbotResponse = generateChatbotResponse(message, financialData);
    return NextResponse.json({
      success: true,
      response: chatbotResponse
    });

  } catch (error: any) {
    console.error('All models failed:', error);

    // Return a helpful fallback response
    return NextResponse.json({
      success: true,
      response: "I'm currently optimizing my financial analysis capabilities. In the meantime, based on basic financial principles, consider tracking your expenses carefully and building a 3-6 month emergency fund. Would you like to tell me more about your specific financial goals?"
    });
  }
}
