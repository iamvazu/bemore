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

export const LOCALITIES: LocalityData[] = localMock.localities;

export function getLocalities(): LocalityData[] {
  return LOCALITIES;
}

export function getLocalityById(id: string): LocalityData | undefined {
  return LOCALITIES.find((l) => l.id === id);
}

export function getLocalityBySlug(slug: string): LocalityData | undefined {
  return LOCALITIES.find((l) => l.slug === slug);
}
