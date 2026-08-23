import { MetadataRoute } from "next";
import { SEO_PAGES } from "@/lib/seoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smart-pay-qr.vercel.app";

  const seoUrls = SEO_PAGES.map((page) => ({
    url: `${baseUrl}/tools/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...seoUrls,
  ];
}
