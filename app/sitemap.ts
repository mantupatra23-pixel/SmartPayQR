import { MetadataRoute } from 'next';
import { INDIAN_CITIES, BUSINESS_CATEGORIES } from '@/config/seoKeywords';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartpayqr.in';

  const seoUrls = [];

  for (const city of INDIAN_CITIES) {
    for (const cat of BUSINESS_CATEGORIES) {
      seoUrls.push({
        url: `${baseUrl}/qr-poster-for-${city.toLowerCase()}-${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...seoUrls,
  ];
}
