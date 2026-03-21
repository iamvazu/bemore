import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Architecture & Interiors Studio, Bengaluru | Be More Design Studio',
  description: "beMore Design Studio | Architecture and interior design firm based in Bengaluru. Tailored residential & commercial environments across Whitefield, Koramangala, Indiranagar.",
};

export default function Page() {
  return <HomePageClient />;
}
