import { MetadataRoute } from 'next';

import { deployUrl } from '@/shared/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${deployUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${deployUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${deployUrl}/quotes`,
      lastModified: new Date(),
    },
  ];
}
