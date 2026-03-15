import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'Services | Design Investment Packages, Bengaluru',
  description:
    'Explore Be More Design Studio\'s tiered design packages — Hybrid, Premium, and Bespoke — each crafted to maximise your property\'s resale value and rental yield in Bengaluru.',
};

export default function Page() {
  return <ServicesPage />;
}
