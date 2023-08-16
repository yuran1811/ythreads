import { deployUrl } from '@/shared/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    host: `${deployUrl}`,
    sitemap: `${deployUrl}/sitemap.xml`,
  };
}
