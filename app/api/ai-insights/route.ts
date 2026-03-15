import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  let requestData: any = {};
  
  try {
    requestData = await req.json();
    const { inputs, results } = requestData;

    // Safety check for missing data
    if (!inputs || !results) {
      console.error('Missing inputs or results in AI Insight request:', requestData);
      return NextResponse.json({ insight: "Precision analysis requires complete project context. Please refine your selection." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        insight: "Gemini API key is missing. AI insights disabled." 
      });
    }

    // Try a few common model names to avoid 404s
    const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
    let text = "";
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const prompt = `
          You are a Strategic Architect & Cost Consultant for "beMore Design Studio" in India. 
          Analyze the following interior budget estimate for a ${inputs?.propertyType?.toUpperCase() || '3BHK'} in ${inputs?.city || 'Bangalore'}.
          
          PROJECT DATA:
          - City: ${inputs?.city || 'Bangalore'} (Market Multiplier: ${results?.cityMultiplier || 1}x)
          - Material Tier: ${inputs?.tier || 'premium'}
          - Carpet Area: ${inputs?.carpetArea || 1200} sq ft
          - Grand Total Estimated: ${results?.grandTotal || 0} INR
          
          CATEGORY BREAKDOWN:
          ${JSON.stringify(results?.categoryTotals || {})}
          
          TASK:
          Provide a concise (2 sentences), professional architectural insight. 
          Focus on why this budget is realistic for the 2026 ${inputs?.city || 'Indian'} market and what the "X-factor" of the ${inputs?.tier || 'selected'} tier is.
          Mention specific material trends or labor market conditions if relevant.
          Keep it elite, precise, and authoritative.
          
          OUTPUT FORMAT:
          Return only the text of the insight. No intro, no outro.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        if (text) break; // Success
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed:`, err.message);
        continue;
      }
    }

    if (!text) {
      // High-quality static fallback if AI fails
      text = `For a ${inputs?.propertyType?.toUpperCase() || '3BHK'} in ${inputs?.city || 'Bangalore'}, the ${inputs?.tier || 'selected'} budget profile is highly efficient for the 2026 market. We recommend prioritizing ${inputs?.tier === 'luxury' ? 'Italian finishes' : 'high-durability hardware'} to maximize long-term asset value.`;
    }

    return NextResponse.json({ insight: text.trim() });
  } catch (error: any) {
    console.error('AI Insight Error Details:', error);
    const fallbackInputs = requestData?.inputs || {};
    return NextResponse.json({ 
      insight: `For a ${fallbackInputs?.propertyType?.toUpperCase() || '3BHK'} in ${fallbackInputs?.city || 'Bangalore'}, the ${fallbackInputs?.tier || 'selected'} budget profile is highly efficient for the 2026 market. We recommend prioritizing quality finishes to maximize asset value.`
    });
  }
}
