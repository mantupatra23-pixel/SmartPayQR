export interface MarketingPoster {
  id: string;
  title: string;
  type: string;
  language: string;
  headline: string;
  offerText: string;
  tagline: string;
  ctaText: string;
  theme: string;
  aspectRatio: "square" | "story" | "landscape" | "a4";
  brandColor: string;
  logoUrl?: string;
  productImageUrl?: string;
  includeQr: boolean;
  shopName: string;
  upiId: string;
  mobile: string;
  address: string;
  createdAt: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  category: "offer" | "festival" | "reminder" | "referral" | "product";
  targetChannel: "whatsapp" | "sms" | "email" | "social";
  messageText: string;
  captions: {
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    googleBusiness?: string;
    sms?: string;
    shortScript?: string;
  };
  hashtags: string[];
  sharesCount: number;
  createdAt: string;
}

export interface MarketingAnalytics {
  totalPostersCreated: number;
  totalDownloads: number;
  totalShares: number;
  totalCampaignsCreated: number;
  totalAiGenerations: number;
  topUsedTheme: string;
}

const STORAGE_POSTERS = "smartpay_marketing_posters";
const STORAGE_CAMPAIGNS = "smartpay_marketing_campaigns";
const STORAGE_ANALYTICS = "smartpay_marketing_analytics";

export const getSavedPosters = (): MarketingPoster[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_POSTERS);
  return data ? JSON.parse(data) : [];
};

export const savePoster = (poster: Omit<MarketingPoster, "id" | "createdAt">): MarketingPoster => {
  const posters = getSavedPosters();
  const newPoster: MarketingPoster = {
    ...poster,
    id: `poster_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  posters.unshift(newPoster);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_POSTERS, JSON.stringify(posters));
    incrementAnalytics("totalPostersCreated");
  }
  return newPoster;
};

export const getSavedCampaigns = (): MarketingCampaign[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_CAMPAIGNS);
  return data ? JSON.parse(data) : [];
};

export const saveCampaign = (campaign: Omit<MarketingCampaign, "id" | "createdAt" | "sharesCount">): MarketingCampaign => {
  const campaigns = getSavedCampaigns();
  const newCap: MarketingCampaign = {
    ...campaign,
    id: `camp_${Date.now()}`,
    sharesCount: 0,
    createdAt: new Date().toISOString(),
  };
  campaigns.unshift(newCap);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_CAMPAIGNS, JSON.stringify(campaigns));
    incrementAnalytics("totalCampaignsCreated");
  }
  return newCap;
};

export const getMarketingAnalytics = (): MarketingAnalytics => {
  if (typeof window === "undefined") {
    return {
      totalPostersCreated: 0,
      totalDownloads: 0,
      totalShares: 0,
      totalCampaignsCreated: 0,
      totalAiGenerations: 0,
      topUsedTheme: "Modern Glass",
    };
  }
  const data = localStorage.getItem(STORAGE_ANALYTICS);
  return data
    ? JSON.parse(data)
    : {
        totalPostersCreated: getSavedPosters().length,
        totalDownloads: 0,
        totalShares: 0,
        totalCampaignsCreated: getSavedCampaigns().length,
        totalAiGenerations: 0,
        topUsedTheme: "Modern Glass",
      };
};

export const incrementAnalytics = (key: keyof Omit<MarketingAnalytics, "topUsedTheme">) => {
  if (typeof window === "undefined") return;
  const current = getMarketingAnalytics();
  current[key] = (current[key] || 0) + 1;
  localStorage.setItem(STORAGE_ANALYTICS, JSON.stringify(current));
  window.dispatchEvent(new Event("smartpay_marketing_updated"));
};

// Groq AI Content Generator
export const generateAiMarketingContent = async (
  prompt: string,
  businessType: string,
  language: string = "English",
  groqApiKey?: string
) => {
  incrementAnalytics("totalAiGenerations");

  const apiKey = groqApiKey || process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    // High quality AI fallback generator if Groq key isn't provided
    return {
      headline: `${prompt.toUpperCase()} AT ${businessType.toUpperCase()}`,
      offerText: `SPECIAL ${prompt.toUpperCase()} DISCOUNT - LIMITED PERIOD ONLY!`,
      tagline: `Visit our store today or order online via WhatsApp!`,
      ctaText: `PAY VIA UPI & CLAIM OFFER`,
      hashtags: [`#${businessType.replace(/\s+/g, '')}`, `#${prompt.replace(/\s+/g, '')}`, `#SmartPayMerchant`],
      whatsappMessage: `🎉 *SPECIAL OFFER ANNOUNCEMENT!* 🎉\n\n*${prompt.toUpperCase()}*\n\nVisit *Our Store* today to avail exclusive benefits on your purchases.\n\n💳 We accept 0% Fee UPI Payments via GPay, PhonePe, Paytm & BHIM.\n\n📍 Visit us today or reply to place an order directly on WhatsApp!`,
      captions: {
        facebook: `🎉 Don't miss out on our special ${prompt}! Visit us today for exclusive savings and instant UPI payments.`,
        instagram: `🔥 ${prompt.toUpperCase()} IS NOW LIVE! 🔥\n\nVisit our shop to get the best deals in town. Swipe up or link in bio to pay via UPI.\n\n#ShopLocal #${businessType.replace(/\s+/g, '')}`,
        googleBusiness: `Special Announcement: ${prompt}. Visit our local store today for top-quality goods and fast checkout.`,
        sms: `Special Sale: ${prompt} at our shop! Visit today. Pay easily via UPI.`,
        shortScript: `[Camera opens on shop counter] Hey guys! Huge announcement! ${prompt} is finally live at our store. Scan our SmartPay QR code to get instant payment confirmation!`
      }
    };
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert Indian retail marketing agency copywriter. Generate catchy marketing content for a ${businessType} business in ${language} language. Respond strictly in JSON format without markdown codeblocks containing keys: headline, offerText, tagline, ctaText, hashtags (array of strings), whatsappMessage, captions (object with facebook, instagram, googleBusiness, sms, shortScript).`
          },
          {
            role: "user",
            content: `Create marketing copy for: ${prompt}`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const rawContent = data.choices[0].message.content;
    return JSON.parse(rawContent);
  } catch (err) {
    console.error("Groq AI Execution Error, using structured generator", err);
    return {
      headline: `${prompt.toUpperCase()}`,
      offerText: `EXCLUSIVELY FOR OUR VALUED CUSTOMERS!`,
      tagline: `Quality products & trusted local service.`,
      ctaText: `SCAN & PAY VIA UPI`,
      hashtags: [`#ShopLocal`, `#${businessType.replace(/\s+/g, '')}`],
      whatsappMessage: `Greetings from our shop! ${prompt}. Visit us today!`,
      captions: {
        facebook: `${prompt} - Visit our store today!`,
        instagram: `🔥 ${prompt}! Scan QR & pay via UPI!`,
        googleBusiness: `${prompt} now available at our local outlet.`,
        sms: `${prompt}. Pay via UPI at counter.`,
        shortScript: `Check out our special ${prompt} offer live now!`
      }
    };
  }
};
