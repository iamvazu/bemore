import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bemoredesign.vercel.app';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/careers',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const portfolioSlugs = [
    'rooted-home-rt-nagar',
    'eleve-living-brigade-panorama',
    'whitefield-villa',
    'collaborative-hub',
    'retail-studio'
  ];

  const blogSlugs = [
    'interior-design-cost-bangalore',
    'choose-interior-designer-bangalore',
    'modular-kitchen-custom-kitchen',
    'best-materials-bangalore',
    '3bhk-interior-design-cost',
    'small-apartment-interior-design',
    'contemporary-indian-kitchen',
    'bemore-designs-bangalore-climate',
    'office-interior-trends-2026',
    'cafe-interior-design'
  ];

  const portfolioRoutes = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...portfolioRoutes, ...blogRoutes];
}
