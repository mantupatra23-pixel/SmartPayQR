import { MetadataRoute } from "next";
import { CITIES, NICHES } from "@/data/seoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smart-pay-qr.vercel.app";

  const seoUrls: MetadataRoute.Sitemap = [];
  for (const city of CITIES) {
    for (const niche of NICHES) {
      seoUrls.push({
        url: `${baseUrl}/tools/${city.slug}/${niche.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/standee`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/soundbox`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/whatsapp-bill`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/apk`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...seoUrls,
  ];
}
