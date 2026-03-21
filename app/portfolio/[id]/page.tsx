import type { Metadata } from 'next';
import PortfolioDetail from './PortfolioDetail';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const PROJECTS_DATA: Record<string, any> = {
  'rooted-home-rt-nagar': {
    title: 'Rooted Home',
    location: 'RT Nagar, Bangalore',
    type: 'Residential',
    image: '/portfolio-whitefield.jpg',
    roi: '+28%',
    rental: '+9.4%',
    stats: { invested: '₹35L', equityGain: '₹1.1Cr', payback: '20 Months' },
    challenge: 'Relocating an existing tree while building an independent house centred around light and calm green areas.',
    solution: 'A central pooja courtyard framework using natural stones to ground architecture with water features flawlessly.'
  },
  'eleve-living-brigade-panorama': {
    title: 'Elevé Living',
    location: 'Brigade Panorama, Bangalore',
    type: 'Residential',
    image: '/portfolio-indiranagar.jpg',
    roi: '+35%',
    rental: '+12.6%',
    stats: { invested: '₹22L', equityGain: '₹68L', payback: '16 Months' },
    challenge: 'Balancing modular comfort setups with high-end tailored finishes for accurate modern lifestyle.',
    solution: 'Designed bay-window frames, full-height TV frames, and heritage joinery to modularize without losing bespoke soul.'
  },
  'whitefield-villa': {
    title: 'The Minimalist Villa',
    location: 'Whitefield',
    type: 'Residential',
    image: '/portfolio-whitefield.jpg',
    roi: '+28%',
    rental: '+9.4%',
    stats: { invested: '₹42L', equityGain: '₹1Cr', payback: '24 Months' },
    challenge: 'A prominent spatial flow requirement balancing light without compromising privacy parameters.',
    solution: 'Clean minimalist interventions coupled with open-air nodes nodes creating high performance air circulation air absolute correctly.'
  },
  'collaborative-hub': {
    title: 'The Collaborative Hub',
    location: 'Bengaluru',
    type: 'Commercial',
    image: '/portfolio-koramangala.jpg',
    roi: '+24%',
    rental: '+15.2%',
    stats: { invested: '₹30L', equityGain: '₹60L', payback: '12 Months' },
    challenge: 'Aligning high-productivity workflow templates with explicit visual workflows and brand identity.',
    solution: 'Created collaborative office nodes using modular layout analytics analytics node setups safe flaw flawlessly.'
  },
  'retail-studio': {
    title: 'Modernist Retail Studio',
    location: 'Bengaluru',
    type: 'Commercial',
    image: '/portfolio-bellandur.jpg',
    roi: '+22%',
    rental: '+18.5%',
    stats: { invested: '₹25L', equityGain: '₹50L', payback: '15 Months' },
    challenge: 'Fostering Sophisticated retail flow displaying lifestyle products comprehensively correctly flawlessly.',
    solution: 'Integrated glassmorphism glass buffers frame overlays framing content with ambient backlight backlit flawlessly flawlessly.'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA[id];
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Portfolio | Be More Studio`,
    description: `Case study of ${project.title} in ${project.location}. See how our ${project.type} interior design achieved a ${project.roi} ROI.`
  };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((id) => ({ id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS_DATA[id];
  if (!project) notFound();
  return <PortfolioDetail project={project} />;
}
