import type { Metadata } from 'next';
import PortfolioDetail from './PortfolioDetail';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const PROJECTS_DATA: Record<string, any> = {
  'whitefield-villa': {
    title: 'The Obsidian Villa',
    location: 'Whitefield',
    type: 'Luxury Villa',
    image: '/portfolio-whitefield.jpg',
    roi: '+28%',
    rental: '+9.4%',
    stats: {
      invested: '₹45L',
      equityGain: '₹1.2Cr',
      payback: '18 Months'
    },
    challenge: 'A prominent tech founder required a design that balanced extreme luxury with a "stealth" professional acoustic environment for late-night VC calls.',
    solution: 'We implemented our signature "Obsidian Palette" using fluted charcoal panels and hidden acoustic fabric. Integrated KNX automation controls everything from the climate to the 114dB audio transparency.'
  },
  'indiranagar-bedroom': {
    title: 'The Heritage Master',
    location: 'Indiranagar',
    type: 'Premium Apartment',
    image: '/portfolio-indiranagar.jpg',
    roi: '+35%',
    rental: '+12.6%',
    stats: {
      invested: '₹18L',
      equityGain: '₹65L',
      payback: '24 Months'
    },
    challenge: 'A legacy property in Indiranagar with high external commercial noise. The owner wanted to increase rental yield specifically for expatriate tenants.',
    solution: 'Hybrid design approach. We modularized the wardrobe systems but used bespoke heritage joinery for the headboard and wall systems, achieving a 38dB noise reduction.'
  },
  'koramangala-kitchen': {
    title: 'Chef\'s Jewel',
    location: 'Koramangala',
    type: 'Penthouse',
    image: '/portfolio-koramangala.jpg',
    roi: '+24%',
    rental: '+8.2%',
    stats: {
      invested: '₹22L',
      equityGain: '₹48L',
      payback: '14 Months'
    },
    challenge: 'A gourmet-focused client in Koramangala needed a "Showcase Kitchen" that would define the property\'s value during resale.',
    solution: 'Italian marble island integration with German-engineered modular cabinetry. We treated the kitchen as a precision instrument, resulting in a 24% boost in property appraisal.'
  },
  'bellandur-wfh': {
    title: 'The Zoom Studio',
    location: 'Bellandur',
    type: 'Tech Apartment',
    image: '/portfolio-bellandur.jpg',
    roi: '+22%',
    rental: '+14.5%',
    stats: {
      invested: '₹12L',
      equityGain: '₹30L',
      payback: '12 Months'
    },
    challenge: 'Bellandur tech executive needed a professional background for global meetings that felt like a broadcast studio, not a spare bedroom.',
    solution: 'High-CRI integrated lighting and fabric acoustic ceiling. We optimized the background geometry to maximize screen presence, driving up rental yield significantly for the next tenant.'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS_DATA[params.id];
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Portfolio | Be More Studio`,
    description: `Case study of ${project.title} in ${project.location}. See how our ${project.type} interior design achieved a ${project.roi} ROI.`
  };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((id) => ({ id }));
}

export default function Page({ params }: Props) {
  const project = PROJECTS_DATA[params.id];
  if (!project) notFound();
  return <PortfolioDetail project={project} />;
}
