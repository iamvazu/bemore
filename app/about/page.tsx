import type { Metadata } from 'next';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Architecture & Interiors Studio, Bengaluru',
  description:
    'Be More Design Studio — the story behind Bengaluru\'s investment-first interior design philosophy. Meet our team, our process, and the Hybrid Design™ approach that sets us apart.',
};

export default function Page() {
  return <AboutPage />;
}
