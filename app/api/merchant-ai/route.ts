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

    const { category, language, location } = await req.json();

    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { error: 'Business category is required.' },
        { status: 400 }
      );
    }

    const selectedLang = language || 'English';
    const locContext = location ? ` located in ${location}` : ' in India';

    const systemPrompt = `You are an expert Indian Small Business Branding & Marketing Specialist (ChatGPT for Indian Dukandars).
Generate high-converting, realistic branding and marketing content for a small business in the category: "${category}"${locContext}.
All text output MUST be written in the following language: "${selectedLang}" (If language is Odia, Hindi, or Bengali, use their respective native scripts).

Strictly output ONLY valid JSON matching this exact schema:
{
  "shopNames": ["10 premium catchy shop names"],
  "taglines": ["10 professional taglines/slogans"],
  "googleBusinessDescriptions": ["5 SEO-rich Google Business descriptions"],
  "whatsappPromotions": ["5 WhatsApp promotional broadcast messages"],
  "festivalOffers": ["5 festival sale discount offers"],
  "instagramCaptions": ["5 Instagram captions with hashtags"],
  "facebookPosts": ["5 Facebook marketing posts"],
  "smsMarketing": ["5 short SMS marketing messages"],
  "thankYouMessages": ["5 post-purchase thank you notes"],
  "customerWelcomeMessages": ["5 new customer welcome messages"],
  "qrPosterText": ["5 catchy slogans to put on UPI QR payment posters"],
  "discountHeadlines": ["5 high-urgency discount headlines"],
  "googleReviewRequest": ["5 friendly messages asking for 5-star Google reviews"]
}

Rules:
1. Ensure shop names sound trustworthy and relatable to local Indian customers.
2. Return strictly raw JSON. Do not include markdown code block ticks like \`\`\`json.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate marketing suite for category: ${category}` },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const jsonOutput = JSON.parse(content);

    return NextResponse.json(jsonOutput);
  } catch (error: any) {
    console.error('Groq API Merchant Engine Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate AI merchant content. Please try again.' },
      { status: 500 }
    );
  }
}
