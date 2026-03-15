import { Metadata } from 'next';
import { getLocalityBySlug, getLocalities } from '@/lib/localities';
import LocalitySEOPage from './LocalitySEOPage';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  
  if (!locality) return { title: 'Not Found' };

  return {
    title: `Interior Design ROI in ${locality.displayName} | Be More Studio`,
    description: `Maximize your property equity in ${locality.displayName} with strategic interior design. ${locality.description} Learn about local trends like ${locality.trendingStyle}.`,
    keywords: [`Interior design ${locality.displayName}`, `Home renovation ROI ${locality.displayName}`, `Be More Design Bengaluru`],
  };
}

export async function generateStaticParams() {
  const localities = getLocalities();
  return localities.map((l) => ({
    slug: l.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  
  if (!locality) {
    notFound();
  }

  return <LocalitySEOPage locality={locality} />;
}
