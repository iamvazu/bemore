import localMock from '@/data/wp-local-mock.json';

export interface LocalityData {
  id: string;
  displayName: string;
  slug: string;
  localityFactor: number;
  noisePollutionScore: number;
  quietPremiumMultiplier: number;
  wfhDemand: number;
  pricePerSqFt: number;
  description: string;
  trendingStyle: string;
  recommendedModules: string[];
}

/**
 * Simulates a WordPress REST API fetch.
 * In production, this would be: 
 * fetch('https://your-wp-site.com/wp-json/wp/v2/localities')
 */
export async function fetchLocalities(): Promise<LocalityData[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return localMock.localities as LocalityData[];
}

export async function fetchLocalityBySlug(slug: string): Promise<LocalityData | null> {
  const localities = await fetchLocalities();
  return localities.find(l => l.slug === slug) || null;
}
