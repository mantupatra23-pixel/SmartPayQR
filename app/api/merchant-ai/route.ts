import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API Key is not configured on the server.' },
        { status: 500 }
      );
    }

    const { mode, category, language, promptData } = await req.json();
    const selectedLang = language || 'English';

    let systemPrompt = '';

    if (mode === 'copilot') {
      systemPrompt = `You are the AI Merchant Copilot for an Indian shopkeeper (${category || 'General Store'}).
Provide 5 actionable, practical strategies in "${selectedLang}" script for:
1. Increasing profit margins.
2. Inventory management.
3. Customer retention & festival marketing.
Return JSON: { "strategies": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"] }`;
    } else {
      systemPrompt = `You are an expert Indian Business Marketing Suite.
Generate high-converting marketing materials for category "${category}" in language "${selectedLang}".
Return JSON:
{
  "whatsappCampaign": ["2 messages"],
  "facebookAds": ["2 copies"],
  "instagramCaptions": ["2 captions"],
  "shortsScript": ["2 scripts"],
  "reviewRequest": ["2 messages"]
}`;
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: promptData || `Generate insights for ${category}` },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const jsonOutput = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return NextResponse.json(jsonOutput);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error generating AI response.' },
      { status: 500 }
    );
  }
}
