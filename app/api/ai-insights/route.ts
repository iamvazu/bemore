import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { inputs, results, selectedLocality } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        insight: "Gemini API key is missing. Please add it to your environment variables to enable AI insights." 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      You are a strategic Real Estate Investment Consultant for "Be More Design Studio" in Bengaluru. 
      Analyze the following interior design investment for a property in ${selectedLocality.displayName}.
      
      PROPERTY DATA:
      - Locality: ${selectedLocality.displayName} (${selectedLocality.description})
      - Property Type: ${inputs.propertyType}
      - Current Market Value: ${inputs.currentValue} Lakhs
      - Intended Design Investment: ${inputs.investmentAmount} Lakhs
      - Design Tier: ${inputs.designTier}
      - Automation: ${inputs.automationLevel}
      - Finish Grade: ${inputs.finishGrade}
      
      CALCULATED ROI (PROPRIETARY ENGINE):
      - 5-Year Projected Value: ${results.futureValue.toFixed(2)} Lakhs
      - Appreciation Percentage: ${results.appreciationPercent.toFixed(1)}%
      - Rental Yield Premium: ${results.rentalPremium.toFixed(1)}% above market
      
      CONTEXT:
      - Selected Modules: ${Object.entries(inputs.modules).filter(([_, v]) => v).map(([k, _]) => k).join(', ')}
      - Profession (for WFH tuning): ${inputs.profession}
      
      TASK:
      Provide a concise (2-3 sentences), punchy, and professional investment insight. 
      Focus on WHY this specific configuration works for this locality in Bengaluru. 
      Mention specific trends like "Quiet Premium" or "Tech Corridor demand" if relevant to the inputs.
      Keep it high-end, authoritative, and data-driven.
      
      OUTPUT FORMAT:
      Return only the text of the insight. No intro, no outro.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ insight: text.trim() });
  } catch (error: any) {
    console.error('AI Insight Error:', error);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}
